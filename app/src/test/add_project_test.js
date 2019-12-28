const assert = require('chai').assert;
const request = require('supertest');

describe('Post /add_projects', function () {
  it('nomal', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-1")
      .field('project_overview', "this project is test.")
      .expect(200)
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('no images', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_name', "project-title-2")
      .field('project_overview', "this project is test 2.")
      .expect(200)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('no project name', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_overview', "this project is test.-3")
      .expect(400)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('no project overview', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-4")
      .expect(200)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('no secretkey', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-5")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('no apikey', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-6")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', null)
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-11")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-12")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('project_images is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_images', "")
      .field('project_name', "project-title-13")
      .field('project_overview', "this project is test.")
      .expect(200)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });
  });

  it('project_name is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "")
      .field('project_overview', "this project is test.-14")
      .expect(400)
      .then(res => {
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('project_overview  is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-15")
      .field('project_overview', "")
      .expect(200)
      .then(res => {
        console.log("success 15");
      })
      .catch(err => {
        console.log("error 15");
        throw err;
      });
  });


  it('secretkey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', '')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-16")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 16");
      })
      .catch(err => {
        console.log("error 16");
        throw err;
      });
  });

  it('apikey is ""', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-17")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 17");
      })
      .catch(err => {
        console.log("error 17");
        throw err;
      });
  });

  it('secretkey is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'aaaa')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-18")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 18");
      })
      .catch(err => {
        console.log("error 18");
        throw err;
      });
  });

  it('apikey is wrong', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'aaaa')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-19")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('number of digits for secretkey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-20")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 20");
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('number of digits for apikey is over than 700', function () {
    request('https://localhost:8181/api/')
      .post('add_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789a')
      .timeout({ response: 100000, deadline: 100000 })
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .field('project_name', "project-title-21")
      .field('project_overview', "this project is test.")
      .expect(401)
      .then(res => {
        console.log("success 21");
      })
      .catch(err => {
        console.log("error 21");
        throw err;
      });
  });
});
