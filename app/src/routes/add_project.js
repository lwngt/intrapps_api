// Include common scripts
let api_common = require('../common/api_common');
let api_common_func = new api_common;

let util_common = require('../common/util_common');
let util_common_func = new util_common;

let db_common = require('../common/db_common');
let db_common_func = new db_common;

let validation_common = require('../common/validation_common');
let validation_common_func = new validation_common;

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

// Include outer libraries
let express = require('express');
let router = express.Router();
let moment = require("moment");
let multer = require('multer');
const { v4: uuidv4 } = require('uuid');

let timestamp = moment().unix(); // unix time stamp
let uuid = uuidv4().split('-').join(''); // uuid
let file = null;
let LOG_FILE_NAME = "add_project";

let storage = multer.diskStorage({
  // Directory to save files
  destination: api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
  // File name to save (original uploaded file name)
  filename: (req, file_muter, cb) => {
    file = file_muter;
    timestamp = moment().unix();
    uuid = uuidv4().split('-').join('');
    cb(null, timestamp + "_" + uuid + "_" + file.originalname)
  }
});

let upload = multer({
  storage: storage,
  dist: '/'
});
let type = upload.array('project_images', 5);

router.post('/', type, (req, res) => {

  common_logs_func.output_log("header : apikey=" + req.headers['apikey']
    + " secretkey=" + req.headers['apikey']
    + " parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

  // check argument variables
  if (validation_common_func.check_apikey(req.headers['apikey']) === false) {
    // delete files to be uploaded
    if (validation_common_func.check_project_images(req.files) === true) {
      util_common_func.cleanup_input_file(
        api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
        req.files);
    }
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_secretkey(req.headers['secretkey']) === false) {
    // delete files to be uploaded
    if (validation_common_func.check_project_images(req.files) === true) {
      util_common_func.cleanup_input_file(
        api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
        req.files);
    }
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_project_name(
    req.body.project_name) === false) {
    // delete files to be uploaded
    if (validation_common_func.check_project_images(req.files) === true) {
      util_common_func.cleanup_input_file(
        api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
        req.files);
    }
    let response = api_common_func.response_400_0420();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_project_overview(
    req.body.project_overview) === false) {
    // delete files to be uploaded
    if (validation_common_func.check_project_images(req.files) === true) {
      util_common_func.cleanup_input_file(
        api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
        req.files);
    }
    let response = api_common_func.response_400_0421();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // get images
  let project_images = [null, null, null, null, null];
  if (validation_common_func.check_project_images(req.files) === true) {
    // maximum number of 5
    let limit = (req.files.length > 5) ? 5 : req.files.length;

    for (let i = 0; i < limit; i++) {
      if (req.files[i].filename !== null && req.files[i].filename.length > 0) {
        project_images[i] = req.files[i].filename;
      }
    }
  }

  let overview = req.body.project_overview;
  if (overview === "") {
    overview = null;
  }

  let argument_content = {
    "data": {
      "name": req.body.project_name,
      "overview": overview,
      "images": project_images,
      "input_images": req.files
    }
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;

// Function : run_process_all
// Argument : apikey              / api key(api argument)
//          : secretkey           / secret key(api argument)
//          : argument_content    / project name, project overview, images
//          : res                 / response object
// response : none
// note     : check user's authentication and search build information.
//          : after process , execute http response and data
async function run_process_all(apikey, secretkey, argument_content, res) {
  try {
    // confirm user's id and vendor id
    let auth_sql = db_common_func.create_auth_sql(apikey, secretkey);
    let result = await execute_sql(auth_sql);

    let vendor_id = null;
    let user_id = null;
    let add = null;
    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      add = parseInt(result[0].add);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      if (validation_common_func.check_project_images(
        argument_content.data.input_images) === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.input_images);
      }
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    // check user's authority type
    if (Number(add) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // execute insert projects sql
    let edit_sql = db_common_func.create_insert_projects_sql(
      vendor_id, argument_content.data);
    result = await execute_sql(edit_sql);
    if (result === null || result.insertId === undefined) {
      if (validation_common_func.check_project_images(
        argument_content.data.input_images) === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.input_images);
      }
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
    let project_id = result.insertId;

    // execute insert user_manage_projects sql
    edit_sql = db_common_func.create_insert_user_manage_projects_sql(
      vendor_id, project_id);
    result = await execute_sql(edit_sql);

    // success , then response 200
    let response = api_common_func.response_200();
    api_common_func.response_object(res, 200, response, null, LOG_FILE_NAME);
    return;

  } catch (error) {
    if (error.message === "0004") {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    } else {
      let response = api_common_func.response_400_9999();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    }
    return;
  }
}

// Function : execute_sql
// Argument : sql / sql statement
// response : result of sql execute
// note     : async function of sql execute
async function execute_sql(sql) {
  return new Promise((resolve, reject) =>
    db_common_func.execute_sql(sql, null, (err, results, fields) => {
      // execute error
      if (err) {
        console.log(err);
        return reject(new Error("0004"));
      }
      // return response
      return resolve(results);
    })
  );
}
