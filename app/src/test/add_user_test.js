const request = require('supertest');
var secretkey = 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71';
var apikey = 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0';
var over_701_string = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a';
var project_ids = [60];
var project_multi_ids = [70, 71];


describe('post /add_user', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log('success 1');
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('secretkey is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 2');
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('apikey is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 3');
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('username is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 4');
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('email is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 5');
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('family name is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 6');
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('given name is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 7');
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('authority is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 8');
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('user_manage_project_ids is 0', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .expect(200)
      .then(res => {
        // 200
        console.log(res.text);
        console.log('success 9');
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', null)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 10');
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 11');
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', "")
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 19');
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', "")
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 20');
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('username is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', "")
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 21');
      })
      .catch(err => {
        console.log("error 21");
        throw err;
      });
  });

  it('password is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', '')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 22');
      })
      .catch(err => {
        console.log("error 22");
        throw err;
      });
  });

  it('email is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', '')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 23');
      })
      .catch(err => {
        console.log("error 24");
        throw err;
      });
  });

  it('family name is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', '')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 24');
      })
      .catch(err => {
        console.log("error 24");
        throw err;
      });
  });

  it('given name is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', '')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 25');
      })
      .catch(err => {
        console.log("error 25");
        throw err;
      });
  });

  it('authority is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 26');
      })
      .catch(err => {
        console.log("error 26");
        throw err;
      });
  });

  it('user_manage_project_ids is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', "")
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log('success 27');
      })
      .catch(err => {
        console.log("error 27");
        throw err;
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', over_701_string)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 28');
      })
      .catch(err => {
        console.log("error 28");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', over_701_string)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(401)
      .then(res => {
        console.log(res.text);
        console.log('success 29');
      })
      .catch(err => {
        console.log("error 29");
        throw err;
      });
  });

  it('number of digits for username is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', over_701_string)
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 30');
      })
      .catch(err => {
        console.log("error 30");
        throw err;
      });
  });

  it('number of digits for password is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', over_701_string)
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 31');
      })
      .catch(err => {
        console.log("error 31");
        throw err;
      });
  });

  it('number of digits for email is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', over_701_string.substring(1, 692) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 32');
      })
      .catch(err => {
        console.log("error 32");
        throw err;
      });
  });

  it('number of digits for family name is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', over_701_string)
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 33');
      })
      .catch(err => {
        console.log("error 33");
        throw err;
      });
  });

  it('number of digits for given name is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', over_701_string)
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 34');
      })
      .catch(err => {
        console.log("error 34");
        throw err;
      });
  });

  it('number of digit of password is lower than 4', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'test')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 35');
      })
      .catch(err => {
        console.log("error 35");
        throw err;
      });
  });

  it('number of digit of username is lower than 4', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 4))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 36');
      })
      .catch(err => {
        console.log("error 36");
        throw err;
      });
  });

  it('email is not email type', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@aaa')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 37');
      })
      .catch(err => {
        console.log("error 37");
        throw err;
      });
  });

  it('authority is number', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', 1)
      .field('user_manage_project_ids', project_ids)
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log('success 38');
      })
      .catch(err => {
        console.log("error 38");
        throw err;
      });
  });

  it('authority is wrong number', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', 4)
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 39');
      })
      .catch(err => {
        console.log("error 39");
        throw err;
      });
  });

  it('user_manage_project_ids is wrong id', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', 1)
      .field('user_manage_project_ids', [9999])
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 40');
      })
      .catch(err => {
        console.log("error 40");
        throw err;
      });
  });

  it('user_manage_project_ids are mulitple id', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', 1)
      .field('user_manage_project_ids', project_multi_ids)
      .expect(200)
      .then(res => {
        console.log(res.text);
        console.log('success 41');
      })
      .catch(err => {
        console.log("error 41");
        throw err;
      });
  });

  it('user_manage_project_ids is not number', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'Test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', ['a'])
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 42');
      })
      .catch(err => {
        console.log("error 42");
        throw err;
      });
  });

  it('password is wrong for password rule', function () {
    request('https://localhost:8181/api/')
      .post('add_user')
      .set('secretkey', secretkey)
      .set('apikey', apikey)
      .timeout({ response: 100000, deadline: 100000 })
      .field('username', Math.random().toString(32).substring(1, 10))
      .field('password', 'test1234')
      .field('email', 'e.g.works.private+' + Math.random().toString(32).substring(1, 10) + '@gmail.com')
      .field('family_name', 'test')
      .field('given_name', 'taro')
      .field('authority', '0')
      .field('user_manage_project_ids', project_ids)
      .expect(400)
      .then(res => {
        console.log(res.text);
        console.log('success 43');
      })
      .catch(err => {
        console.log("error 43");
        throw err;
      });
  });
});
