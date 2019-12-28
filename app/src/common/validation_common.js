let util_common = require('../common/util_common');
let util_common_func = new util_common;

class Validation_Common {

  // Function : check_username
  // Argument : username to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check username to be processed
  //          : whether the content is correct or not.
  check_username(username) {
    if (username === undefined || username === null) {
      return false;
    }
    if (username.length < 6 || username.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_password
  // Argument : pasword to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check pasword to be processed
  //          : whether the content is correct or not.
  check_password(password) {
    if (password === undefined || password === null) {
      return false;
    }
    if (password.length < 6 || password.length > 100) {
      return false;
    }
    if (util_common_func.password_type_check(password) === false) {
      return false;
    }
    return true;
  }

  // Function : check_address
  // Argument : address to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check address to be processed
  //          : whether the content is correct or not.
  check_address(address) {
    if (address === undefined || address === null) {
      return false;
    }
    if (address.length < 1 || address.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_email
  // Argument : email to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check email to be processed
  //          : whether the content is correct or not.
  check_email(email) {
    if (email === undefined || email === null) {
      return false;
    }
    if (email.length < 6 || email.length > 100) {
      return false;
    }
    if (util_common_func.mail_check(email) === false) {
      return false;
    }
    return true;
  }

  // Function : check_family_name
  // Argument : family name to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check family name to be processed
  //          : whether the content is correct or not.
  check_family_name(family_name) {
    if (family_name === undefined || family_name === null) {
      return false;
    }
    if (family_name.length < 1 || family_name.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_given_name
  // Argument : given name to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check given name to be processed
  //          : whether the content is correct or not.
  check_given_name(given_name) {
    if (given_name === undefined || given_name === null) {
      return false;
    }
    if (given_name.length < 1 || given_name.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_company
  // Argument : company to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check company to be processed
  //          : whether the content is correct or not.
  check_company(company) {
    if (company === undefined || company === null) {
      return false;
    }
    if (company.length < 1 || company.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_country
  // Argument : country to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check country to be processed
  //          : whether the content is correct or not.
  check_country(country) {
    if (country === undefined || country === null) {
      return false;
    }
    if (country.length < 1 || country.length > 16) {
      return false;
    }
    return true;
  }

  // Function : check_province
  // Argument : province to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check province to be processed
  //          : whether the content is correct or not.
  check_province(province) {
    if (province === undefined || province === null) {
      return false;
    }
    if (province.length < 1 || province.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_province
  // Argument : province to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check province to be processed
  //          : whether the content is correct or not.
  check_city(city) {
    if (city === undefined || city === null) {
      return false;
    }
    if (city.length < 1 || city.length > 100) {
      return false;
    }
    return true;
  }

  // Function : check_postalcode
  // Argument : postalcode to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check postalcode to be processed
  //          : whether the content is correct or not.
  check_postalcode(postalcode) {
    if (postalcode === undefined || postalcode === null) {
      return false;
    }
    if (postalcode.length < 4 || postalcode.length > 10) {
      return false;
    }
    if (Number.isFinite(Number(postalcode)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_telephone_number
  // Argument : telephone number to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check telephone number to be processed
  //          : whether the content is correct or not.
  check_telephone_number(telephone_number) {
    if (telephone_number === undefined || telephone_number === null) {
      return false;
    }
    if (telephone_number.length < 3 || telephone_number.length > 11) {
      return false;
    }
    if (Number.isFinite(Number(telephone_number)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_code
  // Argument : code to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check code to be processed
  //          : whether the content is correct or not.
  check_code(code) {
    if (code === undefined || code === null) {
      return false;
    }
    if (code.length < 5 || code.length > 6) {
      return false;
    }
    if (Number.isFinite(Number(code)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_apikey
  // Argument : apikey to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check apikey to be processed
  //          : whether the content is correct or not.
  check_apikey(apikey) {
    if (apikey === undefined || apikey === null) {
      return false;
    }
    if (apikey.length > 700 || apikey.length < 1) {
      return false;
    }
    if (apikey === "null") {
      return false;
    }
    return true;
  }

  // Function : check_secretkey
  // Argument : secretkey to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check secretkey to be processed
  //          : whether the content is correct or not.
  check_secretkey(secretkey) {
    if (secretkey === undefined || secretkey === null) {
      return false;
    }
    if (secretkey.length > 700 || secretkey.length < 1) {
      return false;
    }
    if (secretkey === "null") {
      return false;
    }
    return true;
  }

  // Function : check_page_no
  // Argument : page no to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check page no to be processed
  //          : whether the content is correct or not.
  check_page_no(page_no) {
    if (page_no === undefined || page_no === null) {
      return false;
    }
    if (page_no.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(page_no)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_project_name(project_name)
  // Argument : project name to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check project name to be processed
  //          : whether the content is correct or not.
  check_project_name(project_name) {
    if (project_name === undefined || project_name === null) {
      return false;
    }
    if (project_name.length > 30 || project_name.length < 1) {
      return false;
    }
    return true;
  }

  // Function : check_project_overview(project_overview)
  // Argument : project overview text to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check project overview text to be processed
  //          : whether the content is correct or not.
  check_project_overview(project_overview) {
    // no problem is project overview's content is null
    if (project_overview !== undefined && project_overview !== null) {
      if (get_byte(project_overview) > 65535) {
        return false;
      }
    }
    return true;
  }

  // Function : check_project_images(project_images)
  // Argument : project images to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check project images to be processed
  //          : whether the content is correct or not.
  check_project_images(project_images) {
    if (project_images === undefined || project_images === null) {
      return false;
    }
    if (Array.isArray(project_images) === false) {
      return false;
    }
    return true;
  }

  // Function : check_build_app_file(file)
  // Argument : file to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check file to be processed
  //          : whether the content is correct or not.
  check_build_app_file(file) {
    if (file === undefined || file === null) {
      return false;
    }
    if (file.length === 0) {
      return false;
    }
    return true;
  }

  // Function : check_project_id
  // Argument : project id to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check project id to be processed
  //          : whether the content is correct or not.
  check_project_id(project_id) {
    if (project_id === undefined || project_id === null) {
      return false;
    }
    if (project_id.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(project_id)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_release_note(release_note)
  // Argument : release note to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check release note to be processed
  //          : whether the content is correct or not.
  check_release_note(release_note) {
    // no problem is report's content is null
    if (release_note !== undefined && release_note !== null) {
      if (get_byte(release_note) > 65535) {
        return false;
      }
    }
    return true;
  }

  // Function : check_build_id
  // Argument : build id to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check build id to be processed
  //          : whether the content is correct or not.
  check_build_id(build_id) {
    if (build_id === undefined || build_id === null) {
      return false;
    }
    if (build_id.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(build_id)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_report(report)
  // Argument : report to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check report to be processed
  //          : whether the content is correct or not.
  check_report(report) {
    if (report === undefined || report === null) {
      return false;
    }
    if (get_byte(report) > 65535 || get_byte(report) < 1) {
      return false;
    }
    return true;
  }

  // Function : check_download_enabled
  // Argument : download_enabled to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check enabled item to be processed
  //          : whether the content is correct or not.
  check_download_enabled(enabled) {
    if (enabled === undefined || enabled === null) {
      return false;
    }
    if (enabled.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(enabled)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_report_id
  // Argument : report_id item to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check report_id to be processed
  //          : whether the content is correct or not.
  check_report_id(report_id) {
    if (report_id === undefined || report_id === null) {
      return false;
    }
    if (report_id.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(report_id)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_user_id
  // Argument : user_id item to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check user_id to be processed
  //          : whether the content is correct or not.
  check_user_id(user_id) {
    if (user_id === undefined || user_id === null) {
      return false;
    }
    if (user_id.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(user_id)) === false) {
      return false;
    }
    return true;
  }

  // Function : check_authority
  // Argument : authority to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check authority to be processed
  //          : whether the content is correct or not.
  check_authority(authority) {
    if (authority === undefined || authority === null) {
      return false;
    }
    if (authority.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(authority)) === false) {
      return false;
    }

    return true;
  }

  // Function : check_user_manage_project_ids
  // Argument : user manage project id to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check user manage project id to be processed
  //          : whether the content is correct or not.
  check_user_manage_project_ids(ids) {
    if (ids === undefined && ids === null) {
      if (Array.isArray(ids) === false) {
        return false;
      }
      if (ids.length === 0) {
        return false;
      }
      // check item of array is numnber or not
      let check = false;
      ids.forEach(id => {
        if (Number.isFinite(Number(id)) === false) {
          check = true;
        }
      });
      if (check) {
        return false;
      }
    }
    return true;
  }

  // Function : check_vendor_id
  // Argument : vendor id to check
  // response : true  : the content can be processed
  //          : false : the content can't be processed
  // memo     : check vendor_id to be processed
  //          : whether the content is correct or not.
  check_vendor_id(vendor_id) {
    if (vendor_id === undefined || vendor_id === null) {
      return false;
    }
    if (vendor_id.length === 0) {
      return false;
    }
    if (Number.isFinite(Number(vendor_id)) === false) {
      return false;
    }

    return true;
  }
}

const get_byte = (str) => {
  str = (str == null) ? "" : str;
  return encodeURI(str).replace(/%../g, "*").length;
}

module.exports = Validation_Common;
