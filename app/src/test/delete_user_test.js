const assert = require('chai').assert;
const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var user_id = 56;

describe('Post /delete_user', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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
      .post('delete_user')
      .type('form')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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

  it('user_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
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
      .post('delete_user')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 5");
      })
      .catch(err => {
        console.log(err);
        console.log("error 5");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
      })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 6");
      })
      .catch(err => {
        console.log(err);
        console.log("error 6");
        throw err;
      });
  });

  it('user_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": null
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
      .post('delete_user')
      .type('form')
      .set('secretkey', '')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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

  it('user_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": ""
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
      .post('delete_user')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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

  it('user_id is not number', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": 'a'
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

  it('no user id to be set', function () {
    request('https://localhost:8181/api/')
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": 9999
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
      .post('delete_user')
      .type('form')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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
      .post('delete_user')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "user_id": user_id
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

// cp ~/Desktop/test/1549277412_7c8d25f0a0d64724bd2367e331554772_app-debug.apk /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/apk
// cp ~/Desktop/test/1564319246_a7c4cdf9511745c8a7ba1d2104b139f8_1564319240_ae6c9f5e972642939c987e9c34e9ff86_b.jpg /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/screenshot
// cp ~/Desktop/test/1564319246_c4bc3e1c9a194d4e8352d4174a4697a4_1564319240_ceae59197338477b92e07bff8e8a6812_c.jpg /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/screenshot

// ls -l /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/apk/1549277412_7c8d25f0a0d64724bd2367e331554772_app-debug.apk
// ls -l /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/screenshot/1564319246_a7c4cdf9511745c8a7ba1d2104b139f8_1564319240_ae6c9f5e972642939c987e9c34e9ff86_b.jpg
// ls -l /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/screenshot/1564319246_c4bc3e1c9a194d4e8352d4174a4697a4_1564319240_ceae59197338477b92e07bff8e8a6812_c.jpg

// # projects

// INSERT INTO `projects` (`id`, `vendor_id`, `name`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `overview`, `created`, `updated`, `unregisted`)
// VALUES
// 	(11, 1, 'aaaa', '1564319246_a7c4cdf9511745c8a7ba1d2104b139f8_1564319240_ae6c9f5e972642939c987e9c34e9ff86_b.jpg', '1564319246_c4bc3e1c9a194d4e8352d4174a4697a4_1564319240_ceae59197338477b92e07bff8e8a6812_c.jpg', NULL, NULL, NULL, 'dfafa', '2019-07-28 13:07:43', NULL, NULL);


// # buildings

// INSERT INTO `buildings` (`id`, `build_sequece_no`, `vendor_id`, `user_id`, `upload_user_id`, `kind`, `app_name`, `icon`, `current_version`, `min_os_version`, `bundle_id`, `package_name`, `file_name`, `original_file_name`, `plist_file_name`, `release_note`, `enabled`, `created`, `updated`, `unregisted`)
// VALUES
// 	(3, 1, 1, 11, 1, 1, '販売管理アプリ', NULL, '2.1.2', 5.1, NULL, 'com.testapp.testipa', '1549277412_7c8d25f0a0d64724bd2367e331554772_app-debug.apk', 'testipa.apk', NULL, '更新されました11', 1, '2019-05-26 08:34:54', NULL, NULL);


// # user_manage_projects

// INSERT INTO `user_manage_projects` (`id`, `user_id`, `vendor_id`, `user_id`, `created`, `updated`, `unregisted`)
// VALUES
// 	(24, 1, 1, 11, '2019-07-28 13:07:44', NULL, NULL);

// INSERT INTO `user_manage_projects` (`id`, `user_id`, `vendor_id`, `user_id`, `created`, `updated`, `unregisted`)
// VALUES
// 	(25, 3, 1, 11, '2019-07-28 13:07:44', NULL, NULL);

// # reports

// INSERT INTO `reports` (`id`, `report_building_id`, `report_user_id`, `note`, `created`, `updated`, `unregisted`)
// VALUES
// 	(15, 3, 1, 'あああああ', '2019-06-09 12:41:19', NULL, NULL);
