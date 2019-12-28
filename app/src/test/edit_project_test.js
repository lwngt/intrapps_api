const assert = require('chai').assert;
const request = require('supertest');

describe('Post /edit_project', function () {
  it('nomal test', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(200)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  });

  it('no secretkey', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 1");
      })
      .catch(err => {
        console.log("error 1");
        throw err;
      });
  });

  it('no apikey', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 2");
      })
      .catch(err => {
        console.log("error 2");
        throw err;
      });
  });

  it('no project_id', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 3");
      })
      .catch(err => {
        console.log("error 3");
        throw err;
      });
  });

  it('no project_name', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 4");
      })
      .catch(err => {
        console.log("error 4");
        throw err;
      });
  });

  it('no project_overview', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(200)
      .then(res => {
        console.log("success 5");
      })
      .catch(err => {
        console.log("error 5");
        throw err;
      });
  });

  it('no project_images_modify', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 6");
      })
      .catch(err => {
        console.log("error 6");
        throw err;
      });
  });

  it('no project_images (success)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 0])
      .expect(200)
      .then(res => {
        console.log("success 7");
      })
      .catch(err => {
        console.log("error 7");
        throw err;
      });
  });

  it('no project_images (error)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .expect(400)
      .then(res => {
        console.log("success 8");
      })
      .catch(err => {
        console.log("error 8");
        throw err;
      });
  });

  it('secretkey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', null)
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(401)
      .then(res => {
        console.log("success 9");
      })
      .catch(err => {
        console.log("error 9");
        throw err;
      });
  });

  it('apikey is null', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', null)
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(401)
      .then(res => {
        console.log("success 10");
      })
      .catch(err => {
        console.log("error 10");
        throw err;
      });
  });

  it('project_images_modify is not array', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', 3)
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 11");
      })
      .catch(err => {
        console.log("error 11");
        throw err;
      });
  });

  it('project_images_modify array is short( array of 5 is mandentory)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [2, 2, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 12");
      })
      .catch(err => {
        console.log("error 12");
        throw err;
      });
  });

  it('project_images_modify add is wrong (already exists)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [1, 0, 0, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .expect(400)
      .then(res => {
        console.log("success 13");
      })
      .catch(err => {
        console.log("error 13");
        throw err;
      });
  });

  it('project_images_modify update is wrong (no images at the positon)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 2])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .expect(400)
      .then(res => {
        console.log("success 14");
      })
      .catch(err => {
        console.log("error 14");
        throw err;
      });
  });

  it('project_images_modify delete is wrong (no images at the positon)', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 3])
      .expect(400)
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
      .post('edit_project')
      .set('secretkey', '')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
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
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', '')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(401)
      .then(res => {
        console.log("success 17");
      })
      .catch(err => {
        console.log("error 17");
        throw err;
      });
  });

  it('project_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', "")
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 18");
      })
      .catch(err => {
        console.log("error 18");
        throw err;
      });
  });

  it('project_name is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "")
      .field('project_overview', "overview test")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 19");
      })
      .catch(err => {
        console.log("error 19");
        throw err;
      });
  });

  it('project_overview is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "")
      .field('project_images_modify', [3, 2, 1, 0, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(200)
      .then(res => {
        console.log("success 20");
      })
      .catch(err => {
        console.log("error 20");
        throw err;
      });
  });

  it('project_images_modify is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', "")
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 21");
      })
      .catch(err => {
        console.log("error 21");
        throw err;
      });
  });

  it('project_images_modify is []', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 22");
      })
      .catch(err => {
        console.log("error 22");
        throw err;
      });
  });

  it('project_images_modify type is wrong', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', ['a', 0, 1, 2, 0])
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 23");
      })
      .catch(err => {
        console.log("error 23");
        throw err;
      });
  });

  it('project_images_modify type is wrong2', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', "a")
      .attach('project_images', __dirname + '/files/download_1.jpg')
      .attach('project_images', __dirname + '/files/download_2.jpg')
      .expect(400)
      .then(res => {
        console.log("success 24");
      })
      .catch(err => {
        console.log("error 24");
        throw err;
      });
  });

  it('project_images is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 40)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 0])
      .field('project_images', "")
      .expect(200)
      .then(res => {
        console.log("success 25");
      })
      .catch(err => {
        console.log("error 25");
        throw err;
      });
  });

  it('no project to be set in project_id is ""', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', 98756)
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 0])
      .field('project_images', "")
      .expect(400)
      .then(res => {
        console.log("success 25");
        console.log(res.text);
      })
      .catch(err => {
        console.log("error 25");
        throw err;
      });
  });

  it('project id is not number', function () {
    request('https://localhost:8181/api/')
      .post('edit_project')
      .set('secretkey', 'dcd3d418bde2753fdb3ff5e4f1ef2702fc4af6f93fe8a0fafaffbe71')
      .set('apikey', 'a594af52d08d775c51218c92fcc10a888590625b227dd570e59dfeb0')
      .timeout({ response: 100000, deadline: 100000 })
      .field('project_id', "a")
      .field('project_name', "title edit test")
      .field('project_overview', "overview test")
      .field('project_images_modify', [0, 0, 0, 0, 0])
      .field('project_images', "")
      .expect(400)
      .then(res => {
        console.log("success 25");
        console.log(res.text);
      })
      .catch(err => {
        console.log("error 25");
        throw err;
      });
  });
});
