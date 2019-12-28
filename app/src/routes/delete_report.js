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

let LOG_FILE_NAME = "delete_report";

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

  if (validation_common_func.check_build_id(req.body.build_id) === false) {
    let response = api_common_func.response_400_0446();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_report_id(req.body.report_id) === false) {
    let response = api_common_func.response_400_0427();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  let argument_content = {
    "data": {
      "build_id": req.body.build_id,
      "report_id": req.body.report_id
    }
  }

  // process
  run_process_all(apikey, secretkey, argument_content, res);
  return;
});

module.exports = router;


// Function : run_process_all
// Argument : apikey            / api key(api argument)
//          : secretkey         / secret key(api argument)
//          : argument_content  / build id(api argument), report id(api argument)
//          : res               / response object
// response : none
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

    // check report id and build id
    let check_sql = db_common_func.create_report_sql(
      argument_content.data.build_id);
    result = await execute_sql(check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0446();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    let check = false;
    result.forEach(report_record => {
      if (report_record.build_id === Number(argument_content.data.build_id)
        && report_record.report_id === Number(argument_content.data.report_id)) {
        check = true;
      }
    });

    if (check === false) {
      let response = api_common_func.response_400_0432();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // delete sql
    let delete_sql = db_common_func.create_report_delete_sql(
      argument_content.data.build_id, argument_content.data.report_id);
    result = await execute_sql(delete_sql);

    // success , then response 200
    let response = api_common_func.response_200();
    api_common_func.response_object(res, 200, response, null, LOG_FILE_NAME);
    return;

  } catch (error) {
    if (error.message === "0004") {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    } else {
      let response = api_common_func.response_400_9999();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
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
