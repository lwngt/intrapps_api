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
var fs = require('fs');
let moment = require("moment");
let path = require('path');
var express = require('express');
var router = express.Router();
var multer = require('multer');
const uuidv4 = require('uuid/v4');
const util = require('util');
const PkgReader = require('reiko-parser');

let timestamp = moment().unix(); // unix time stamp
let uuid = uuidv4().split('-').join(''); // uuid
var file = null;
let LOG_FILE_NAME = "add_building";

let storage = multer.diskStorage({
  // Directory to save files
  destination: api_common_func.APP_TEMP_LOCAL_DIRECTORY,
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

let type = upload.single('build_app');

// Post method to upload
router.post('/', type, (req, res) => {

  common_logs_func.output_log("header : apikey=" + req.headers['apikey']
    + " secretkey=" + req.headers['apikey']
    + " parameter=" + JSON.stringify(req.body),
    "START", LOG_FILE_NAME);

  if (validation_common_func.check_apikey(req.headers['apikey']) === false) {
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    upload_file_single_delete(req.file.path);
    return;
  }

  if (validation_common_func.check_secretkey(req.headers['secretkey']) === false) {
    let response = api_common_func.response_401_0005();
    api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
    upload_file_single_delete(req.file.path);
    return;
  }

  if (validation_common_func.check_build_app_file(req.file) === false) {
    let response = api_common_func.response_400_0422();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  if (validation_common_func.check_project_id(req.body.project_id) === false) {
    let response = api_common_func.response_400_0423();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    upload_file_single_delete(req.file.path);
    return;
  }

  let release_note = null;
  if (validation_common_func.check_release_note(req.body.release_note) === false) {
    let response = api_common_func.response_400_0424();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    upload_file_single_delete(req.file.path);
    return;
  } else {
    if (req.body.release_note === undefined
      || req.body.release_note === null
      || req.body.release_note.length === 0) {
      release_note = null;
    } else {
      release_note = req.body.release_note;
    }
  }

  // get arguments of post
  const apikey = req.headers['apikey'];
  const secretkey = req.headers['secretkey'];
  const application = req.file;
  const project_id = req.body.project_id;

  // check upload file extention
  if (path.extname(file.originalname) !== '.ipa'
    && path.extname(file.originalname) !== '.apk') {
    let response = api_common_func.response_400_0103();
    api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
    return;
  }

  let extname = 0;
  if (path.extname(file.originalname) === '.ipa') {
    extname = 0;
  } else {
    extname = 1;
  }

  let argument_content = {
    "data": {
      "file_name": file.originalname,
      "input_package_file_name": application.path,
      "timestamp": timestamp,
      "uuid": uuid,
      "project_id": project_id,
      "release_note": release_note
    }
  };

  if (extname === 0) {
    run_ios_process_all_ios(apikey, secretkey, argument_content, res);
  } else {
    run_ios_process_all_android(apikey, secretkey, argument_content, res);
  }

});

// Function : run_ios_process_all_android
// Argument : argument_content / object of api
// response : none
async function run_ios_process_all_android(apikey, secretkey, argument_content, res) {
  try {
    // confirm user's id and vendor id
    let auth_sql = db_common_func.create_auth_sql(apikey, secretkey);
    let result = await execute_sql(auth_sql);
    if (result === null) {
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    let vendor_id = null;
    let user_id = null;
    let add = null;
    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      add = parseInt(result[0].add);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    if (Number(add) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    let select_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.project_id)
    result = await execute_sql(select_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0423();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    // apk analyze
    const apk_analyze_data = await app_analyzer(
      argument_content.data.input_package_file_name, 'apk');

    // rename to APK directory
    let apk_file_name = path.basename(argument_content.data.input_package_file_name);
    util_common_func.rename_file(argument_content.data.input_package_file_name
      , api_common_func.APK_LOCAL_DIRECTORY + "/" + apk_file_name);

    // insert data
    let buildings_sql = db_common_func.create_buildings_sql_for_android(
      vendor_id,
      argument_content.data.project_id,
      user_id,
      apk_analyze_data.pkg_information,
      path.basename(argument_content.data.input_package_file_name),
      argument_content.data.file_name,
      argument_content.data.release_note,
      path.basename(apk_analyze_data.icon));

    result = await execute_sql(buildings_sql);
    if (result === null) {
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
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
    } else if (error.message === "0102") {
      let response = api_common_func.response_400_0102();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    } else {
      let response = api_common_func.response_400_9999();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
  }
}

// Function : run_ios_process_all_ios
// Argument : argument_content / object of api
// response : none
async function run_ios_process_all_ios(apikey, secretkey, argument_content, res) {
  try {
    // confirm user's id and vendor id
    let auth_sql = db_common_func.create_auth_sql(apikey, secretkey);
    let result = await execute_sql(auth_sql);
    if (result === null) {
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    let vendor_id = null;
    let user_id = null;
    let add = null;
    if (result.length > 0) {
      vendor_id = parseInt(result[0].vendor_id);
      user_id = parseInt(result[0].user_id);
      add = parseInt(result[0].add);
    }

    if (vendor_id === null || user_id === null) {
      // the user failed to authenticate by apikey and secretkey
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    // check user's authority type
    if (Number(add) === 0) {
      let response = api_common_func.response_403_0010();
      api_common_func.response_object(res, 403, response, null, LOG_FILE_NAME);
      return;
    }

    // check the project id is valid
    let select_sql = db_common_func.create_select_project_sql(
      vendor_id, user_id, argument_content.data.project_id)
    result = await execute_sql(select_sql);
    if (result.length === 0) {
      let response = api_common_func.response_400_0430();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      upload_file_single_delete(argument_content.data.input_package_file_name);
      return;
    }

    // ipa analyze
    let ipa_analyze_data = await app_analyzer(argument_content.data.input_package_file_name, "ipa");
    let plist_content = create_plist_data(
      ipa_analyze_data.pkg_information, path.basename(argument_content.data.input_package_file_name));

    // rename to IPA directory
    let ipa_file_name = path.basename(argument_content.data.input_package_file_name);
    util_common_func.rename_file(argument_content.data.input_package_file_name
      , api_common_func.IPA_LOCAL_DIRECTORY + "/" + ipa_file_name);

    // write plist
    let plist_file_name = argument_content.data.file_name.split('.')[0] + ".plist";
    let plist_file_name_path = api_common_func.PLIST_LOCAL_DIRECTORY
      + "/" + argument_content.data.timestamp + "_" + argument_content.data.uuid
      + "_" + plist_file_name;
    fs.writeFileSync(plist_file_name_path, String(plist_content.plist));

    // insert data
    let buildings_sql = db_common_func.create_buildings_sql_for_ios(
      vendor_id,
      argument_content.data.project_id,
      user_id,
      ipa_analyze_data.pkg_information,
      argument_content.data.file_name,
      ipa_file_name,
      path.basename(plist_file_name_path),
      argument_content.data.release_note,
      path.basename(ipa_analyze_data.icon));

    result = await execute_sql(buildings_sql);
    if (result === null) {
      let response = api_common_func.response_401_0005();
      api_common_func.response_object(res, 401, response, null, LOG_FILE_NAME);
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
    } else if (error.message === "0102") {
      let response = api_common_func.response_400_0102();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    } else {
      let response = api_common_func.response_400_9999();
      api_common_func.response_object(res, 400, response, null, LOG_FILE_NAME);
      return;
    }
  }
}

// Function : create_plist_data
// Argument : ipa data
// response : plist data
function create_plist_data(ipa, file_name) {
  let data = fs.readFileSync(api_common_func.TEMPATE_PLIST_PATH, 'utf8');
  let content = {
    "plist": data.
      replace('__DUMMYURL__', api_common_func.IPA_URL + "/" + file_name).
      replace('__DUMMYBUNDLEID__', ipa.CFBundleIdentifier).
      replace('__DUMMYVERSION__', ipa.CFBundleShortVersionString).
      replace('__DUMMYTITLE__', ipa.CFBundleExecutable)
  };
  return content;
}

// Function : upload_file_single_delete
// Argument : file / full path of delete file
// response : None
function upload_file_single_delete(file) {
  if (file !== undefined || file !== null) {
    util_common_func.upload_file_delete([file]);
  }
}

// Function : app_analyzer
// Argument : file_name / response object of api
//          : kind      / ipa or plist
// response : result of parse
async function app_analyzer(file_name, kind) {
  return new Promise((resolve, reject) => {
    const reader = new PkgReader(file_name, kind, { withIcon: true });
    reader.parse((error, pkg_info) => {
      if (error) {
        reject("0102");
        return;
      } else {
        // Buffer
        let encoded_data = pkg_info.icon;
        let decoded_file_name = null;
        if (encoded_data !== undefined && encoded_data !== null) {
          let file_data = encoded_data.replace(/^data:\w+\/\w+;base64,/, '')
          let decoded_file = Buffer.from(file_data, 'base64')

          // create file name to save
          let decoded_file_body_name = file_name.slice(0, -4)
          let file_extension = encoded_data.toString().slice(
            encoded_data.indexOf('/') + 1, encoded_data.indexOf(';'));
          decoded_file_name = api_common_func.ICON_LOCAL_DIRECTORY
            + '/'
            + path.basename(decoded_file_body_name)
            + '.'
            + file_extension;

          // save
          fs.writeFileSync(decoded_file_name, decoded_file);
        } else {
          // copy dummy icon as app icon
          try {
            // create file name to save
            let decoded_file_body_name = file_name.slice(0, -4);

            decoded_file_name = api_common_func.ICON_LOCAL_DIRECTORY
              + '/'
              + path.basename(decoded_file_body_name)
              + '.'
              + "png";

            fs.copyFileSync(
              api_common_func.NO_ICON_PATH,
              decoded_file_name,
              fs.constants.COPYFILE_EXCL
            );
          } catch (error) {
            reject("0102");
          }
        }

        let result = {
          "pkg_information": pkg_info,
          "icon": decoded_file_name
        }
        resolve(result);
        return;
      }
    });
  });
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


