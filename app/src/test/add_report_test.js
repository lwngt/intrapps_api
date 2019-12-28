const assert = require('chai').assert;
const request = require('supertest');

describe('post /add_report', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 1."
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('no secretkey', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 2."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('no apikey', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 3."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("success 3");
        throw err;
      });
  });

  it('no build id', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "note": "This is comment 4."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("success 4");
        throw err;
      });
  });

  it('no note', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', null)
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 6."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 7."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('build id is null', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": null,
        "note": "This is comment 8."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('note is null', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": null
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', '')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 10."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 11."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('build id is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "",
        "note": "This is comment 12."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('note is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": ""
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });
  });

  it('build id is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 9999,
        "note": "This is comment 14."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('build id type is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "aaaa",
        "note": "This is comment 14."
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('secretkey is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'aaaa')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 15."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });

  it('apikey is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'aaaa')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "This is comment 16."
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });
});
