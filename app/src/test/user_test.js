const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var user_id = 9;

describe('Get /user', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(200)
      .then(res => {
        console.log('success 1');
      })
      .catch(err => {
        console.log('error 1');
        throw err;
      });
  });

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
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
      .get('user?user_id=' + user_id)
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
      .get('user?user_id=' + user_id)
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

  it('user_id is 0', function () {
    request('https://localhost:8181/api/')
      .get('user')
      .set('secretkey', '67f1a84f8c3589e570742fffefd22f229fdc3e88ba9e852a9164146e')
      .set('apikey', 'e09f19981b0bf6d4f7ec92ba362c1fdd69169ff806b9055e8c2b6da7')
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 5');
      })
      .catch(err => {
        console.log('error 5');
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', secretkey)
      .set('apikey', null)
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

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', "")
      .set('apikey', apikey)
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

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', secretkey)
      .set('apikey', "")
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

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
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

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + user_id)
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 10');
      })
      .catch(err => {
        console.log('error 10');
        throw err;
      });
  });

  it('user id is wrong', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + '9999')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 11');
      })
      .catch(err => {
        console.log('error 11');
        throw err;
      });
  });

  it('user id is not number', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + 'a')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 12');
      })
      .catch(err => {
        console.log('error 12');
        throw err;
      });
  });

  it('number of digits for user_id is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('user?user_id=' + over_701_string)
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 13');
      })
      .catch(err => {
        console.log('error 13');
        throw err;
      });
  });

});
