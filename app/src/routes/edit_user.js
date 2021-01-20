// Include common scripts
let api_common = require('../common/api_common');
let api_common_func = new api_common;

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
var multer = require('multer')
var router = express.Router();
var upload = multer();

let LOG_FILE_NAME = "edit_user";

router.post('/', upload.none(), (req, res) => {

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

  if (validation_common_func.check_authority(req.body.authority) === false) {
    let response = api_common_func.response_400_0437();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_user_id(req.body.user_id) === false) {
    let response = api_common_func.response_400_0438();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_user_manage_project_ids(
    req.body.user_manage_project_ids) === false) {
    let response = api_common_func.response_400_0436();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  let argument_content = {
    "data": {
      "username": req.body.username,
      "password": req.body.password,
      "email": req.body.email,
      "family_name": req.body.family_name,
      "given_name": req.body.given_name,
      "authority": req.body.authority,
      "user_manage_project_ids": req.body.user_manage_project_ids,
      "id": req.body.user_id
    }
  }

  // get header auth data
  let apikey = req.headers['apikey'];
  let secretkey = req.headers['secretkey'];

  // process
  run_process_all(apikey, secretkey, argument_content, res);
});

// Function : run_process_all
// Argument : apikey           / api key(api argument)
//          : secretkey        / secret key(api argument)
//          : argument_content / arguments for process (api argument)
//          : res              / response object
// response : none
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

    // check authority
    let authority_check_sql = db_common_func.create_select_authority(
      argument_content.data.authority);
    result = await execute_sql(authority_check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0437();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check user exists
    let user_check_sql
      = db_common_func.create_exists_user_sql(
        argument_content.data.username, argument_content.data.id);
    result = await execute_sql(user_check_sql);
    if (Number(result[0].count_user) > 0) {
      // the user has already existed
      let response = api_common_func.response_400_0413();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // check user id is in the vendor
    user_check_sql = db_common_func.create_user_sql(vendor_id, argument_content.data.id)
    result = await execute_sql(user_check_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0438();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
    let authority_type = result[0].authority_type;

    // check other admin user exists
    if (authority_type !== Number(argument_content.data.authority)) {
      user_check_sql
        = db_common_func.create_exists_other_authority_user_sql(
          vendor_id, argument_content.data.id);
      result = await execute_sql(user_check_sql);
      if (Number(result[0].authority_check) === false) {
        // the user has already existed
        let response = api_common_func.response_400_0440();
        api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
        return;
      }
    }

    // check user_manage_projects
    let insert_user = false;
    let check = false;

    if (argument_content.data.user_manage_project_ids === undefined
      || argument_content.data.user_manage_project_ids === null
      || argument_content.data.user_manage_project_ids.length === 0) {
      // when user_manage_project_ids is not set
      // don't chek
      check = true;
      if (Array.isArray(argument_content.data.user_manage_project_ids)
        && argument_content.data.user_manage_project_ids.length === 0) {
        // only delete user_manage_projects record
        insert_user = true;
      }
    } else if (argument_content.data.user_manage_project_ids !== null
      && Array.isArray(argument_content.data.user_manage_project_ids)
      && argument_content.data.user_manage_project_ids.length > 0) {
      // when user_manage_project_ids is array
      // check project_id
      let check_sql = db_common_func.create_project_of_vendor_sql(vendor_id);
      result = await execute_sql(check_sql);
      let project = result;

      let check_count = 0;
      result.forEach(project => {
        argument_content.data.user_manage_project_ids.forEach(project_id => {
          if (Number(project_id) === Number(project.id)) {
            check_count++;
            insert_user = true;
          }
        });
      });

      if (check_count === argument_content.data.user_manage_project_ids.length) {
        check = true;
      }
    } else if (argument_content.data.user_manage_project_ids !== null
      && Array.isArray(argument_content.data.user_manage_project_ids) === false
      && Number.isFinite(Number(argument_content.data.user_manage_project_ids)) === true
      && argument_content.data.user_manage_project_ids.length > 0) {
      // when user_manage_project_ids is not array
      // check project_id
      let check_sql = db_common_func.create_project_of_vendor_sql(vendor_id);
      result = await execute_sql(check_sql);

      result.forEach(project => {
        if (Number(project.project_id) === Number(argument_content.data.user_manage_project_ids)) {
          check = true;
          insert_user = true;
        }
      });
    }

    if (check === false) {
      let response = api_common_func.response_400_0436();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }

    // insert user table
    let update_user_sql = db_common_func.create_update_user_sql(
      argument_content.data.family_name,
      argument_content.data.given_name,
      argument_content.data.username,
      argument_content.data.email,
      argument_content.data.password,
      argument_content.data.authority,
      argument_content.data.id
    );
    result = await execute_sql(update_user_sql);

    if (insert_user) {
      // delete all record of user_manage_projects for user
      let delete_user_sql = db_common_func.create_delete_user_manage_projects_of_user_sql(
        vendor_id,
        argument_content.data.id
      );
      //execute sql
      result = await execute_sql(delete_user_sql);

      // insert user_manage_projects for user
      if (argument_content.data.user_manage_project_ids.length > 0) {
        insert_user_sql = db_common_func.create_insert_user_manage_projects_multiple_sql(
          vendor_id,
          argument_content.data.user_manage_project_ids,
          argument_content.data.id,
          true
        );
        //execute sql
        result = await execute_sql(insert_user_sql);
      }
    }

    // success , then response 200
    let response = api_common_func.response_200();
    api_common_func.response_object(res, 200, response, null, LOG_FILE_NAME);
    return;
  } catch (error) {
    if (error.message === "0004") {
      let response = api_common_func.response_400_0004();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    } else if (error.message === "0009") {
      let response = api_common_func.response_400_0009();
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
