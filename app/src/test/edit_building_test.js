const assert = require('chai').assert;
const request = require('supertest');

describe('Post /edit_build', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(200)
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', null)
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('build_id is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": null,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(400)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('release_note is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": null,
        "download_enabled": 0
      })
      .expect(200)
      .then(res => {
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('release_note is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": null
      })
      .expect(400)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', '')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('build is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "",
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(400)
      .then(res => {
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('release_note ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "",
        "download_enabled": 0
      })
      .expect(200)
      .then(res => {
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('enabled is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": ""
      })
      .expect(400)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": ""
      })
      .expect(401)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": ""
      })
      .expect(401)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });
  });

  it('build is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "release_note": "release note",
        "download_enabled": ""
      })
      .expect(400)
      .then(res => {
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('release_note is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "download_enabled": 0
      })
      .expect(200)
      .then(res => {
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });

  it('enabled is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note"
      })
      .expect(400)
      .then(res => {
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });

  it('build id is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 'a',
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(400)
      .then(res => {
        console.log("success 17");
      })
      .catch(err => {
        console.log("error 17");
        throw err;
      });
  });

  it('enabled is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 'a'
      })
      .expect(400)
      .then(res => {
        console.log("success 18");
      })
      .catch(err => {
        console.log("error 18");
        throw err;
      });
  });


  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "release_note": "release note",
        "download_enabled": 0
      })
      .expect(401)
      .then(res => {
        console.log("success 20");
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('no build id to be set', function () {
    request('https://localhost:8181/api/')
      .post('edit_building')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 9999,
        "release_note": "release note",
        "download_enabled": 1
      })
      .expect(400)
      .then(res => {
        console.log("success 21");
      })
      .catch(err => {
        console.log("error 21");
        throw err;
      });
  });

});
