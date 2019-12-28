let expect = require("chai").expect;
let assert = require("chai").assert;
let fs = require('fs');

let db_connection = require('../common/db_common');
let db_connection_func = new db_connection();

describe("DB Connection test", () => {
  it("select * from files", () => {
    let json = JSON.parse(fs.readFileSync('./db_conf/mysql.conf', 'utf8'));
    // async function is this way.
    db_connection_func.execute_sql("select * from files;", json).then(result => {
      assert.isObject(result, 'either `null` or `undefined`');
    });
  });

  it("execute wrong sql", () => {
    let json = JSON.parse(fs.readFileSync('./db_conf/mysql.conf', 'utf8'));
    // async function is this way.
    db_connection_func.execute_sql("select * from filesaaaa;", json).then(result => {
      assert.isNull(result, 'result is neither `null` nor `undefined`');
    });
  });

});
