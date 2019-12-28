// Include common scripts
let api_common = require('../common/api_common');
let api_common_func = new api_common;

let util_common = require('../common/util_common');
let util_common_func = new util_common;

let db_common = require('../common/db_common');
let db_common_func = new db_common;

let mail_common = require('../common/mail_common');
let mail_common_func = new mail_common;

let validation_common = require('../common/validation_common');
let validation_common_func = new validation_common;

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

// Include outer libraries
var express = require('express');
var router = express.Router();
//global.fetch = require('node-fetch');

let LOG_FILE_NAME = "signup";

router.post('/', (req, res) => {

  common_logs_func.output_log("parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

  // check arguments
  if (validation_common_func.check_username(req.body.username) === false) {
    let response = api_common_func.response_400_0401();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_password(req.body.password) === false) {
    let response = api_common_func.response_400_0402();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_address(req.body.address) === false) {
    let response = api_common_func.response_400_0403();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_email(req.body.email) === false) {
    let response = api_common_func.response_400_0404();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_family_name(req.body.family_name) === false) {
    let response = api_common_func.response_400_0405();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_given_name(req.body.given_name) === false) {
    let response = api_common_func.response_400_0406();
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

  if (validation_common_func.check_telephone_number(req.body.telephone_number) === false) {
    let response = api_common_func.response_400_0407();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_address(req.body.address) === false) {
    let response = api_common_func.response_400_0403();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // unregist_at is "" , because this user is valid when signup
  let argument_content = {
    "data": {
      "username": req.body.username,
      "password": req.body.password,
      "address": req.body.address,
      "email": req.body.email,
      "family_name": req.body.family_name,
      "given_name": req.body.given_name,
      "company": req.body.company,
      "country": req.body.country,
      "province": req.body.province,
      "city": req.body.city,
      "postalcode": req.body.postalcode,
      "telephone_number": req.body.telephone_number
    }
  }

  run_process_all(argument_content, res);

});

async function run_process_all(argument_content, res) {
  try {

    // check user exists
    let user_check_sql
      = db_common_func.create_exists_user_sql(argument_content.data.username);
    let result = await execute_sql(user_check_sql);
    if (Number(result[0].count_user) > 0) {
      // the user has already existed
      let response = api_common_func.response_400_0444();
      api_common_func.response_object(res, 400, response, result, LOG_FILE_NAME);
      return;
    }

    // insert vendor table
    let insert_vendor_sql = db_common_func.create_vendor_insert_sql(
      argument_content.data);
    result = await execute_sql(insert_vendor_sql);
    let vendor_id = result.insertId;

    // get verified code
    let verified_code = util_common_func.get_verified_code();
    if (process.env.NODE_ENV == 'development') {
      verified_code = "000000"; // %%% for test
    }

    // insert user table
    let insert_user_sql = db_common_func.create_insert_user_sql(
      vendor_id,
      argument_content.data.family_name,
      argument_content.data.given_name,
      argument_content.data.username,
      argument_content.data.email,
      argument_content.data.password,
      verified_code,
      0
    );
    result = await execute_sql(insert_user_sql);
    let user_id = result.insertId;

    // update vendor table
    let update_vendor_sql = db_common_func.create_set_contractor_sql(
      vendor_id, user_id);
    result = await execute_sql(update_vendor_sql);

    // get apikey and secret key
    let apikey_secretkey_sql = db_common_func.create_get_apikey_secretkey_sql(user_id);
    result = await execute_sql(apikey_secretkey_sql);
    let api_key = result[0].api_key;
    let secret_key = result[0].secret_key;

    // make json response
    let response_data = util_common_func.create_signup_api_content(
      api_key, secret_key);

    // send email
    result = await execute_send_email(argument_content.data.email, verified_code);

    // success , then response 200
    let response = api_common_func.response_200();
    api_common_func.response_object(res, 200, response, response_data, LOG_FILE_NAME);
    return;
  } catch (error) {
    if (error.message === "0004") {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    } else if (error.message === "0009") {
      let response = api_common_func.response_400_0445();
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
    db_common_func.execute_sql(sql, null, (error, results, fields) => {
      // execute error
      if (error) {
        return reject(new Error("0004"));
      }
      // return response
      return resolve(results);
    })
  );
}

// Function : execute_send_email
// Argument : sql / sql statement
// response : result of sql execute
// note     : async function of sql execute
async function execute_send_email(to_email_address, verified_code) {
  return new Promise((resolve, reject) => {
    mail_common_func.send_user_confirm_email(to_email_address, verified_code, (error, result) => {
      // execute error
      if (error) {
        console.log(error);
        return reject(new Error("0009"));
      }
      // return response
      return resolve(result);
    })
  });
}

module.exports = router;
