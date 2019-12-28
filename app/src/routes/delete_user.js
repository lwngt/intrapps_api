// Include common scripts
let api_common = require('../common/api_common');
let api_common_func = new api_common;

let db_common = require('../common/db_common');
let db_common_func = new db_common;

let validation_common = require('../common/validation_common');
let validation_common_func = new validation_common;

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

// Include outer libraries
let express = require('express');
let router = express.Router();

let LOG_FILE_NAME = "delete_user";

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

  if (validation_common_func.check_user_id(req.body.user_id) === false) {
    let response = api_common_func.response_400_0438();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  let argument_content = {
    "data": {
      "user_id": req.body.user_id
    }
  }

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;


// Function : run_process_all
// Argument : apikey              / api key(api argument)
//          : secretkey           / secret key(api argument)
//          : argument_content    / user id to delete
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
    let management = null;
    let management_delete = null;

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      management = parseInt(result[0].management);
      management_delete = parseInt(result[0].management_delete);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    if (Number(management) === 0 || Number(management_delete) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // delete the myself
    if (user_id === Number(argument_content.data.user_id)) {
      let response = api_common_func.response_400_0448();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check user id is in the vendor
    let user_check_sql = db_common_func.create_user_sql(vendor_id, argument_content.data.user_id)
    result = await execute_sql(user_check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0438();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check user exists
    user_check_sql
      = db_common_func.create_exists_other_user_sql(
        vendor_id, argument_content.data.user_id);
    result = await execute_sql(user_check_sql);
    if (Number(result[0].count_user) === 0) {
      let response = api_common_func.response_400_0440();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check if user-self is conctractor or not
    let vendor_sql = db_common_func.create_vendor_sql(vendor_id);
    result = await execute_sql(vendor_sql);
    let vendor = result;
    if (vendor[0].contractor_user_id === Number(argument_content.data.user_id)) {
      let response = api_common_func.response_400_0448();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check other admin user exists
    user_check_sql
      = db_common_func.create_exists_other_authority_user_sql(
        vendor_id, argument_content.data.user_id);

    //execute sql
    result = await execute_sql(user_check_sql);
    if (Number(result[0].authority_check) === false) {
      // the user has already existed
      let response = api_common_func.response_400_0440();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // delete user
    let update_user_sql
      = db_common_func.create_update_unregisted_user_sql(
        vendor_id, argument_content.data.user_id);

    //execute sql
    result = await execute_sql(update_user_sql);

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
