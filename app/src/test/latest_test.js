const assert = require('chai').assert;
const request = require('supertest');
const fs = require('fs');
//  test settting
const SECRET_KEY = JSON.parse(fs.readFileSync("test/test.json", 'utf8')).secretkey;
const API_KEY = JSON.parse(fs.readFileSync("test/test.json", 'utf8')).apikey;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Get /latest', function () {
  // Nomal upload test
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(200)
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
      });
  });

  it('no secretkey', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
      });
  });

  it('no apikey', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', SECRET_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
      });
  });

  it('no page_no', function () {
    request('https://localhost:8181/api/')
      .get('latest')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', null)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', SECRET_KEY)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
      });
  });

  it('page_no is null', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', '')
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', SECRET_KEY)
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
      });
  });

  it('page_no is not number', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=a')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(400)
      .then(res => {
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=0')
      .set('secretkey', SECRET_KEY)
      .set('apikey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
      });
  });

  it('page_no is over of 9', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=10')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(200)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
      });
  });

  it('page_no=9 is no content of built app', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=9')
      .set('secretkey', SECRET_KEY)
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(200)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
      });
  });

  it('secretkey is wrong', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=9')
      .set('secretkey', '1111')
      .set('apikey', API_KEY)
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
      });
  });

  it('apikey is wrong', function () {
    request('https://localhost:8181/api/')
      .get('latest?page_no=9')
      .set('secretkey', SECRET_KEY)
      .set('apikey', '1111')
      .timeout({ response: 100000, deadline: 100000 })
      .expect(401)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
      });
  });
});
