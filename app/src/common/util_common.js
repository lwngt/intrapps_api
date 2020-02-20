'use strict';
let fs = require('fs');

const LOG_FLAG = true;

// class : Util_Common
// memo  : common class for usful tool
class Util_Common {

  // Function : consolelog
  // Argument : text to output for console.log()
  // response : none
  // memo     : wrapper function of console.log()
  consolelog(text) {
    if (LOG_FLAG) {
      console.log(text);
    }
  }

  // Function : get_encrypt_password
  // Argument : none
  // response : password text
  // %%% TODO : password must move to conf file!!
  get_encrypt_password() {
    return "password***";
  }

  // Function : get_verified_code
  // Argument : none
  // response : 6 digits number
  get_verified_code() {
    let number = Math.floor(Math.random() * 1000000);
    let string_number = '' + number;
    while (string_number.length < 6) {
      string_number = '0' + string_number;
    }
    return string_number;
  }

  // Function : create_signup_api_content
  // Argument : apikey    / apikey for  vendor
  //            secretkey / secretkey for user
  // response : json data content for build api
  create_signup_api_content(api_key, secret_key) {
    let response_data = {
      "apikey": api_key,
      "secretkey": secret_key
    }
    return response_data;
  }

  // Function : create_building_api_content
  // Argument : result of database select sql
  // response : json data content for build api
  create_building_api_content(sidebar, building, note) {
    let response_data = {
      "sidebar": sidebar,
      "building": null
    };
    if (building === null) {
      return response_data;
    }

    // create note json
    let report = null;
    if (note !== null) {
      let items = [];
      note.forEach((note_record) => {
        if (note_record.build_id === building.build_id) {
          items.push(note_record);
        }
      });
      // create output json
      if (items[0] !== undefined) {
        report = [];
        items.forEach((item) => {
          report.push({
            "build_id": item.build_id,
            "report_id": item.report_id,
            "note": item.note,
            "last_and_first_name": item.last_and_first_name,
            "created": item.created
          });
        });
      }
    }

    // create build json
    let building_data =
    {
      "build_id": building.build_id,
      "type": building.type,
      "upload_date": building.upload_date,
      "project": {
        "id": building.project_id,
        "name": building.project_name
      },
      "application": {
        "icon": building.build_icon,
        "title": building.title,
        "bundle_id": building.bundle_id,
        "last_and_first_name": building.last_and_first_name,
        "package_name": building.package_name,
        "current_version": building.current_version,
        "min_os_version": building.min_os_version,
        "enabled": building.enabled,
        "file_original_name": building.original_file_name,
        "plist_name": building.plist,
        "file_name": building.file_name,
        "release_note": building.release_note
      },
      report
    };

    response_data.building = building_data;
    return response_data;
  }

  // Function : create_sidebar_content
  // Argument : user information and user manage project infomation
  // response : json data content for latest api
  create_sidebar_content(user_information, user_manage_projects) {
    if (user_information === null) {
      return null;
    }

    let sidebar_information = {
      "user_information": {
        "id": user_information.user_id,
        "vendor_id": user_information.vendor_id,
        "last_and_first_name": user_information.last_name + ' ' + user_information.first_name,
        "authority_type": user_information.authority_type,
        "authority_content": {
          "add": user_information.add,
          "edit": user_information.edit,
          "delete": user_information.delete,
          "management": user_information.management,
          "management_add": user_information.management_add,
          "management_edit": user_information.management_edit,
          "management_delete": user_information.management_delete
        },
        "name": user_information.name,
        "created": user_information.created,
        "updated": user_information.updated
      },
      "user_projects": user_manage_projects
    };

    return sidebar_information;
  }

  // Function : create_projects_api_content
  // Argument : sidebar / sidebar json of sql result
  //          : projects / project list which user managed of json of sql result
  // response : json data content for project api
  create_projects_api_content(sidebar, projects) {
    let response_data = {
      "sidebar": sidebar,
      "projects": null
    };
    let projects_data = [];
    if (Array.isArray(projects)) {
      projects.forEach(project => {
        projects_data.push({
          "project_id": project.project_id,
          "project_name": project.project_name,
          "project_overview": project.project_overview,
          "created": project.created,
          "updated": project.updated
        });
      });
      response_data.projects = projects_data;
    }
    return response_data;
  }

  // Function : create_project_api_content
  // Argument : sidebar / sidebar json of sql result
  //          : projects / project list which user managed of json of sql result
  // response : json data content for project api
  create_project_api_content(sidebar, project, build_history) {
    let response_data = {
      "sidebar": sidebar,
      "project": {
        "id": project.id,
        "name": project.name,
        "overview": project.overview,
        "image_1": project.image_1,
        "image_2": project.image_2,
        "image_3": project.image_3,
        "image_4": project.image_4,
        "image_5": project.image_5,
        "build_history": build_history
      }
    };
    return response_data;
  }

  // Function : create_latest_api_content
  // Argument : sidebar / sidebar json of sql result
  //          : latests / latests of json of sql result
  //          : note / latest of sql result
  //          : page / current page no
  // response : json data content for latest api
  create_latest_api_content(sidebar, latests, note, page_no) {
    let response_data = {
      "page_no": page_no,
      "sidebar": sidebar,
      "buildings": null
    };
    if (latests === null) {
      return response_data;
    }

    // upload build data exists
    let buildings_data = [];
    latests.forEach(latest => {
      // create note json
      let report = null;
      if (note !== null) {
        let items = [];
        note.forEach((note_record) => {
          if (note_record.build_id === latest.build_id) {
            items.push(note_record);
          }
        });
        //items.push(note.find((v) => v.build_id === latest.build_id));
        // create output json
        if (items[0] !== undefined) {
          report = [];
          items.forEach((item) => {
            report.push({
              "build_id": item.build_id,
              "report_id": item.report_id,
              "note": item.note,
              "last_and_first_name": item.last_and_first_name,
              "created": item.created
            });
          });
        }
      }

      // create build json
      buildings_data.push(
        {
          "build_id": latest.build_id,
          "type": latest.type,
          "upload_date": latest.upload_date,
          "project": {
            "id": latest.project_id,
            "name": latest.project_name
          },
          "application": {
            "icon": latest.build_icon,
            "title": latest.title,
            "bundle_id": latest.bundle_id,
            "last_and_first_name": latest.last_and_first_name,
            "package_name": latest.package_name,
            "current_version": latest.current_version,
            "min_os_version": latest.min_os_version,
            "enabled": latest.enabled,
            "file_original_name": latest.original_file_name,
            "plist_name": latest.plist,
            "file_name": latest.file_name,
            "release_note": latest.release_note
          },
          report
        }
      );
    });
    response_data.buildings = buildings_data;
    return response_data;
  }

  // Function : create_users_api_content
  // Argument : sidebar   / sidebar json of sql result
  //          : users     / user's list in vendor
  // response : json data content for users api
  create_users_api_content(sidebar, users) {
    let response_data = {
      "sidebar": sidebar,
      "users": users
    };
    return response_data;
  }

  // Function : create_user_api_content
  // Argument : sidebar   / sidebar json of sql result
  //          : users     / user's list in vendor
  //          : projects  / vendor of projects
  // response : json data content for users api
  create_user_api_content(sidebar, user, projects) {
    let response_data = {
      "sidebar": sidebar,
      "user": user,
      "projects_of_vendor": projects
    };
    return response_data;
  }

  // Function : create_vendor_api_content
  // Argument : sidebar   / sidebar json of sql result
  //          : vendor    / user's vendor
  //          : admin     / admin users in this vendor
  // response : json data content for vendor api
  create_vendor_api_content(sidebar, vendor, admin) {
    let response_data = {
      "sidebar": sidebar,
      "vendor": vendor,
      "admin_users": admin
    };
    return response_data;
  }

  // Function : create_login_api_content
  // Argument : result of database select sql
  // response : json data content for login api
  create_login_api_content(result) {
    if (result === null) {
      return null;
    }
    let response_data = {
      "apikey": result.api_key,
      "secretkey": result.secret_key
    };

    return response_data;
  }



  convert_sdkversion_to_osversion(sdk_version) {
    if (isNaN(sdk_version) || sdk_version === null) {
      return null;
    }
    let os_version = 4.0;
    switch (sdk_version) {
      case 14:
        os_version = 4.0;
        break;
      case 15:
        os_version = 4.03;
        break;
      case 16:
        os_version = 4.1;
        break;
      case 17:
        os_version = 4.2;
        break;
      case 18:
        os_version = 4.3;
        break;
      case 19:
        os_version = 4.4;
        break;
      case 20:
        os_version = 4.4;
      case 21:
        os_version = 5.0;
        break;
      case 22:
        os_version = 5.1;
        break;
      case 23:
        os_version = 6.0;
        break;
      case 24:
        os_version = 7.0;
        break;
      case 25:
        os_version = 7.1;
        break;
      case 26:
        os_version = 8.0;
        break;
      case 27:
        os_version = 8.1;
        break;
      case 28:
        os_version = 9.0;
        break;
      case 29:
        os_version = 10.0;
        break;
      default:
        os_version = 0.0;
        break;
    }
    return os_version;
  }

  // Function : rename_file
  // Argument : from_file : origin file name
  //          : to_file   : destination file name
  // response : none
  rename_file(from_file, to_file) {
    //fs.renameSync(from_file, to_file);
    fs.createReadStream(from_file).pipe(fs.createWriteStream(to_file)).on('finish', function (error) {
      if (error) {
      } else {
        fs.unlinkSync(from_file);
      }
    })
  }

  // Function : password_type_check
  // Argument : mail : mail address to check
  // response : true : correct / false : not correct
  password_type_check(password) {
    if (String(password).match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,100}$/)) {
      return true;
    } else {
      return false;
    }
  }

  // Function : mail_check
  // Argument : mail : mail address to check
  // response : true : correct / false : not correct
  mail_check(mail) {
    var mail_regex1 = new RegExp('(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*');
    var mail_regex2 = new RegExp('^[^\@]+\@[^\@]+$');
    if (String(mail).match(mail_regex1) && mail.match(mail_regex2)) {
      // check multi byte character
      if (String(mail).match(/[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/)) { return false; }
      // check end of domain
      if (!String(mail).match(/\.[a-z]+$/)) { return false; }
      return true;
    } else {
      return false;
    }
  }


  // Function : upload_file_delete
  // Argument : files / array of files to be deleted
  // response : none
  upload_file_delete(files) {
    if (files !== null && Array.isArray(files)) {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          try {
            if (files[i] !== null) {
              fs.unlinkSync(files[i]);
            }
          } catch (error) {
            console.log(error);
            if (error.errno === -2) {
              // when file is not found, ignore error.
              return 0;
            } else {
              // raise error to manage file.
              return new Error("0008");
            }
          }
        }
      }
    }
  }

  // Function : cleanup_input_file
  // Argument : files / array of files to be deleted
  // response : none
  cleanup_input_file(path, files) {
    if (path !== null & files !== null && Array.isArray(files)) {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          try {
            if (files[i] !== null) {
              fs.unlinkSync(path + "/" + files[i].filename);
            }
          } catch (error) {
            console.log(error);
            if (error.errno === -2) {
              // when file is not found, ignore error.
              return 0;
            } else {
              // raise error to manage file.
              return new Error("0008");
            }
          }
        }
      }
    }
  }

}

module.exports = Util_Common;
