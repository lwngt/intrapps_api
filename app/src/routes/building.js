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
var express = require('express');
var router = express.Router();

let LOG_FILE_NAME = "building";

router.get('/', (req, res) => {

  common_logs_func.output_log("header : apikey=" + req.headers['apikey']
    + " secretkey=" + req.headers['apikey']
    + " parameter=" + JSON.stringify(req.query),
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

  if (validation_common_func.check_build_id(req.query.build_id) === false) {
    let response = api_common_func.response_400_0446();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  // get parameters in path
  let argument_content = {
    "data": {
      "build_id": req.query.build_id
    }
  }

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;


// Function : run_process_all
// Argument : apikey            / api key(api argument)
//          : secretkey         / secret key(api argument)
//          : argument_content  / build id(api argument)
//          : res               / response object
// response : none
// note     : check user's authentication and search build information.
//          : after process , execute http response and data
async function run_process_all(apikey, secretkey, argument_content, res) {
  try {
    // confirm user's id and vendor id
    let auth_sql = db_common_func.create_auth_sql(apikey, secretkey);
    let result = await execute_sql(auth_sql);
    if (result === undefined || result === null) {
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    let vendor_id = null;
    let user_id = null;

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    // check build id
    let check_sql = db_common_func.create_building_sql(
      vendor_id,
      argument_content.data.build_id,
      user_id
    );
    result = await execute_sql(check_sql);

    let check = false;
    result.forEach(building_record => {
      if (building_record.build_id === Number(argument_content.data.build_id)) {
        check = true;
      }
    });

    if (check === false) {
      let response = api_common_func.response_400_0431();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // get user information
    let user_information_sql
      = db_common_func.create_user_sql(vendor_id, user_id);
    result = await execute_sql(user_information_sql);
    if (result === null) {
      // no user data
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    }
    let user_information = result;

    // get project information user manages
    let user_manage_projects_sql
      = db_common_func.create_projects_of_user_manage_sql(vendor_id, user_id);
    result = await execute_sql(user_manage_projects_sql);
    let user_manage_projects = result;
    if (result === null) {
      user_manage_projects = null;
    }

    // create sidebar information
    let sidebar = util_common_func.create_sidebar_content(user_information[0]
      , user_manage_projects);

    // get build information
    let building_sql = db_common_func.create_building_sql(
      vendor_id, argument_content.data.build_id, user_id);
    result = await execute_sql(building_sql);
    if (result === null) {
      // success , then response 200 but no data
      let response = api_common_func.response_200();
      api_common_func.response_object(res, 200, response, null, LOG_FILE_NAME);
    }
    let building_information = result[0];

    // get note
    let note_information = null;
    if (building_information !== null) {
      // get list of build id
      let buildings_data_string = Number(building_information.build_id).toString();

      // get report of buildings
      let report_sql = db_common_func.create_report_sql(buildings_data_string);
      result = await execute_sql(report_sql);
      note_information = result;
    }

    // make json response
    let response_data = util_common_func.create_building_api_content
      (sidebar, building_information, note_information);

    // success , then response 200
    let response = api_common_func.response_200();
    api_common_func.response_object(res, 200, response, response_data, LOG_FILE_NAME);
    return;

  } catch (error) {
    if (error.message === "0004") {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    } else {
      let response = api_common_func.response_400_9999();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    }
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
