const assert = require('chai').assert;
const request = require('supertest');

describe('POST /add_building', function () {
  it('Nomal ipa file upload for ios', function () {
    request('https://localhost:8181/api/')
      .post('add_building')
      .set('secretkey', 'e4fa1bdaebce9c3746a3b375f69e6d1ea0d9036b90ee4581021951ed')
      .set('apikey', '9c86d64a01b46f0b02c625e194c637708ab21b164db38d230559a3db')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('build_app', __dirname + '/files/testipa.ipa')
      .field('project_id', 2)
      .field('release_note', "this is release note text 1.")
      .expect(200, {
        "code": {
          "status": 200,
          "code": "",
          "message": ""
        },
        data: null
      })
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  // it('Nomal apk file upload for android', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 2.")
  //     .expect(200, {
  //       "code": {
  //         "status": 200,
  //         "code": "",
  //         "message": ""
  //       },
  //       data: null
  //     })
  //     .then(res => {
  //       console.log("success 2");
  //     })
  //     .catch(err => {
  //       console.log("error 2");
  //       throw err;
  //     });
  // });

  // it('No secretkey', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 3.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 3");
  //     })
  //     .catch(err => {
  //       console.log("error 3");
  //       throw err;
  //     });
  // });

  // it('No apikey', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 4.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 4");
  //     })
  //     .catch(err => {
  //       console.log("error 4");
  //       throw err;
  //     });
  // });

  // it('No build apps', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 5.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 5");
  //     })
  //     .catch(err => {
  //       console.log("error 5");
  //       throw err;
  //     });
  // });

  // it('No project id', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('release_note', "this is release note text 6.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 6");
  //     })
  //     .catch(err => {
  //       console.log("error 6");
  //       throw err;
  //     });
  // });

  // it('No release note', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .expect(200)
  //     .then(res => {
  //       console.log("success 7");
  //     })
  //     .catch(err => {
  //       console.log("error 7");
  //       throw err;
  //     });
  // });

  // it('secretkey is null', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', null)
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 8.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 8");
  //     })
  //     .catch(err => {
  //       console.log("error 8");
  //       throw err;
  //     });
  // });

  // it('apikey is null', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', null)
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 9.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 9");
  //     })
  //     .catch(err => {
  //       console.log("error 9");
  //       throw err;
  //     });
  // });

  // it('secretkey is ""', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', '')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 10.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 10");
  //     })
  //     .catch(err => {
  //       console.log("error 10");
  //       throw err;
  //     });
  // });

  // it('apikey is ""', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', '')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 11.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 11");
  //     })
  //     .catch(err => {
  //       console.log("error 11");
  //       throw err;
  //     });
  // });

  // it('build_app is ""', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .field('build_app', "")
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 12.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 12");
  //     })
  //     .catch(err => {
  //       console.log("error 12");
  //       throw err;
  //     });
  // });

  // it('project id is ""', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "")
  //     .field('release_note', "this is release note text 13.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 13");
  //     })
  //     .catch(err => {
  //       console.log("error 13");
  //       throw err;
  //     });
  // });

  // it('release note is ""', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "")
  //     .expect(200)
  //     .then(res => {
  //       console.log("success 14");
  //     })
  //     .catch(err => {
  //       console.log("error 14");
  //       throw err;
  //     });
  // });

  // it('secretkey is wrong', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'aaaa')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 15.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 15");
  //     })
  //     .catch(err => {
  //       console.log("error 15");
  //       throw err;
  //     });
  // });

  // it('apikey is wrong', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', '')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 16.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 16");
  //     })
  //     .catch(err => {
  //       console.log("error 16");
  //       throw err;
  //     });
  // });

  // it('project id is wrong type', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "ab")
  //     .field('release_note', "this is release note text 17.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 17");
  //     })
  //     .catch(err => {
  //       console.log("error 17");
  //       throw err;
  //     });
  // });

  // it('no project id in table', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "9999")
  //     .field('release_note', "this is release note text 18.")
  //     .expect(400)
  //     .then(res => {
  //       console.log("success 18");
  //     })
  //     .catch(err => {
  //       console.log("error 18");
  //       throw err;
  //     });
  // });

  // it('number of digits for secretkey is over than 700', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
  //     .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 19.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 19");
  //     })
  //     .catch(err => {
  //       console.log("error 19");
  //       throw err;
  //     });
  // });

  // it('number of digits for apikey is over than 700', function () {
  //   request('https://localhost:8181/api/')
  //     .post('add_building')
  //     .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
  //     .set('apikey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
  //     .timeout({ response: 100000, deadline: 100000 })
  //     .attach('build_app', __dirname + '/files/app-debug.apk')
  //     .field('project_id', "40")
  //     .field('release_note', "this is release note text 20.")
  //     .expect(401)
  //     .then(res => {
  //       console.log("success 20");
  //     })
  //     .catch(err => {
  //       console.log("error 20");
  //       throw err;
  //     });
  // });
});
