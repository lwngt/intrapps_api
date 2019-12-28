const request = require('supertest');

describe('POST /signup_confirm', function () {
  // Nomal
  it('Nomal', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 0 !!");
        throw err;
      });
  });

  it('username is wrong', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891",
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 1-2 !!");
        throw err;
      });
  });

  it('code is wrong', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": "000001"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 1-3 !!");
        throw err;
      });
  });

  it('already confirmed', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 1 !!");
        throw err;
      });
  });

  it('user is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 2 !!");
        throw err;
      });
  });

  it('code is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 3 !!");
        throw err;
      });
  });

  it('username is "" ', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "",
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 4 !!");
        throw err;
      });
  });

  it('code is "" ', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": ""
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 5 !!");
        throw err;
      });
  });

  it('username is null', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': null,
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 6 !!");
        throw err;
      });
  });

  it('code is null', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": null
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 7 !!");
        throw err;
      });
  });

  it('number of username digits or characters is over', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        "code": "000000"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 8 !!");
        throw err;
      });
  });

  it('number of code digits or characters is over', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": "0000004"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 9 !!");
        throw err;
      });
  });

  it('code is only number', function () {
    request('https://localhost:8181/api/')
      .post('signup_confirm')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "code": "00000a"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success !!");
      })
      .catch(err => {
        console.log("error 10 !!");
        throw err;
      });
  });
});
