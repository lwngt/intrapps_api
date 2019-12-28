const request = require('supertest');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('POST /signup', function () {

  it('Nomal test signup', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'address': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'email': "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@gmail.com",
        'family_name': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'given_name': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'company': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'country': "1234567890123456",
        'province': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'city': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'postalcode': "1234567890",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        console.log('success 1 !!!');
      })
      .catch(err => {
        console.log('err 1');
        throw err;
      });
  });

  it('same user id', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'password': "Te12345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'address': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'email': "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@gmail.com",
        'family_name': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'given_name': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'company': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'country': "1234567890123456",
        'province': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'city': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        'postalcode': "1234567890",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log('success 2 !!!');
      })
      .catch(err => {
        console.log('err 2');
        throw err;
      });
  });

  // no item text
  it('No username', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'password': "Test1234",
        'address': "ABCDE1-1-3",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 3 !!!');
      })
      .catch(err => {
        console.log('err 3');
        throw err;
      });
  });

  it('No password', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'address': "ABCDE1-1-4",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 4 !!!');
      })
      .catch(err => {
        console.log('err 4');
        throw err;
      });
  });

  it('No address', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'email': "abcde@test.dev",
        'family_name': "test5",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 5 !!!');
      })
      .catch(err => {
        console.log('err 5');
        throw err;
      });
  });

  it('No email', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-6",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 6 !!!');
      })
      .catch(err => {
        console.log('err 6');
        throw err;
      });
  });

  it('No family name', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-7",
        'email': "abcde@test.dev",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 7 !!!');
      })
      .catch(err => {
        console.log('err 7');
        throw err;
      });
  });

  it('No given name', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-8",
        'email': "abcde@test.dev",
        'family_name': "test",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 8 !!!');
      })
      .catch(err => {
        console.log('err 8');
        throw err;
      });
  });

  it('No company', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-9",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 10 !!!');
      })
      .catch(err => {
        console.log('err 10');
        throw err;
      });
  });

  it('No country', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-10",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 11 !!!');
      })
      .catch(err => {
        console.log('err 11');
        throw err;
      });
  });

  it('No province', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-11",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 12 !!!');
      })
      .catch(err => {
        console.log('err 12');
        throw err;
      });
  });

  it('No city', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-12",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 13 !!!');
      })
      .catch(err => {
        console.log('err 13');
        throw err;
      });
  });

  it('No postalcode', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-13",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 14 !!!');
      })
      .catch(err => {
        console.log('err 14');
        throw err;
      });
  });

  it('No telephone_number', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-14",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 15 !!!');
      })
      .catch(err => {
        console.log('err 15');
        throw err;
      });
  });

  // item is null

  it('Username is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': null,
        'password': "Test1234",
        'address': "ABCDE1-1-15",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 16 !!!');
      })
      .catch(err => {
        console.log('err 16');
        throw err;
      });
  });

  it('Password is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': null,
        'address': "ABCDE1-1-16",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 17 !!!');
      })
      .catch(err => {
        console.log('err 17');
        throw err;
      });
  });

  it('Address is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': null,
        'email': "abcde@test.dev",
        'family_name': "test17",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 18 !!!');
      })
      .catch(err => {
        console.log('err 18');
        throw err;
      });
  });

  it('email is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-18",
        'email': null,
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 19 !!!');
      })
      .catch(err => {
        console.log('err 19');
        throw err;
      });
  });

  it('family name is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-19",
        'email': "abcde@test.dev",
        'family_name': null,
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 20 !!!');
      })
      .catch(err => {
        console.log('err 20');
        throw err;
      });
  });

  it('given name is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-20",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': null,
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 21 !!!');
      })
      .catch(err => {
        console.log('err 21');
        throw err;
      });
  });

  it('company is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-21",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': null,
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 23 !!!');
      })
      .catch(err => {
        console.log('err 23');
        throw err;
      });
  });

  it('country is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-22",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': null,
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 24 !!!');
      })
      .catch(err => {
        console.log('err 24');
        throw err;
      });
  });

  it('province is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-23",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': null,
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 25 !!!');
      })
      .catch(err => {
        console.log('err 25');
        throw err;
      });
  });

  it('city is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-24",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': null,
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 26 !!!');
      })
      .catch(err => {
        console.log('err 26');
        throw err;
      });
  });

  it('postalcode is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-25",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': null,
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 27 !!!');
      })
      .catch(err => {
        console.log('err 27');
        throw err;
      });
  });

  it('telephone_number is null', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-26",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": null
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 28 !!!');
      })
      .catch(err => {
        console.log('err 28');
        throw err;
      });
  });

  // length is 0

  it('username is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "",
        'password': "Test1234",
        'address': "ABCDE1-1-27",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 29 !!!');
      })
      .catch(err => {
        console.log('err 29');
        throw err;
      });
  });

  it('password is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "",
        'address': "ABCDE1-1-28",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 30 !!!');
      })
      .catch(err => {
        console.log('err 30');
        throw err;
      });
  });

  it('address is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "",
        'email': "abcde@test.dev",
        'family_name': "test29",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 31 !!!');
      })
      .catch(err => {
        console.log('err 31');
        throw err;
      });
  });

  it('email is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-30",
        'email': "",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 32 !!!');
      })
      .catch(err => {
        console.log('err 32');
        throw err;
      });
  });

  it('Family name is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-31",
        'email': "abcde@test.dev",
        'family_name': "",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 33 !!!');
      })
      .catch(err => {
        console.log('err 33');
        throw err;
      });
  });

  it('Given name is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-32",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 34 !!!');
      })
      .catch(err => {
        console.log('err 34');
        throw err;
      });
  });

  it('Company is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-33",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 36 !!!');
      })
      .catch(err => {
        console.log('err 36');
        throw err;
      });
  });

  it('Country is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-34",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 37 !!!');
      })
      .catch(err => {
        console.log('err 37');
        throw err;
      });
  });

  it('Province is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-35",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': "",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 38 !!!');
      })
      .catch(err => {
        console.log('err 38');
        throw err;
      });
  });

  it('City is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-36",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 39 !!!');
      })
      .catch(err => {
        console.log('err 39');
        throw err;
      });
  });

  it('Postalcode is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-37",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 40 !!!');
      })
      .catch(err => {
        console.log('err 40');
        throw err;
      });
  });

  it('telephone_number is 0', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-38",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": ""
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 41 !!!');
      })
      .catch(err => {
        console.log('err 41');
        throw err;
      });
  });

  // invalid item

  it('Password is invalid', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "aest1234",
        'address': "ABCDE1-1-39",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 42 !!!');
      })
      .catch(err => {
        console.log('err 42');
        throw err;
      });
  });

  it('Email is invalid', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-40",
        'email': "e.g.works.private---",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 43 !!!');
      })
      .catch(err => {
        console.log('err 43');
        throw err;
      });
  });

  it('Postalcode is invalid', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-41",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234abc",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 44 !!!');
      })
      .catch(err => {
        console.log('err 44');
        throw err;
      });
  });

  it('telephone_number is invalid', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-42",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "0901234567a"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 45 !!!');
      })
      .catch(err => {
        console.log('err 45');
        throw err;
      });
  });

  // Number of digits

  it('Postalcode is not correct', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-43",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "123",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 46 !!!');
      })
      .catch(err => {
        console.log('err 46');
        throw err;
      });
  });

  it('telephone_number is not correct', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-44",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "12"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 47 !!!');
      })
      .catch(err => {
        console.log('err 47');
        throw err;
      });
  });

  it('username is lower than 6', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-45",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 48 !!!');
      })
      .catch(err => {
        console.log('err 48');
        throw err;
      });
  });

  it('Password is lower than 6', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1",
        'address': "ABCDE1-1-46",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 49 !!!');
      })
      .catch(err => {
        console.log('err 49');
        throw err;
      });
  });

  it('Email is lower than 6', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-47",
        'email': "a@a.a",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 50 !!!');
      })
      .catch(err => {
        console.log('err 50');
        throw err;
      });
  });

  //  Over digits

  it('Username is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'password': "Test1234",
        'address': "ABCDE1-1-48",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 51 !!!');
      })
      .catch(err => {
        console.log('err 51');
        throw err;
      });
  });

  it('Password is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'address': "ABCDE1-1-49",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 52 !!!');
      })
      .catch(err => {
        console.log('err 52');
        throw err;
      });
  });

  it('address is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-501234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 53 !!!');
      })
      .catch(err => {
        console.log('err 53');
        throw err;
      });
  });

  it('email is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-51",
        'email': "e.g.works.private+1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789@gmail.com",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 54 !!!');
      })
      .catch(err => {
        console.log('err 54');
        throw err;
      });
  });

  it('family name is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-52",
        'email': "abcde@test.dev",
        'family_name': "test1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 55 !!!');
      })
      .catch(err => {
        console.log('err 55');
        throw err;
      });
  });

  it('given name is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-53",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 56 !!!');
      })
      .catch(err => {
        console.log('err 56');
        throw err;
      });
  });

  it('company is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-54",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 58 !!!');
      })
      .catch(err => {
        console.log('err 58');
        throw err;
      });
  });

  it('country is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-55",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 59 !!!');
      })
      .catch(err => {
        console.log('err 59');
        throw err;
      });
  });

  it('Province is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-56",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 60 !!!');
      })
      .catch(err => {
        console.log('err 60');
        throw err;
      });
  });

  it('city is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-57",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        'postalcode': "1234567",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 61 !!!');
      })
      .catch(err => {
        console.log('err 61');
        throw err;
      });
  });

  it('Postal code is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-58",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "12345671234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        "telephone_number": "09012345678"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 62 !!!');
      })
      .catch(err => {
        console.log('err 62');
        throw err;
      });
  });

  it('telephone_number is over', function () {
    request('https://localhost:8181/api/')
      .post('signup')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'username': "abcde",
        'password': "Test1234",
        'address': "ABCDE1-1-59",
        'email': "abcde@test.dev",
        'family_name': "test",
        'given_name': "taro",
        'company': "test Inc.",
        'country': "Japan",
        'province': " Tokyo",
        'city': "Nerima-ku",
        'postalcode': "1234567",
        "telephone_number": "090123456781234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"
      })
      .timeout({ response: 100000, deadline: 100000 })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.code);
        console.log('success 63 !!!');
      })
      .catch(err => {
        console.log('err 63');
        throw err;
      });
  });

});
