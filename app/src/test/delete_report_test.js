const assert = require('chai').assert;
const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var build_id = 34;
var report_id = 1;

describe('post /delete_report', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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
      .post('delete_report')
      .type('form')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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

  it('report_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('build id is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": null,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('report id is null', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": null
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('secertkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', '')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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

  it('build_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": "",
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('report id is ""', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": ""
      })
      .expect('Content-Type', /json/)
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

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
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

  it('There is no build id to be set.', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 9999,
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });

  it('There is no report_id to be set.', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": 9999
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 17");
      })
      .catch(err => {
        console.log("error 17");
        throw err;
      });
  });

  it('build_id is wrong type', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 'a001',
        "report_id": report_id
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 18");
      })
      .catch(err => {
        console.log("error 18");
        throw err;
      });
  });

  it('report_id is wrong type', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": build_id,
        "report_id": 'a001'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('the pair of build_id and report_id is wrong', function () {
    request('https://localhost:8181/api/')
      .post('delete_report')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "build_id": 35,
        "report_id": 1
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

});
