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
global.fetch = require('node-fetch');

let LOG_FILE_NAME = "login";

// Post method to upload
router.post('/', (req, res) => {

  common_logs_func.output_log("parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

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

  // get arguments of post
  const username = req.body.username;
  const password = req.body.password;

  let argument_content = {
    "data": {
      "username": username,
      "password": password
    }
  };

  run_process_all(argument_content, res);

});

async function run_process_all(argument_content, res) {
  try {
    // confirm user's id and vendor id in db
    let auth_sql = db_common_func.create_get_apikey_secretkey_by_login_sql(
      argument_content.data.username, argument_content.data.password);
    result = await execute_sql(auth_sql);
    if (result === null) {
      let response = api_common_func.response_400_0417();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // no user of user input id / password
    if (result.length === 0) {
      let response = api_common_func.response_401_0418();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      return;
    }

    // make json response
    let response_data = util_common_func.create_login_api_content(result[0]);

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
      return resolve(results);
    })
  );
}
module.exports = router;
