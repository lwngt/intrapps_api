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

let LOG_FILE_NAME = "delete_project";

router.post('/', (req, res) => {

  common_logs_func.output_log("header : apikey=" + req.headers['apikey']
    + " secretkey=" + req.headers['apikey']
    + " parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

  if (validation_common_func.check_apikey(req.headers['apikey']) === false) {
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_secretkey(req.headers['secretkey']) === false) {
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_project_id(
    req.body.project_id) === false) {
    let response = api_common_func.response_400_0423();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  let argument_content = {
    "data": {
      "project_id": req.body.project_id
    }
  }

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;


// Function : run_process_all
// Argument : apikey              / api key(api argument)
//          : secretkey           / secret key(api argument)
//          : argument_content    / project id to delete
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
    let delete_authority = null;

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      delete_authority = parseInt(result[0].delete);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    // check user's authority type
    if (Number(delete_authority) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // check project id
    let check_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.project_id);
    result = await execute_sql(check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0430();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // delete all image file of delete
    let delete_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.project_id);
    result = await execute_sql(delete_sql);
    let delete_files = [];
    // save delete screenshot image files
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

    // delete all building file
    let build_id = [];
    delete_sql = db_common_func.
      create_select_buildings_for_project_build_history_sql(argument_content.data.project_id);
    result = await execute_sql(delete_sql);
    result.forEach(build => {
      // save buildings id belong to project deletes.
      build_id.push(build.id);
      // save delete files ,icon ,apk, plist, ipa
      if (build.icon !== null) {
        delete_files.push(api_common_func.ICON_LOCAL_DIRECTORY + "/" + build.icon);
      }
      if (build.kind === 0) {
        delete_files.push(api_common_func.IPA_LOCAL_DIRECTORY + "/" + build.file_name);
        delete_files.push(api_common_func.PLIST_LOCAL_DIRECTORY + "/" + build.plist_file_name);
      } else {
        delete_files.push(api_common_func.APK_LOCAL_DIRECTORY + "/" + build.file_name);
      }
    });

    // delete file execute
    if (delete_files.length > 0) {
      util_common_func.upload_file_delete(delete_files);
    }

    // execute delete record of report table
    if (build_id.length > 0) {

      // execute delete report record of reports table
      let build_id_string = build_id.join(',');

      delete_sql = db_common_func.create_report_multi_delete_sql(build_id_string);
      result = await execute_sql(delete_sql);
      if (result === null) {
        let response = api_common_func.response_400_0004();
        api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
        return;
      }
    }

    // execute delete record of project table
    delete_sql = db_common_func.create_delete_project_sql(
      vendor_id, argument_content.data.project_id, user_id);
    result = await execute_sql(delete_sql);
    if (result === null) {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // execute delete record of user_manage_projects table
    delete_sql = db_common_func.create_delete_user_manage_projects_sql(
      vendor_id, argument_content.data.project_id);
    result = await execute_sql(delete_sql);
    if (result === null) {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // execute delete record of buildings table
    delete_sql = db_common_func.delete_building_by_project_sql(
      vendor_id, argument_content.data.project_id);
    result = await execute_sql(delete_sql);
    if (result === null) {
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
    }
    if (error.message === "0008") {
      let response = api_common_func.response_400_0008();
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
