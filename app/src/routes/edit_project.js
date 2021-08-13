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

var modify_type = {
  KEEP: 0,
  ADD: 1,
  UPDATE: 2,
  DELETE: 3
};

let timestamp = moment().unix(); // unix time stamp
let uuid = uuidv4().split('-').join(''); // uuid
let file = null;

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
let LOG_FILE_NAME = "edit_project";

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

  // get parameters
  if (validation_common_func.check_project_id(
    req.body.project_id) === false) {
    let response = api_common_func.response_400_0423();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
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
  let project_overview = null;
  if (req.body.project_overview !== "") {
    project_overview = req.body.project_overview;
  }

  if (validation_common_func.check_project_images(req.body.project_images_modify) === false
    || req.body.project_images_modify.length !== 5) {
    let response = api_common_func.response_400_0425();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  let i = 0;
  let j = 0;
  // check images
  if (req.files !== null || req.files !== null) {
    // update count

    let image_update_check = req.body.project_images_modify.filter(
      item => Number(item) === modify_type.UPDATE);

    // add count
    let image_add_check = req.body.project_images_modify.filter(
      item => Number(item) === modify_type.ADD);

    // number of images to be uploaded has to be equal to add + update count.
    let images_prediction_count = image_update_check.length + image_add_check.length;
    if (images_prediction_count !== req.files.length) {
      if (validation_common_func.check_project_images(req.files) === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          req.files);
      }
      let response = api_common_func.response_400_0426();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // control images
    project_images_modify = [];
    for (i = 0; i < 5; i++) {
      if (Number(req.body.project_images_modify[i]) === modify_type.ADD) {
        // add
        project_images_modify.push({ "kind": modify_type.ADD, "image": req.files[j].path });
        j = j + 1;
      } else if (Number(req.body.project_images_modify[i]) === modify_type.UPDATE) {
        // update
        project_images_modify.push({ "kind": modify_type.UPDATE, "image": req.files[j].path });
        j = j + 1;
      } else if (Number(req.body.project_images_modify[i]) === modify_type.DELETE) {
        // delete
        project_images_modify.push({ "kind": modify_type.DELETE, "image": "NULL" });
      } else if (Number(req.body.project_images_modify[i]) === modify_type.KEEP) {
        // keep
        project_images_modify.push({ "kind": modify_type.KEEP, "image": null });
      } else {
        // Error
        if (validation_common_func.check_project_images(req.files) === true) {
          util_common_func.cleanup_input_file(
            api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
            req.files);
        }
        let response = api_common_func.response_400_0425();
        api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
        return;
      }
    }
  }

  let argument_content = {
    "data": {
      "id": req.body.project_id,
      "name": req.body.project_name,
      "overview": project_overview,
      "modify": project_images_modify,
      "files": req.files
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
//          : argument_content    / project id, name, overview, images
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
    let edit = null;

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      edit = parseInt(result[0].edit);
    }

    // check user's authority type
    if (Number(edit) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }


    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      if (validation_common_func.check_project_images(argument_content.data.files) === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.files);
      }
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    // check the project id is valid
    let check_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.id)
    result = await execute_sql(check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0430();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check project_image_modify
    let select_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.id);
    result = await execute_sql(select_sql);
    if (result.length === 0) {
      // error
      if (validation_common_func.check_project_images(argument_content.data.files)
        === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.files);
      }
      let response = api_common_func.response_400_0429();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
    // get information of current image setting
    let current_images = [
      result[0].image_1,
      result[0].image_2,
      result[0].image_3,
      result[0].image_4,
      result[0].image_5
    ];
    // check add/update/delete in input
    let error_judged = false;
    for (let i = 0; i < argument_content.data.modify.length; i++) {
      if (argument_content.data.modify[i].kind === modify_type.ADD
        && current_images[i] !== null) {
        // image has already placed in the positon
        error_judged = true;
      } else if (argument_content.data.modify[i].kind === modify_type.UPDATE
        && current_images[i] === null) {
        // no image to update in the positon
        error_judged = true;
      } else if (argument_content.data.modify[i].kind === modify_type.DELETE
        && current_images[i] === null) {
        // no image to delete in the positon
        error_judged = true;
      }
    }
    // at result of check, error raise
    if (error_judged) {
      if (validation_common_func.check_project_images(argument_content.data.files)
        === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.files);
      }
      let response = api_common_func.response_400_0425();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // delete files
    let delete_file_sql = db_common_func.create_select_delete_file_sql
      (argument_content.data.modify, argument_content.data.id);
    if (delete_file_sql !== null) {
      // delete file exists
      result = await execute_sql(delete_file_sql);
      if (result === null) {
        let response = api_common_func.response_400_0004();
        api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
        return;
      }
      let delete_files = [];
      if (result[0].image_1 !== undefined && result[0].image_1 !== null) {
        delete_files.push(api_common_func.SCREENSHOT_LOCAL_DIRECTORY + "/" + result[0].image_1);
      }
      if (result[0].image_2 !== undefined && result[0].image_2 !== null) {
        delete_files.push(api_common_func.SCREENSHOT_LOCAL_DIRECTORY + "/" + result[0].image_2);
      }
      if (result[0].image_3 !== undefined && result[0].image_3 !== null) {
        delete_files.push(api_common_func.SCREENSHOT_LOCAL_DIRECTORY + "/" + result[0].image_3);
      }
      if (result[0].image_4 !== undefined && result[0].image_4 !== null) {
        delete_files.push(api_common_func.SCREENSHOT_LOCAL_DIRECTORY + "/" + result[0].image_4);
      }
      if (result[0].image_5 !== undefined && result[0].image_5 !== null) {
        delete_files.push(api_common_func.SCREENSHOT_LOCAL_DIRECTORY + "/" + result[0].image_5);
      }
      // delete file
      util_common_func.upload_file_delete(delete_files);
    }

    // execute update projects sql
    let edit_sql = db_common_func.create_update_projects_sql(argument_content.data);
    result = await execute_sql(edit_sql);
    if (result === null) {
      if (validation_common_func.check_project_images(argument_content.data.files) === true) {
        util_common_func.cleanup_input_file(
          api_common_func.SCREENSHOT_LOCAL_DIRECTORY,
          argument_content.data.files);
      }
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

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
