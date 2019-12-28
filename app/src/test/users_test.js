const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';

describe('Get /users', function () {
  it('Nomal test', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log('success 1');
      })
      .catch(err => {
        console.log('error 1');
        throw err;
      });
  });

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 2');
      })
      .catch(err => {
        console.log('error 2');
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 3');
      })
      .catch(err => {
        console.log('error 3');
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 4');
      })
      .catch(err => {
        console.log('error 4');
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 5');
      })
      .catch(err => {
        console.log('error 5');
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', "")
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 6');
      })
      .catch(err => {
        console.log('error 6');
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 7');
      })
      .catch(err => {
        console.log('error 7');
        throw err;
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 8');
      })
      .catch(err => {
        console.log('error 8');
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('users')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 9');
      })
      .catch(err => {
        console.log('error 9');
        throw err;
      });
  });
});
