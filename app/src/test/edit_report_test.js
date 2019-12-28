const assert = require('chai').assert;
const request = require('supertest');

describe('post /edit_report', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
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

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('build_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('report_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('note is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1
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
      .post('edit_report')
      .type('form')
      .set('secretkey', null)
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
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
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
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

  it('build_id is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": null,
        "report_id": 1,
        "note": "the comment to be updated"
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

  it('report_id is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": null,
        "note": "the comment to be updated"
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

  it('note is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": null
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', "")
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
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

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('build_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "",
        "report_id": 1,
        "note": "the comment to be updated"
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

  it('report_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": null,
        "note": "the comment to be updated"
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

  it('note is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": ""
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });

  it('no build to be set in parameter', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 12345,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });

  it('no report id to be set in parameter ', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 98745,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });

  it('build_id is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "a",
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 17");
      })
      .catch(err => {
        console.log("error 17");
        throw err;
      });
  });

  it('report id is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 'a',
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 18");
      })
      .catch(err => {
        console.log("error 18");
        throw err;
      });
  });

  it('secretkey is over', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('secretkey is over', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 34,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success 20");
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('conbination of a pair of build_id and report_id', function () {
    request('https://localhost:8181/api/')
      .post('edit_report')
      .type('form')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "report_id": 1,
        "note": "the comment to be updated"
      })
      .expect('Content-Type', /json/)
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
