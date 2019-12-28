const assert = require('chai').assert;
const request = require('supertest');

var secretkey = 'bff1f985cd522536fa7ffba9d8caa43221178d6efaf912c541f0199e';
var apikey = '9904f0f35765d9017e9491814a088070aab1b6b23b264ee33ebd2220';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var vendor_id = 10;

describe('Post /delete_project', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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
      .post('delete_vendor')
      .type('form')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

  it('vendor_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

  it('vendor_id is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": null
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', '')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

  it('vendor_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": ""
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

  it('vendor_id is not number', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": 'a'
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

  it('no vendor id to be set', function () {
    request('https://localhost:8181/api/')
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": 9999
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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
      .post('delete_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "vendor_id": vendor_id
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

// # data & file recovery

// cp /Users/eiden/Documents/workspaces/web/appdistributer/app/src/test/files/1566651445_03a891092c104de685119f0e50a8e981_1566651445_b1dfd064d14b4d02a47d3953e87892d7_b.jpg /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/screenshot/1566651445_03a891092c104de685119f0e50a8e981_1566651445_b1dfd064d14b4d02a47d3953e87892d7_b.jpg
// cp /Users/eiden/Documents/workspaces/web/appdistributer/app/src/test/files/1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.png /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/images/icon/1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.png
// cp /Users/eiden/Documents/workspaces/web/appdistributer/app/src/test/files/1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.apk /Users/eiden/Documents/workspaces/web/appdistributer/app/src/public/files/apk/1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.apk


// INSERT INTO `vendors` (`id`, `name`, `api_key`, `contractor_vendor_id`, `country`, `province`, `city`, `address`, `zip_code`, `tel`, `created`, `updated`, `unregisted`)
// VALUES
// 	(2, '36B6492C4B858D3F9EF6C632E6D34B429F7672AD30CF7BEBC80B215B6D87AACE', 'b4defeca6dc3e360d766c7cd0efbce778164e6c3776bdfe8d887e91f', 3, '5A2A985684F7B734F195546BFDC0215F', '3F55BB0ACA6BA8466C0CCC712D51E5EF', '6F6A7BA1DCDE4342C96EC0D2C82534AC', '1D5A5E9D03413A9C22C001319B14ED47A7F229AC8187141E281994C18432103E', 'BEB4B2FDFB2B401AB6B2DA098FBCE685', '3E963EF407D5C8FE9CC388D69AA79482', 1, '2019-09-16 15:06:28', NULL, NULL);

// INSERT INTO `users` (`id`, `vendor_id`, `first_name`, `last_name`, `authority_type`, `name`, `email`, `password`, `secret_key`, `created`, `updated`, `unregisted`)
// VALUES
// 	(3, 2, 'C8A3448BE132BF92F9C290C476710377', '9AC4AD926610C5266DF85889FDBD9FB4', 0, 'tester1122', '71CC4FCB86A6CE39540FD7766B75273DB3D9A71CA45F2620CEEB18377207152F', 'D5B7AA955E441056E4E9F5F15A95EEE1', '67f1a84f8c3589e570742fffefd22f229fdc3e88ba9e852a9164146eaaaa', '2019-05-15 12:27:10', NULL, NULL);

// INSERT INTO `projects` (`id`, `vendor_id`, `name`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `overview`, `created`, `updated`, `unregisted`)
// VALUES
// 	(10, 2, 'test project', '1566651445_03a891092c104de685119f0e50a8e981_1566651445_b1dfd064d14b4d02a47d3953e87892d7_b.jpg', NULL, NULL, NULL, NULL, 'これはテストプロジェクtp', '2019-08-24 12:57:25', NULL, NULL);

// INSERT INTO `user_manage_projects` (`id`, `vendor_id`, `vendor_id`, `project_id`, `created`, `updated`, `unregisted`)
// VALUES
// 	(19, 3, 2, 10, '2019-08-24 12:57:25', NULL, NULL);

// INSERT INTO `buildings` (`id`, `vendor_id`, `project_id`, `upload_vendor_id`, `kind`, `app_name`, `icon`, `current_version`, `min_os_version`, `bundle_id`, `package_name`, `file_name`, `original_file_name`, `plist_file_name`, `release_note`, `enabled`, `created`, `updated`, `unregisted`)
// VALUES
// 	(27, 2, 10, 3, 1, 'テストアプリ', '1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.png', '1.0', 5, NULL, 'com.example.myapplication', '1567258827_18c288b9854a4437a9c2141fa3c3eaaf_app-debug.apk', 'app-debug.apk', NULL, 'テスト用のアプリを追加', 1, '2019-08-31 13:40:37', NULL, NULL);

// INSERT INTO `reports` (`id`, `report_building_id`, `report_vendor_id`, `note`, `created`, `updated`, `unregisted`)
// VALUES
// 	(20, 27, 3, 'fdasasfsa', '2019-09-05 13:12:50', NULL, NULL);

