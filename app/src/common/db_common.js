'use strict';
let mysql = require('mysql2');
let fs = require('fs');
let path = require('path');

let util_common = require('./util_common');
let util_common_func = new util_common();

let api_common = require('./api_common');
let api_common_func = new api_common();

// class : Db_Common
// memo  : DB function class
class Db_Common {

  // Function : create_auth_sql
  // Argument : apikey
  //          : secretkey
  // response : SQL statement
  create_auth_sql(apikey, secretkey) {
    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(apikey, false);
    if (check_error != null) {
      return null;
    }
    check_error = execute_check_sql_argument(secretkey, false);
    if (check_error != null) {
      return null;
    }
    // create sql
    return "SELECT b.id as vendor_id "
      + "      ,a.id as user_id "
      + "      ,a.authority_type as authority_type "
      + "      ,c.add as `add` "
      + "      ,c.edit as `edit` "
      + "      ,c.delete as `delete` "
      + "      ,c.management as `management` "
      + "      ,c.management_add as `management_add` "
      + "      ,c.management_edit as `management_edit` "
      + "      ,c.management_delete as `management_delete` "
      + "  FROM users a "
      + "      ,vendors b "
      + "      ,m_authority c "
      + " WHERE a.secret_key = " + mysql.escape(secretkey) + " "
      + "   AND b.api_key = " + mysql.escape(apikey) + " "
      + "   AND a.authority_type = c.type "
      + "   AND a.unregisted is null"
      + "   AND b.unregisted is null"
      + "   AND c.unregisted is null"
      + "   AND a.vendor_id = b.id; "
  }

  // Function : create_building_sql
  // Argument : vendor_id  / vendor id
  //          : project_id / project id
  //          : build_id   / build id
  //          : user_id    / user id
  // response : SQL statement
  create_building_sql(vendor_id, build_id, user_id) {
    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    // get password
    let password = util_common_func.get_encrypt_password();

    return "SELECT a.id as build_id "
      + "      ,a.kind as type "
      + "      ,a.created as upload_date "
      + "      ,CONCAT(convert(AES_DECRYPT(UNHEX(c.last_name), '"
      + password + "') USING utf8),' ',convert(AES_DECRYPT(UNHEX(c.first_name), '"
      + password + "') USING utf8)) as last_and_first_name "
      + "      ,b.id as project_id "
      + "      ,b.name as project_name "
      + "      ,a.icon as build_icon "
      + "      ,a.app_name as title "
      + "      ,a.bundle_id as bundle_id "
      + "      ,a.package_name as package_name "
      + "      ,a.current_version as current_version "
      + "      ,a.min_os_version as min_os_version "
      + "      ,a.enabled as enabled "
      + "      ,a.original_file_name as original_file_name "
      + "      ,a.plist_file_name as plist "
      + "      ,a.file_name as file_name "
      + "      ,a.release_note as release_note "
      + "    FROM ( select * from buildings where id = " + build_id + ") a RIGHT JOIN projects b on a.project_id = b.id "
      + "      ,users c "
      + "      ,user_manage_projects d "
      + " WHERE c.id = d.user_id "
      + "   AND b.id = d.project_id "
      + "   AND d.unregisted is null "
      + "   AND a.vendor_id = " + vendor_id + " "
      + "   AND c.id = " + user_id + " "
      + " ORDER BY a.id desc "
      + " LIMIT 100"
  }

  // Function : create_user_update_verified_sql
  // Argument : username to verify
  //          : code to verify
  // response : SQL statement
  create_user_update_verified_sql(username, code) {
    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(username, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(code, true);
    if (check_error != null) {
      return null;
    }

    return " UPDATE users  "
      + "       SET verified = 1 "
      + "          ,updated = now() "
      + "     WHERE name = " + mysql.escape(username) + " "
      + "       AND code = " + mysql.escape(code) + " "
      + "       AND verified = 0 "
      + "       AND unregisted is null ";
  }

  // Function : create_user_verify_sql
  // Argument : username to verify
  //          : code to verify
  // response : SQL statement
  create_user_verify_sql(username, code) {
    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(username, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(code, true);
    if (check_error != null) {
      return null;
    }

    return " select (CASE WHEN count(id) = 1 THEN true ELSE false END) as verified_check  "
      + "   from users  "
      + "  where name = " + mysql.escape(username) + " "
      + "    and code = " + mysql.escape(code) + " "
      + "    and verified = 0 "
      + "    and unregisted is null ";
  }

  // Function : create_vendor_insert_sql
  // Argument : name / vendor's name
  // response : SQL statement
  create_vendor_insert_sql(vendor) {

    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(vendor.company, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.country, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.province, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.city, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.address, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.postalcode, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor.telephone_number, true);
    if (check_error != null) {
      return null;
    }


    let password = util_common_func.get_encrypt_password();
    let date = new Date();
    let salt = date.getTime();
    return "insert into vendors "
      + "( "
      + "name, api_key, contractor_user_id, country, province, city, address, zip_code, tel, created "
      + ") "
      + "values"
      + "("
      + "  HEX(AES_ENCRYPT(" + mysql.escape(vendor.company) + ", '" + password + "'))"
      + ", SHA2(CONCAT(" + mysql.escape(vendor.company) + ",'-','" + salt + "'), 224)"
      + ", " + null
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.country) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.province) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.city) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.address) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.postalcode) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(vendor.telephone_number) + ", '" + password + "'))"
      + ", Now()"
      + ");"
  }

  // Function : create_insert_user_sql
  // Argument : vendor_id / vendor's id
  //            first_name / user's given name
  //            last_name / user's family name
  //            name / user's nickname
  //            email / email address
  //            password / password
  // response : SQL statement
  create_insert_user_sql(
    vendor_id, first_name, last_name, name, email, user_password, code, authority_type
  ) {

    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(first_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(last_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(authority_type, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(email, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_password, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(code, true);
    if (check_error != null) {
      return null;
    }

    let date = new Date();
    let salt = date.getTime();
    let password = util_common_func.get_encrypt_password();

    return "insert into users "
      + "( "
      + " vendor_id, first_name, last_name, authority_type, name, "
      + " email, password, secret_key, code, verified, created "
      + ") "
      + "values"
      + "("
      + "  " + vendor_id
      + ", HEX(AES_ENCRYPT(" + mysql.escape(first_name) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(last_name) + ", '" + password + "'))"
      + ", " + authority_type
      + ", " + mysql.escape(name)
      + ", HEX(AES_ENCRYPT(" + mysql.escape(email) + ", '" + password + "'))"
      + ", HEX(AES_ENCRYPT(" + mysql.escape(user_password) + ", '" + password + "'))"
      + ", SHA2('" + email + "-" + salt + "' , 224)"
      + ", " + mysql.escape(code)
      + ", 0 "
      + ", Now()"
      + ");"
  }

  // Function : create_update_user_sql
  // Argument : update user data
  // response : SQL statement
  create_update_user_sql(
    first_name, last_name, name, email, user_password, authority_type, id
  ) {

    // check argument
    let check_error = null;
    check_error = execute_check_sql_argument(first_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(last_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(email, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_password, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(authority_type, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(id, true);
    if (check_error != null) {
      return null;
    }
    let password = util_common_func.get_encrypt_password();

    return " update users "
      + "   set name = " + mysql.escape(name) + " "
      + "      ,email = HEX(AES_ENCRYPT(" + mysql.escape(email) + ", '" + password + "'))"
      + "      ,first_name = HEX(AES_ENCRYPT(" + mysql.escape(first_name) + ", '" + password + "'))"
      + "      ,last_name = HEX(AES_ENCRYPT(" + mysql.escape(last_name) + ", '" + password + "'))"
      + "      ,password = HEX(AES_ENCRYPT(" + mysql.escape(user_password) + ", '" + password + "'))"
      + "      ,authority_type = " + authority_type + " "
      + "      ,updated = now() "
      + " where id = " + id + " ";
  }

  // Function : create_exists_user_sql
  // Argument : username : username to check
  //          : without_user_id : check user id without this id
  // response : SQL statement
  create_exists_user_sql(username, without_user_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(username, false);
    if (check_error != null) {
      return null;
    }
    if (without_user_id === undefined || without_user_id === null) {
      return "SELECT count(id) as count_user "
        + "     FROM users a "
        + "    WHERE a.name = " + mysql.escape(username) + " "
        + "      AND a.unregisted IS NULL ";
    } else {
      return "SELECT count(id) as count_user "
        + "     FROM users a "
        + "    WHERE a.name = " + mysql.escape(username) + " "
        + "      AND a.id != " + without_user_id + " "
        + "      AND a.unregisted IS NULL ";
    }
  }

  // Function : create_exists_other_user_sql
  // Argument : username : username to check
  // response : SQL statement
  create_exists_other_user_sql(vendor_id, user_id) {
    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "SELECT count(id) as count_user "
      + "     FROM users a "
      + "    WHERE a.id != " + user_id + " "
      + "      AND a.vendor_id = " + vendor_id + " "
      + "      AND a.unregisted IS NULL ";
  }

  // Function : create_update_unregisted_user_sql
  // Argument : username : username to check
  // response : SQL statement
  create_update_unregisted_user_sql(vendor_id, user_id) {
    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "update users "
      + "      SET updated = now() "
      + "         ,unregisted = now() "
      + "    WHERE id = " + user_id + " "
      + "      AND vendor_id = " + vendor_id + " "
      + "      AND unregisted IS NULL ";
  }

  // Function : create_exists_other_authority_user_sql
  // Argument : vendor_id : vendor's id user belongs
  //          : user_id : user's id
  // response : SQL statement
  create_exists_other_authority_user_sql(vendor_id, user_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }
    return "SELECT (CASE WHEN count(id) > 0 THEN true ELSE false END) as authority_check "
      + "     FROM users a "
      + "    WHERE a.vendor_id = " + vendor_id + " "
      + "      AND a.id != " + user_id + " "
      + "      AND a.authority_type = 0 "
      + "      AND a.unregisted IS NULL ";
  }
  // Function : create_set_contractor_sql
  // Argument :
  // response : SQL statement
  create_set_contractor_sql(vendor_id, user_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "update vendors "
      + " set contractor_user_id = " + user_id
      + "    ,updated = now() "
      + " where id = " + vendor_id
      + ";"
  }

  // Function : create_get_apikey_secretkey_sql
  // Argument : user_id   / user's id
  // response : SQL statement
  create_get_apikey_secretkey_sql(user_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "select a.secret_key as secret_key "
      + "         ,b.api_key as api_key  "
      + " from users a "
      + "     ,vendors b"
      + " where a.id = " + user_id
      + "   and a.vendor_id = b.id "
      + ";"
  }

  // Function : create_get_apikey_secretkey_by_login_sql
  // Argument : user_name     / username for login
  //            user_password / userpassword for login
  // response : SQL statement
  create_get_apikey_secretkey_by_login_sql(user_name, user_password) {
    let check_error = null;
    check_error = execute_check_sql_argument(user_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_password, false);
    if (check_error != null) {
      return null;
    }

    let password = util_common_func.get_encrypt_password();
    return "SELECT a.secret_key as secret_key "
      + "         ,b.api_key as api_key  "
      + "     FROM users a "
      + "         ,vendors b"
      + " WHERE a.name = " + mysql.escape(user_name)
      + "   AND a.password = " + " HEX(AES_ENCRYPT(" + mysql.escape(user_password) + ", '" + password + "'))"
      + "   AND a.vendor_id = b.id "
      + "   AND a.verified = 1 "
      + "   AND a.unregisted is null "
      + "   AND b.unregisted is null "
      + ";"
  }

  // Function : create_latest_sql
  // Argument : vendor_id / vendor id
  //          : user_id / user's id
  // response : SQL statement
  create_latest_sql(vendor_id, user_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    // culculate start line no
    let start = 0;
    // get password
    let password = util_common_func.get_encrypt_password();

    // the max record number of this sql is 100.
    return "select a.id as build_id "
      + "      ,a.kind as type "
      + "      ,a.created as upload_date "
      + "      ,CONCAT(convert(AES_DECRYPT(UNHEX(c.last_name), '"
      + password + "') USING utf8),' ',convert(AES_DECRYPT(UNHEX(c.first_name), '"
      + password + "') USING utf8)) as last_and_first_name "
      + "      ,b.id as project_id "
      + "      ,b.name as project_name "
      + "      ,a.icon as build_icon "
      + "      ,a.app_name as title "
      + "      ,a.bundle_id as bundle_id "
      + "      ,a.package_name as package_name "
      + "      ,a.current_version as current_version "
      + "      ,a.min_os_version as min_os_version "
      + "      ,a.enabled as enabled "
      + "      ,a.original_file_name as original_file_name "
      + "      ,a.plist_file_name as plist "
      + "      ,a.file_name as file_name "
      + "      ,a.release_note as release_note "
      + "    from ( select * from buildings order by id desc limit " + start + ",100 ) a right join projects b on a.project_id = b.id "
      + "      ,users c "
      + "      ,user_manage_projects d "
      + " where c.id = d.user_id "
      + "   and c.id = " + user_id + " "
      + "   and b.id = d.project_id "
      + "   and d.unregisted is null "
      + "   and a.vendor_id = " + vendor_id + " "
      + " order by a.id desc ; "
  }

  // Function : create_report_sql
  // Argument : build_id / build id
  // response : SQL statement
  create_report_sql(build_id) {

    let check_error = null;

    // check argument
    let build_id_array = build_id.split(',');
    if (build_id_array.length === 0) {
      return null;
    }
    build_id_array.forEach(id => {
      check_error = execute_check_sql_argument(Number(id), true);
      if (check_error != null) {
        return null;
      }
    });

    // get password
    let password = util_common_func.get_encrypt_password();

    return " select a.id as build_id "
      + "            ,b.id as report_id "
      + "            ,b.note "
      + "            ,CONCAT(convert(AES_DECRYPT(UNHEX(c.last_name), '"
      + password + "') USING utf8),' ',convert(AES_DECRYPT(UNHEX(c.first_name), '"
      + password + "') USING utf8)) as last_and_first_name "
      + "            ,b.created as created "
      + "        from buildings a "
      + "            ,reports b "
      + "            ,users c "
      + "  where a.id = b.report_building_id "
      + "    and b.report_user_id = c.id "
      + "    and a.unregisted is null "
      + "    and b.unregisted is null "
      + "    and a.id in (" + build_id + ")"
      + " order by created ";
  }

  // Function : create_report_insert_sql
  // Argument : build_id  / build id to add comment
  //          : user_id   / report user id
  //          : note      / report comment
  // response : SQL statement
  create_report_insert_sql(build_id, user_id, note) {
    let check_error = null;
    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(note, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "INSERT INTO reports "
      + "(report_building_id, report_user_id, note, created, updated, unregisted) "
      + "VALUES "
      + "(" + build_id + " "
      + ", " + user_id + " "
      + ",  " + mysql.escape(note) + " "
      + " , now(), NULL, NULL)";
  }

  // Function : create_report_update_sql
  // Argument : build_id  / build id to add comment
  //          : report_id / report id to update
  //          : user_id   / report user id
  //          : note      / report comment
  // response : SQL statement
  create_report_update_sql(build_id, report_id, user_id, note) {
    let check_error = null;
    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(report_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(note, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "update reports "
      + "   set report_user_id = " + mysql.escape(user_id)
      + "      ,note = " + mysql.escape(note)
      + "	     ,updated = now() "
      + " where id = " + mysql.escape(report_id)
      + "   and report_building_id = " + mysql.escape(build_id);
  }

  // Function : create_report_delete_sql
  // Argument : build_id  / build id to delete
  //          : report_id / report id to delete
  // response : SQL statement
  create_report_delete_sql(build_id, report_id) {
    let check_error = null;
    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(report_id, true);
    if (check_error != null) {
      return null;
    }

    return "delete from reports "
      + " where id = " + mysql.escape(report_id)
      + "   and report_building_id = " + mysql.escape(build_id)
      + " LIMIT 1 ";
  }

  // Function : create_report_multi_delete_sql
  // Argument : build_id  / build id to delete
  // response : SQL statement
  create_report_multi_delete_sql(build_id) {

    let check_error = null;

    let build_id_array = build_id.split(',');
    if (build_id_array.length === 0) {
      return null;
    }
    build_id_array.forEach(id => {
      check_error = execute_check_sql_argument(Number(id), true);
      if (check_error != null) {
        return null;
      }
    });

    return "DELETE FROM reports "
      + " WHERE report_building_id IN ( " + build_id + " ) ";
  }
  // Function : create_user_sql
  // Argument : vendor_id / vendor id
  //          : user_id / user's id
  // response : SQL statement
  create_user_sql(vendor_id, user_id) {

    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    // get password
    let password = util_common_func.get_encrypt_password();

    return "select a.id as id "
      + "           ,a.vendor_id as vendor_id "
      + "           ,convert(AES_DECRYPT(UNHEX(a.last_name),'" + password + "') USING utf8) as last_name "
      + "           ,convert(AES_DECRYPT(UNHEX(a.first_name),'" + password + "') USING utf8) as first_name "
      + "           ,convert(AES_DECRYPT(UNHEX(a.email),'" + password + "') USING utf8) as email "
      + "           ,convert(AES_DECRYPT(UNHEX(a.password),'" + password + "') USING utf8) as password "
      + "           ,a.authority_type as authority_type "
      + "           ,a.name as name "
      + "           ,a.verified as verified "
      + "           ,a.created as created "
      + "           ,a.updated as updated "
      + "           ,(case when a.unregisted is null then true else false end) as status"
      + "           ,c.add as `add` "
      + "           ,c.edit as `edit` "
      + "           ,c.delete as `delete` "
      + "           ,c.management as management "
      + "           ,c.management_add as management_add "
      + "           ,c.management_edit as management_edit "
      + "           ,c.management_delete as management_delete "
      + "  FROM users a  "
      + "     , vendors b "
      + "     , m_authority c "
      + " WHERE a.id = " + user_id + " "
      + "   AND a.vendor_id = " + vendor_id + " "
      + "   AND a.vendor_id = b.id "
      + "   AND a.authority_type = c.type "
      + "   AND a.unregisted is null "
      + "   AND b.unregisted is null "
      + "   AND c.unregisted is null ";
  }

  // Function : create_users_sql
  // Argument : vendor_id / vendor id
  //          : user_id / user's id
  // response : SQL statement
  create_users_sql(vendor_id, user_id) {

    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    // get password
    let password = util_common_func.get_encrypt_password();

    return "SELECT a.id as id "
      + "           ,a.vendor_id as vendor_id "
      + "           ,CONCAT(convert(AES_DECRYPT(UNHEX(a.last_name), '"
      + password + "') USING utf8),' ',convert(AES_DECRYPT(UNHEX(a.first_name), '"
      + password + "') USING utf8)) as last_and_first_name "
      + "           ,convert(AES_DECRYPT(UNHEX(a.email), '" + password + "') USING utf8) as email"
      + "           ,convert(AES_DECRYPT(UNHEX(a.password), '" + password + "') USING utf8) as password"
      + "           ,c.name as authority "
      + "           ,c.type as authority_type"
      + "           ,a.name as name "
      + "           ,a.verified as verified "
      + "           ,a.created as created "
      + "           ,a.updated as updated "
      + "           ,(case when a.unregisted is null then true else false end) as status"
      + "  FROM users a  "
      + "     , vendors b "
      + "     , m_authority c"
      + " WHERE a.vendor_id = " + vendor_id + " "
      + "   AND a.vendor_id = b.id "
      + "   AND a.unregisted is null "
      + "   AND c.type = a.authority_type"
      + "   AND b.unregisted is null ";
  }

  // Function : create_projects_of_vendor_sql
  // Argument : vendor_id / vendor id
  //          : user_id / user's id
  // response : SQL statement
  create_projects_of_vendor_sql(vendor_id, user_id) {

    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "select a.id "
      + "         ,a.name "
      + "         ,(case when b.id is null then false else true end ) validation"
      + " from (select * from projects "
      + "        where vendor_id = " + vendor_id + " "
      + "          and unregisted is null) a left join "
      + "      (select * from user_manage_projects "
      + "        where user_id = " + user_id + " "
      + "          and unregisted is null) b "
      + " on a.id = b.project_id ";
  }
  // Function : create_projects_of_user_manage_sql
  // Argument : vendor_id / vendor id
  //          : user_id / user's id
  // response : SQL statement
  create_projects_of_user_manage_sql(vendor_id, user_id) {

    let check_error = null;
    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return " select a.id as project_id "
      + "          ,a.name as project_name "
      + "          ,a.overview as project_overview"
      + "          ,a.created as created "
      + "          ,a.updated as updated "
      + "   from projects a "
      + "       ,user_manage_projects b "
      + "  where b.user_id = " + mysql.escape(user_id) + " "
      + "    and b.vendor_id = " + mysql.escape(vendor_id) + " "
      + "    and a.id = b.project_id "
      + "    and a.unregisted is null "
      + "    and b.unregisted is null "
      + " order by a.updated, a.created ";
  }

  // Function : create_update_building_sql
  // Argument : build_id / build id
  //          : release_note / release note text to have been written by user
  //          : download_enabled / flag user can download the application
  // response : SQL statement
  create_update_building_sql(build_id, release_note, download_enabled) {

    let check_error = null;
    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(download_enabled, true);
    if (check_error != null) {
      return null;
    }

    let relesae_note_sql = "null";
    if (release_note !== null) {
      relesae_note_sql = mysql.escape(release_note);
    }

    return " UPDATE buildings "
      + "   SET  release_note = " + relesae_note_sql
      + "       ,enabled = cast(" + mysql.escape(download_enabled) + " as signed) "
      + "       ,updated = now() "
      + "  WHERE id = cast(" + mysql.escape(build_id) + " as signed) ";
  }

  // Function : create_buildings_sql_for_ios
  // Argument : vendor_id           / vendor id
  //          : project_id          / project id
  //          : user_id             / user id
  //          : upload_file         / result of ipa file analyzed
  //          : file_name           / ipa file name after rename
  //          : original_file_name  / ipa file name when upload
  //          : plist_file_name     / plist file name
  //          : release_note        / release note
  //          : icon_file_name      / icon name to upload
  // response : SQL statement
  create_buildings_sql_for_android(
    vendor_id, project_id, user_id, upload_file,
    original_file_name, file_name, release_note, icon_file_name) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(file_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(original_file_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(upload_file, false);
    if (check_error != null) {
      return null;
    }

    let min_version = util_common_func.convert_sdkversion_to_osversion(
      upload_file.usesSdk.minSdkVersion);
    if (min_version === null) {
      return null;
    }

    if (icon_file_name === null) {
      icon_file_name = "null";
    }

    return "insert into buildings"
      + "("
      + "  vendor_id ,project_id ,upload_user_id ,kind ,app_name, icon ,current_version, min_os_version"
      + "  ,bundle_id ,package_name ,file_name ,original_file_name ,plist_file_name"
      + "  ,release_note ,enabled ,created ,updated ,unregisted"
      + ") "
      + "values"
      + "("
      + "   " + vendor_id
      + "  ," + mysql.escape(project_id)
      + "  ," + mysql.escape(user_id)
      + "  ," + 1
      + "  ,\"" + upload_file.application.label[0] + "\""
      + "  ,\"" + icon_file_name + "\""
      + "  ,\"" + upload_file.versionName + "\" "
      + "  ," + min_version
      + "  ,null"
      + "  ,\"" + upload_file.package + "\""
      + "  ,\"" + original_file_name + "\""
      + "  ,\"" + file_name + "\""
      + "  ,null"
      + "  ," + mysql.escape(release_note)
      + "  ,1"
      + "  ,Now()"
      + "  ,null"
      + "  ,null"
      + ");";
  }

  // Function : create_buildings_sql_for_ios
  // Argument : vendor_id           / vendor id
  //          : project_id          / project id
  //          : user_id             / user id
  //          : upload_file         / result of ipa file analyzed
  //          : file_name           / ipa file name after rename
  //          : original_file_name  / ipa file name when upload
  //          : plist_file_name     / plist file name
  //          : release_note        / release note
  //          : icon_file_name      / icon name to upload
  // response : SQL statement
  create_buildings_sql_for_ios(
    vendor_id, project_id, user_id, upload_file,
    original_file_name, file_name, plist_file_name,
    release_note, icon_file_name) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(file_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(original_file_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(plist_file_name, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(upload_file, false);
    if (check_error != null) {
      return null;
    }

    if (icon_file_name === null) {
      icon_file_name = "null";
    }

    return "insert into buildings"
      + "("
      + "  vendor_id ,project_id ,upload_user_id ,kind ,app_name ,icon ,current_version ,min_os_version"
      + "  ,bundle_id ,package_name ,file_name ,original_file_name ,plist_file_name"
      + "  ,release_note ,enabled ,created ,updated ,unregisted"
      + ") "
      + "values"
      + "("
      + "   " + vendor_id
      + "  ," + mysql.escape(project_id)
      + "  ," + mysql.escape(user_id)
      + "  ," + 0
      + "  ,\"" + upload_file.CFBundleName + "\""
      + "  ,\"" + icon_file_name + "\""
      + "  ,\"" + upload_file.CFBundleShortVersionString + "\""
      + "  ,\"" + upload_file.DTSDKName.replace('iphoneos', '') + "\""
      + "  ,\"" + upload_file.CFBundleIdentifier + "\""
      + "  ,null"
      + "  ,\"" + file_name + "\""
      + "  ,\"" + original_file_name + "\""
      + "  ,\"" + plist_file_name + "\""
      + "  ," + mysql.escape(release_note)
      + "  ,1"
      + "  ,Now()"
      + "  ,null"
      + "  ,null"
      + ");";
  }

  // Function : create_insert_projects_sql
  // Argument : vendor_id           / vendor id
  //          : project_information / project information to add
  // response : SQL statement
  create_insert_projects_sql(vendor_id, project_information) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_information.name, false);
    if (check_error != null) {
      return null;
    }

    let image_0 = (project_information.images[0] !== null) ? project_information.images[0] : null;
    let image_1 = (project_information.images[1] !== null) ? project_information.images[1] : null;
    let image_2 = (project_information.images[2] !== null) ? project_information.images[2] : null;
    let image_3 = (project_information.images[3] !== null) ? project_information.images[3] : null;
    let image_4 = (project_information.images[4] !== null) ? project_information.images[4] : null;

    return " INSERT INTO projects ( "
      + "       vendor_id, name, image_1, image_2, image_3, image_4, image_5 "
      + "     , overview, created, updated, unregisted "
      + "    ) VALUES ("
      + "      cast(" + vendor_id + " as signed) "
      + "     , " + mysql.escape(project_information.name) + " "
      + "     , " + mysql.escape(image_0) + " "
      + "     , " + mysql.escape(image_1) + " "
      + "     , " + mysql.escape(image_2) + " "
      + "     , " + mysql.escape(image_3) + " "
      + "     , " + mysql.escape(image_4) + " "
      + "     , " + mysql.escape(project_information.overview) + " "
      + "     , now() "
      + "     , NULL "
      + "     , NULL "
      + "    )"
  }

  // Function : create_update_projects_sql
  // Argument : project_information / project information to update
  // response : SQL statement
  create_update_projects_sql(project_information) {

    let check_error = null;

    check_error = execute_check_sql_argument(project_information.id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_information.name, false);
    if (check_error != null) {
      return null;
    }

    let project_overview_sql = "null";
    if (project_information.overview !== null) {
      project_overview_sql = mysql.escape(project_information.overview)
    }

    let update_image_sql = "";
    for (let i = 0; i < project_information.modify.length; i++) {
      if (project_information.modify[i].kind === 1 || project_information.modify[i].kind === 2) {
        update_image_sql = update_image_sql + "     ,image_" + (i + 1) + " = "
          + mysql.escape(path.basename(project_information.modify[i].image)) + " ";
      } else if (project_information.modify[i].kind === 3) {
        update_image_sql = update_image_sql + "     ,image_" + (i + 1) + " = NULL";
      }
    }

    return "UPDATE projects "
      + "      SET name     = " + mysql.escape(project_information.name) + " "
      + "         ,overview = " + project_overview_sql + " "
      + update_image_sql
      + "         ,updated  = now() "
      + "    WHERE id = " + project_information.id;
  }

  // Function : create_delete_project_sql
  // Argument : vendor_id   / vendor's id
  //          : project_id  / project id to delete
  //          : user_id     / user id to manage this project
  // response : SQL statement
  create_delete_project_sql(vendor_id, project_id, user_id) {
    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM projects "
      + "    WHERE id = "
      + "    ( SELECT id FROM ( SELECT a.id "
      + "                  FROM projects a "
      + "                      ,user_manage_projects b "
      + "                      ,vendors c "
      + "                 WHERE a.id = " + project_id
      + "                   AND c.id = " + vendor_id
      + "                   AND b.user_id = " + user_id
      + "                   AND a.id = b.project_id "
      + "                   AND b.vendor_id = c.id ) as project_id )"
      + "   LIMIT 1 ";
  }

  // Function : create_delete_project_of_vendor_sql
  // Argument : vendor_id   / vendor's id
  // response : SQL statement
  create_delete_project_of_vendor_sql(vendor_id) {
    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM projects "
      + "    WHERE vendor_id = " + vendor_id + " ";
  }

  // Function : create_select_project_sql
  // Argument : vendor_id   / user's vendor id
  //          : user_id     / user id to select
  //          : project_id  / project id to select
  // response : SQL statement
  create_select_project_sql(vendor_id, user_id, project_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "SELECT a.id "
      + "    ,a.name "
      + "    ,a.overview "
      + "    ,a.image_1 "
      + "    ,a.image_2 "
      + "    ,a.image_3 "
      + "    ,a.image_4 "
      + "    ,a.image_5 "
      + "  FROM projects a "
      + "      ,user_manage_projects b "
      + " WHERE a.id = " + project_id + " "
      + "   AND a.id = b.project_id "
      + "   AND b.vendor_id = " + vendor_id + " "
      + "   AND b.user_id = " + user_id + " "
      + "   AND a.unregisted is null "
      + "   AND b.unregisted is null ";
  }

  // Function : create_project_of_vendor_sql
  // Argument : vendor_id   / user's vendor id
  //          : user_id     / user id to select
  //          : project_id  / project id to select
  // response : SQL statement
  create_project_of_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return "SELECT a.id "
      + "    ,a.name "
      + "    ,a.overview "
      + "    ,a.image_1 "
      + "    ,a.image_2 "
      + "    ,a.image_3 "
      + "    ,a.image_4 "
      + "    ,a.image_5 "
      + "  FROM projects a "
      + " WHERE a.vendor_id = " + vendor_id + " ";
  }

  // Function : create_select_buildings_for_project_build_history_sql
  // Argument : project_id  / project id to select
  // response : SQL statement
  create_select_buildings_for_project_build_history_sql(project_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "SELECT a.kind "
      + "      ,a.id  "
      + "      ,a.icon "
      + "      ,a.app_name "
      + "      ,a.current_version "
      + "      ,a.bundle_id "
      + "      ,a.package_name "
      + "      ,a.created "
      + "      ,a.file_name "
      + "      ,a.enabled "
      + "      ,a.original_file_name "
      + "      ,a.plist_file_name "
      + "  FROM buildings a "
      + " WHERE a.project_id = " + mysql.escape(project_id) + " "
      + "   AND a.unregisted is null "
      + " ORDER BY a.kind ASC, a.id DESC ";
  }

  // Function : create_buildings_of_vendor
  // Argument : vendor_ids  / ids of vendor
  // response : SQL statement
  create_buildings_of_vendor(project_ids_string) {

    let check_error = null;

    let project_ids_array = project_ids_string.split(',');
    if (project_ids_array.length === 0) {
      return null;
    }
    project_ids_array.forEach(project_id => {
      check_error = execute_check_sql_argument(project_id, true);
      if (check_error != null) {
        return null;
      }
    });

    return "SELECT a.kind "
      + "      ,a.id  "
      + "      ,a.icon "
      + "      ,a.app_name "
      + "      ,a.current_version "
      + "      ,a.bundle_id "
      + "      ,a.package_name "
      + "      ,a.created "
      + "      ,a.file_name "
      + "      ,a.enabled "
      + "      ,a.original_file_name "
      + "      ,a.plist_file_name "
      + "  FROM buildings a "
      + " WHERE a.project_id IN (" + project_ids_string + ") "
      + " ORDER BY a.kind ASC, a.id DESC ";
  }

  // Function : create_insert_user_manage_projects_sql
  // Argument : vendor_id         / vendor id of user
  //          : project_id        / project id user added
  // response : SQL statement
  create_insert_user_manage_projects_sql(vendor_id, project_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "INSERT INTO user_manage_projects (user_id, vendor_id, project_id, created) "
      + " SELECT a.id as user_id "
      + "      , " + mysql.escape(vendor_id) + " as vendor_id "
      + "      , " + mysql.escape(project_id) + " as project_id "
      + "      , now() as created "
      + "  FROM users a "
      + " WHERE a.vendor_id = cast(" + mysql.escape(vendor_id) + " as signed) "
  }

  // Function : create_insert_user_manage_projects_multiple_sql
  // Argument : vendor_id         / vendor id of user
  //          : project_ids       / project ids user added
  // response : SQL statement
  create_insert_user_manage_projects_multiple_sql(vendor_id, project_ids, user_id, user_update) {

    let check_error = null;

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    let project_ids_string = "";
    if (Array.isArray(project_ids)) {
      for (let i = 0; i < project_ids.length; i++) {
        check_error = execute_check_sql_argument(project_ids[i], true);
        if (check_error != null) {
          return null;
        }
      }
      project_ids_string = project_ids.join(',');
    } else {
      check_error = execute_check_sql_argument(project_ids, true);
      if (check_error != null) {
        return null;
      }
      project_ids_string = project_ids;
    }

    if (user_update === true) {
      return "INSERT INTO user_manage_projects (user_id, vendor_id, project_id, created, updated) "
        + " SELECT " + mysql.escape(user_id) + " as user_id "
        + "      , " + mysql.escape(vendor_id) + " as vendor_id "
        + "      , id as project_id "
        + "      , now() as created "
        + "      , now() as updated "
        + "  FROM projects a "
        + " WHERE a.vendor_id = cast(" + mysql.escape(vendor_id) + " as signed) "
        + "   AND a.id IN ( " + project_ids_string + " ) "
    } else {
      return "INSERT INTO user_manage_projects (user_id, vendor_id, project_id, created) "
        + " SELECT " + mysql.escape(user_id) + " as user_id "
        + "      , " + mysql.escape(vendor_id) + " as vendor_id "
        + "      , id as project_id "
        + "      , now() as created "
        + "  FROM projects a "
        + " WHERE a.vendor_id = cast(" + mysql.escape(vendor_id) + " as signed) "
        + "   AND a.id IN ( " + project_ids_string + " ) "
    }
  }

  // Function : create_delete_user_manage_projects_sql
  // Argument : vendor_id         / vendor id of user
  //          : project_id        / project id to delete
  // response : SQL statement
  create_delete_user_manage_projects_sql(vendor_id, project_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM user_manage_projects "
      + "    WHERE id IN "
      + "  ( SELECT id FROM ( SELECT a.id "
      + "                  FROM user_manage_projects a "
      + "                      ,vendors b "
      + "                 WHERE a.project_id = " + project_id
      + "                   AND b.id = " + vendor_id
      + "                   AND a.vendor_id = b.id ) as user_manage_projects_id ) ";
  }

  // Function : create_delete_user_manage_projects_of_vendor_sql
  // Argument : vendor_id         / vendor id of user
  // response : SQL statement
  create_delete_user_manage_projects_of_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM user_manage_projects "
      + "    WHERE vendor_id = " + vendor_id + " ";
  }

  // Function : create_delete_user_manage_projects_of_user_sql
  // Argument : vendor_id         / vendor id of user
  // response : SQL statement
  create_delete_user_manage_projects_of_user_sql(vendor_id, user_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(user_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM user_manage_projects "
      + "    WHERE vendor_id = " + vendor_id + " "
      + "      AND user_id = " + user_id + " ";
  }

  // Function : delete_building_by_project_sql
  // Argument : project_id    / project id for delete building
  //          : vendor_id     / vendor id for delete building
  // response : SQL statement
  delete_building_by_project_sql(vendor_id, project_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(project_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM buildings "
      + "    WHERE project_id = " + project_id + " "
      + "      AND vendor_id = " + vendor_id + " ";
  }

  // Function : delete_building_of_vendor_sql
  // Argument : vendor_id     / vendor id for delete building
  // response : SQL statement
  delete_building_of_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }


    return "DELETE FROM buildings "
      + "    WHERE vendor_id = " + vendor_id + " ";
  }

  // Function : delete_user_of_vendor_sql
  // Argument : vendor_id     / vendor id for delete building
  // response : SQL statement
  delete_user_of_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM users "
      + "    WHERE vendor_id = " + vendor_id + " ";
  }

  // Function : delete_vendor_sql
  // Argument : vendor_id     / vendor id to delete
  // response : SQL statement
  delete_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM vendors "
      + "    WHERE id = " + vendor_id + " ";
  }

  // Function : delete_building_sql
  // Argument : build_id  / build id for delete building
  // response : SQL statement
  delete_building_sql(build_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(build_id, true);
    if (check_error != null) {
      return null;
    }

    return "DELETE FROM buildings "
      + "    WHERE id = " + build_id + " ";
  }

  // Function : create_select_delete_file_sql
  // Argument : modify / project update array
  //          : id     / project id
  // response : SQL statement
  create_select_delete_file_sql(modify, id) {
    let del = false;
    let sql = " SELECT id ";
    for (let i = 0; i < modify.length; i++) {
      if (modify[i].kind === 2 || modify[i].kind === 3) {
        sql = sql + " , image_" + (i + 1) + " "
        del = true;
      }
    }
    if (del) {
      sql = sql + "  FROM projects "
      sql = sql + " WHERE id = " + id
      return sql;
    } else {
      return null;
    }
  }

  // Function : create_vendor_sql
  // Argument : vendor_id  / vendor id to select
  // response : SQL statement
  create_vendor_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    // get password
    let password = util_common_func.get_encrypt_password();

    return " select a.id "
      + "          ,convert(AES_DECRYPT(UNHEX(a.name), '" + password + "') USING utf8) as name"
      + "          ,a.api_key "
      + "          ,a.contractor_user_id "
      + "          ,b.name as contractor_user_name "
      + "          ,convert(AES_DECRYPT(UNHEX(a.country), '" + password + "') USING utf8) as country "
      + "          ,convert(AES_DECRYPT(UNHEX(a.province), '" + password + "') USING utf8) as province "
      + "          ,convert(AES_DECRYPT(UNHEX(a.city), '" + password + "') USING utf8) as city "
      + "          ,convert(AES_DECRYPT(UNHEX(a.address), '" + password + "') USING utf8) as address "
      + "          ,convert(AES_DECRYPT(UNHEX(a.zip_code), '" + password + "') USING utf8) as zip_code  "
      + "          ,convert(AES_DECRYPT(UNHEX(a.tel), '" + password + "') USING utf8) as tel  "
      + "          ,a.created "
      + "          ,a.updated "
      + "          ,a.unregisted "
      + "      from vendors a "
      + "          ,users b "
      + "     where a.unregisted is null "
      + "       and a.id = " + vendor_id + " "
      + "       and a.contractor_user_id = b.id "
      + "       and b.unregisted is null ";
  }

  // Function : create_admin_users_sql
  // Argument : vendor_id  / vendor id to select
  // response : SQL statement
  create_admin_users_sql(vendor_id) {

    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    return " SELECT b.id "
      + "          ,b.name"
      + "      FROM vendors a "
      + "          ,users b "
      + "     WHERE a.unregisted is null "
      + "       AND a.id = " + vendor_id + " "
      + "       AND b.authority_type = 0 "
      + "       AND b.verified = 1 "
      + "       AND b.unregisted is null ";
  }

  // Function : create_vendor_update_sql
  // Argument : vendor_id        / vendor id to update
  //          : argument_content / items of vendor update
  // response : SQL statement
  create_vendor_update_sql(vendor_id, argument_content) {
    let check_error = null;

    check_error = execute_check_sql_argument(vendor_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.contractor_user_id, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.company, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.country, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.province, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.city, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.postalcode, true);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.address, false);
    if (check_error != null) {
      return null;
    }

    check_error = execute_check_sql_argument(argument_content.data.telno, true);
    if (check_error != null) {
      return null;
    }

    // get password
    let password = util_common_func.get_encrypt_password();

    return "update vendors "
      + "      set name               = HEX(AES_ENCRYPT('" + argument_content.data.company + "', '" + password + "')) "
      + "         ,contractor_user_id = " + argument_content.data.contractor_user_id + " "
      + "         ,country            = HEX(AES_ENCRYPT('" + argument_content.data.country + "', '" + password + "')) "
      + "         ,province           = HEX(AES_ENCRYPT('" + argument_content.data.province + "', '" + password + "')) "
      + "         ,city               = HEX(AES_ENCRYPT('" + argument_content.data.city + "', '" + password + "')) "
      + "         ,address            = HEX(AES_ENCRYPT('" + argument_content.data.address + "', '" + password + "')) "
      + "         ,zip_code           = HEX(AES_ENCRYPT('" + argument_content.data.postalcode + "', '" + password + "')) "
      + "         ,tel                = HEX(AES_ENCRYPT('" + argument_content.data.telno + "', '" + password + "')) "
      + "         ,updated            = now() "
      + "  where id = " + vendor_id + " ";

  }

  // Function : create_select_authority
  // Argument : None
  // response : SQL statement
  create_select_authority(authority) {
    return "SELECT type, name FROM m_authority where type = " + authority + " ";
  }

  // Function : execute_sql
  // Argument : sql_script / sql text
  //          : json       / database setting to connect. not nessesary.
  //          : callback   / callback function
  // response : HTTP:200 json
  // memo     : search json meet condition
  execute_sql(sql_script, json, callback) {
    let db_connect_define = json;

    // check argument
    let check_error = execute_check_argument(sql_script, callback);
    if (check_error != null) {
      callback(check_error, null, null);
      return;
    }

    // get database setting
    if (json === null || json === undefined) {
      // Connect database
      try {
        db_connect_define = JSON.parse(fs.readFileSync('/work/db_conf/mysql.conf', 'utf8'));
      } catch (error) {
        callback(error, null, null);
      }
    }

    // create connection for database
    const connection = mysql.createConnection({
      host: db_connect_define.host,
      user: db_connect_define.user,
      password: db_connect_define.password,
      database: db_connect_define.database,
    });

    // execute query
    connection.query(
      sql_script, (err, results, fields) => {
        callback(err, results, fields);
        //connection.end();
        return;
      }
    );
    connection.end();
  }
}

// Function : execute_check_sql_argument
// Argument : argument
// response : NULL or Error object
function execute_check_sql_argument(argument, number_check) {
  // check callback
  if (argument === null) {
    return new Error('argument is null');
  }

  if (number_check === true) {
    let check = isNaN(argument);
    if (check === true) {
      return new Error('argument is not Number');
    }
  }
  return null;
};

// Function : execute_check_argument
// Argument : sql_script / sql text
//          : callback   / callback function
// response : NULL or Error object
function execute_check_argument(sql_script, callback) {
  // check sql
  if (sql_script === null) {
    return new Error('SQL is null');
  } else if (sql_script.length === 0) {
    return new Error('SQL is 0');
  }
  // check callback
  if (callback === null) {
    return new Error('callback is null');
  }
  return null;
};

module.exports = Db_Common;
