const assert = require('chai').assert;
const request = require('supertest');

var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_101_string = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var contractor_user_id = 54;
var not_admin_contractor_user_id = 55;

describe('post /edit_vendor', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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
      .post('edit_vendor')
      .type('form')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('contractor_user_id is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('company is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('country is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('province is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
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

  it('city is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('address is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('postalcode is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
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

  it('telephone_number is 0', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
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

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });

  });



  it('contractor_user_id is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": null,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
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

  it('company is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": null,
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });

  it('country is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": null,
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('province is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": null,
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('city is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": null,
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('address is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": null,
        "postalcode": "1234567",
        "telephone_number": "09099999999"
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

  it('postalcode is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": null,
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 20");
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('telephone_number is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": null
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 21");
      })
      .catch(err => {
        console.log("error 21");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', "")
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 22");
      })
      .catch(err => {
        console.log("error 22");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 23");
      })
      .catch(err => {
        console.log("error 23");
        throw err;
      });
  });

  it('contractor_user_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": "",
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 24");
      })
      .catch(err => {
        console.log("error 24");
        throw err;
      });
  });

  it('company is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 25");
      })
      .catch(err => {
        console.log("error 25");
        throw err;
      });
  });

  it('country is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 26");
      })
      .catch(err => {
        console.log("error 26");
        throw err;
      });
  });

  it('province is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 27");
      })
      .catch(err => {
        console.log("error 27");
        throw err;
      });
  });

  it('city is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 28");
      })
      .catch(err => {
        console.log("error 28");
        throw err;
      });
  });

  it('address is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 29");
      })
      .catch(err => {
        console.log("error 29");
        throw err;
      });
  });

  it('postalcode is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 30");
      })
      .catch(err => {
        console.log("error 30");
        throw err;
      });
  });

  it('telephone_number is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": ""
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 31");
      })
      .catch(err => {
        console.log("error 31");
        throw err;
      });
  });

  it('contractor_user_id is not in vendor', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": 9876,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 32");
      })
      .catch(err => {
        console.log("error 32");
        throw err;
      });
  });

  it('contractor_user_id is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": 'a',
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 33");
      })
      .catch(err => {
        console.log("error 33");
        throw err;
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 34");
      })
      .catch(err => {
        console.log("error 34");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log("success 35");
      })
      .catch(err => {
        console.log("error 35");
        throw err;
      });
  });

  it('number of digits for company is over than 100', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": over_101_string,
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 36");
      })
      .catch(err => {
        console.log("error 36");
        throw err;
      });
  });

  it('Country is over 17', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "JapanJapanJapan12",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 37");
      })
      .catch(err => {
        console.log("error 37");
        throw err;
      });
  });

  it('number of digits for city is over than 100', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": over_101_string,
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 38");
      })
      .catch(err => {
        console.log("error 38");
        throw err;
      });
  });

  it('number of digits for address is over than 100', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": over_101_string,
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 39");
      })
      .catch(err => {
        console.log("error 39");
        throw err;
      });
  });

  it('number of digits for province is over than 100', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": over_101_string,
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 40");
      })
      .catch(err => {
        console.log("error 40");
        throw err;
      });
  });

  it('province is over than 11', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "12345678901",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 41");
      })
      .catch(err => {
        console.log("error 41");
        throw err;
      });
  });

  it('telephone number is over than 11', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "123456789012"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 42");
      })
      .catch(err => {
        console.log("error 42");
        throw err;
      });
  });

  it('postalcode is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "abcdefg",
        "telephone_number": "09099999999"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 43");
      })
      .catch(err => {
        console.log("error 43");
        throw err;
      });
  });

  it('telephone_number is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "aaaaaaa00"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 44");
      })
      .catch(err => {
        console.log("error 44");
        throw err;
      });
  });

  it('not admin user', function () {
    request('https://localhost:8181/api/')
      .post('edit_vendor')
      .type('form')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .send({
        "contractor_user_id": not_admin_contractor_user_id,
        "company": "test aaa inc.",
        "country": "Japan",
        "province": "Tokyo",
        "city": "Nerimaku",
        "address": "ABC 1-1-1 aaa",
        "postalcode": "1234567",
        "telephone_number": "aaaaaaa00"
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log("success 45");
      })
      .catch(err => {
        console.log("error 45");
        throw err;
      });
  });

});
