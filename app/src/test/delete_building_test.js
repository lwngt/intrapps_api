const assert = require('chai').assert;
const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var build_id = 51;

describe('Post /delete_building', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('build_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
      })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('build_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": null
      })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', '')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('build_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": ""
      })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('build_id is not number', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 'a'
      })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });
  });

  it('no build id to be set', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 9999
      })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('delete_building')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });
});

// # ファイル復帰

// cp ./test/files/1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.ipa /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/ipa
// cp ./test/files/1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.plist /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/ipa
// cp ./test/files/1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.png /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/icon

// cp ./test/files/1567004691_5d3ef9f7c6e1442d939127143f0c3e15_app-debug.apk /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/apk
// cp ./test/files/1567004691_5d3ef9f7c6e1442d939127143f0c3e15_app-debug.png /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/icon

// # buildings

//     # ios

// INSERT INTO `buildings` (`id`, `vendor_id`, `project_id`, `upload_user_id`, `kind`, `app_name`, `icon`, `current_version`, `min_os_version`, `bundle_id`, `package_name`, `file_name`, `original_file_name`, `plist_file_name`, `release_note`, `enabled`, `created`, `updated`, `unregisted`)
// VALUES
//	(23, 1, 1, 1, 0, 'test', '1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.png', '1.0', 12.4, 'com.lichtwork.test', NULL, '1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.ipa', 'testipa.ipa', '1566572346_ca3831ac5bc642d2a85dd0c033e4b7ad_testipa.plist', 'リリースノート2', 1, '2019-08-23 14:59:24', '2019-08-25 14:09:08', NULL);

// INSERT INTO `reports` (`id`, `report_building_id`, `report_user_id`, `note`, `created`, `updated`, `unregisted`)
// VALUES
// 	(16, 23, 1, 'test report', '2019-08-24 12:21:57', NULL, NULL);

//     # android

// INSERT INTO `buildings` (`id`, `vendor_id`, `project_id`, `upload_user_id`, `kind`, `app_name`, `icon`, `current_version`, `min_os_version`, `bundle_id`, `package_name`, `file_name`, `original_file_name`, `plist_file_name`, `release_note`, `enabled`, `created`, `updated`, `unregisted`)
// VALUES
// 	(26, 1, 1, 1, 1, 'テストアプリ', '1567004691_5d3ef9f7c6e1442d939127143f0c3e15_app-debug.png', '1.0', 5, NULL, 'com.example.myapplication', '1567004691_5d3ef9f7c6e1442d939127143f0c3e15_app-debug.apk', 'app-debug.apk', NULL, 'aaaabbbbbccccc!!!!', 1, '2019-08-28 15:05:01', NULL, NULL);

// INSERT INTO `reports` (`id`, `report_building_id`, `report_user_id`, `note`, `created`, `updated`, `unregisted`)
// VALUES
// 	(17, 26, 1, 'test report', '2019-08-24 12:21:57', NULL, NULL);

