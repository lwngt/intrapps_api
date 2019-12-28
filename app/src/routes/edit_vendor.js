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
var express = require('express');
var router = express.Router();

let LOG_FILE_NAME = "edit_vendor";

router.post('/', (req, res) => {

  common_logs_func.output_log("header : apikey=" + req.headers['apikey']
    + " secretkey=" + req.headers['apikey']
    + " parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

  // check argument variables
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

  if (validation_common_func.check_user_id(req.body.contractor_user_id) === false) {
    let response = api_common_func.response_400_0438();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_company(req.body.company) === false) {
    let response = api_common_func.response_400_0408();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_country(req.body.country) === false) {
    let response = api_common_func.response_400_0409();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_province(req.body.province) === false) {
    let response = api_common_func.response_400_0410();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_city(req.body.city) === false) {
    let response = api_common_func.response_400_0411();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_postalcode(req.body.postalcode) === false) {
    let response = api_common_func.response_400_0412();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_address(req.body.address) === false) {
    let response = api_common_func.response_400_0403();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_telephone_number(req.body.telephone_number) === false) {
    let response = api_common_func.response_400_0407();
    api_common_func.response_object(res, 400, response, null);
    return;
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  let argument_content = {
    "data": {
      "contractor_user_id": req.body.contractor_user_id,
      "company": req.body.company,
      "country": req.body.country,
      "province": req.body.province,
      "city": req.body.city,
      "address": req.body.address,
      "postalcode": req.body.postalcode,
      "telno": req.body.telephone_number
    }
  }

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

module.exports = router;


// Function : run_process_all
// Argument : apikey      / api key(api argument)
//          : secretkey   / secret key(api argument)
//          : argument_content / api argument for vendor update
//          : res         / response object
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
    let management_edit = null;

    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      management = parseInt(result[0].management);
      management_edit = parseInt(result[0].management_edit);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    if (Number(management) === 0 || Number(management_edit) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // check user id in the vendor
    let user_check_sql = db_common_func.create_user_sql(
      vendor_id, argument_content.data.contractor_user_id);
    result = await execute_sql(user_check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0438();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check authority of contractor user
    let user_management = result[0].management;
    let user_management_add = result[0].management_add;
    let user_management_edit = result[0].management_edit;
    let user_management_delete = result[0].management_delete;
    // the user is admin or not
    if (user_management !== 1 || user_management_add !== 1
      || user_management_edit !== 1 || user_management_delete !== 1) {
      let response = api_common_func.response_400_0439();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // update vendor table
    let vendor_update_sql = db_common_func.create_vendor_update_sql
      (vendor_id, argument_content);

    //execute sql
    result = await execute_sql(vendor_update_sql);
    if (result === null) {
      // success , then response 200 but no data
      let response = api_common_func.response_200();
      api_common_func.response_object(res, 200, response, null, LOG_FILE_NAME);
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
