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

let LOG_FILE_NAME = "user";

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

  if (validation_common_func.check_user_id(req.query.user_id) === false) {
    if (req.query.user_id !== undefined) {
      let response = api_common_func.response_400_0438();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
  }


  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  let argument_content = {
    "data": {
      "user_id": (req.query.user_id !== undefined) ? req.query.user_id : null
    }
  }


  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;


// Function : run_process_all
// Argument : apikey            / api key(api argument)
//          : secretkey         / secret key(api argument)
//          : argument_content  / user id to query
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
    let management = null

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      management = parseInt(result[0].management);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    if (Number(management) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // check user id if user to execute is admin or not
    let check_sql = db_common_func.create_admin_users_sql(vendor_id);
    result = await execute_sql(check_sql);

    let check = false;
    result.forEach(user => {
      if (Number(user.id) === Number(user_id)) {
        check = true;
      }
    });

    if (check === false) {
      let response = api_common_func.response_400_0435();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // set use id to get information
    let current_user_id = (argument_content.data.user_id !== null) ?
      argument_content.data.user_id : user_id;

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

    // get users information
    let user_sql = db_common_func.create_user_sql(vendor_id, current_user_id);
    result = await execute_sql(user_sql);
    let user = result;

    // get project of vendor
    let projects_sql = db_common_func.create_projects_of_vendor_sql(
      vendor_id, current_user_id);
    result = await execute_sql(projects_sql);
    let projects = result;

    // make json response
    let response_data = util_common_func.create_user_api_content
      (sidebar, user[0], projects);

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
      if (results.length === 0) {
        return resolve(null);
      }
      return resolve(results);
    })
  );
}
