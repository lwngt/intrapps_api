const request = require('supertest');

describe('POST /login', function () {
  it('Nomal login', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
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

  it('username is wrong', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
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

  it('password is wrong', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891"
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

  it('number of username digits or characters is over', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
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

  it('number of password digits or characters is over', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': "Te123456781234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901"
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

  it('no username', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('no password', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('username is null', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': null,
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
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

  it('Password is null', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': null
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

  it('username is ""', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
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

  it('Password is ""', function () {
    request('https://localhost:8181/api/')
      .post('login')
      .type('form')
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': ""
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

});
