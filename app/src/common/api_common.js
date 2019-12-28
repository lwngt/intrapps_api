'use strict';
let fs = require('fs');

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

// response difinition array
const response =
  [
    // Common success
    {
      "status": 200,
      "code": "",
      "message": ""
    },
    // Common Failuer
    {
      "status": 400,
      "code": "0004",
      "message": "SQL Execute error."
    },
    {
      "status": 401,
      "code": "0005",
      "message": "fail to authenticate."
    },
    {
      "status": 400,
      "code": "0006",
      "message": "fail to authenticate."
    },
    {
      "status": 400,
      "code": "0008",
      "message": "fail to manage the file."
    },
    {
      "status": 400,
      "code": "0009",
      "message": "fail to send authorization mail."
    },
    {
      "status": 403,
      "code": "0010",
      "message": "The user doesn't have a right."
    },
    {
      "status": 400,
      "code": "0102",
      "message": "This file is not ipa."
    },
    {
      "status": 400,
      "code": "0103",
      "message": "file extention is wrong.(only ipa or apk)"
    },
    {
      "status": 400,
      "code": "0401",
      "message": "username argument error"
    },
    {
      "status": 400,
      "code": "0402",
      "message": "password argument error"
    },
    {
      "status": 400,
      "code": "0403",
      "message": "address argument error"
    },
    {
      "status": 400,
      "code": "0404",
      "message": "email argument error"
    },
    {
      "status": 400,
      "code": "0405",
      "message": "family name argument error"
    },
    {
      "status": 400,
      "code": "0406",
      "message": "given name argument error"
    },
    {
      "status": 400,
      "code": "0407",
      "message": "Tel no arugment error."
    },
    {
      "status": 400,
      "code": "0408",
      "message": "company argument error"
    },
    {
      "status": 400,
      "code": "0409",
      "message": "country argument error"
    },
    {
      "status": 400,
      "code": "0410",
      "message": "province argument error"
    },
    {
      "status": 400,
      "code": "0411",
      "message": "city argument error"
    },
    {
      "status": 400,
      "code": "0412",
      "message": "postal code argument error"
    },
    {
      "status": 400,
      "code": "0413",
      "message": "The username has already existed"
    },
    {
      "status": 401,
      "code": "0414",
      "message": "signup confirm is failed. code has already been verified. Or code and username is wrong."
    },
    {
      "status": 400,
      "code": "0415",
      "message": "signup confirm is failed. code has already been verified or code is wrong."
    },
    {
      "status": 400,
      "code": "0416",
      "message": "This code was expired. Please register again."
    },
    {
      "status": 400,
      "code": "0417",
      "message": "the login failed"
    },
    {
      "status": 401,
      "code": "0418",
      "message": "ID or password is not collect."
    },
    {
      "status": 400,
      "code": "0419",
      "message": "page number have to be lower than 10."
    },
    {
      "status": 400,
      "code": "0420",
      "message": "Project Name argument error."
    },
    {
      "status": 400,
      "code": "0421",
      "message": "Project Overview argument error."
    },
    {
      "status": 400,
      "code": "0422",
      "message": "build app argument error."
    },
    {
      "status": 400,
      "code": "0423",
      "message": "project_id argument error."
    },
    {
      "status": 400,
      "code": "0424",
      "message": "Release note text argument error."
    },
    {
      "status": 400,
      "code": "0425",
      "message": "project_images_modify argument error."
    },
    {
      "status": 400,
      "code": "0426",
      "message": "Number of images to be uploaded has to be equal to number of 1 and 2 in project_images_modify."
    },
    {
      "status": 400,
      "code": "0427",
      "message": "report id argument error."
    },
    {
      "status": 400,
      "code": "0428",
      "message": "No report comment."
    },
    {
      "status": 400,
      "code": "0429",
      "message": "No project."
    },
    {
      "status": 400,
      "code": "0430",
      "message": "You do not manage the project."
    },
    {
      "status": 400,
      "code": "0431",
      "message": "You do not manage the application."
    },
    {
      "status": 400,
      "code": "0432",
      "message": "You do not manage the report."
    },
    {
      "status": 400,
      "code": "0434",
      "message": "You do not manage the vendor."
    },
    {
      "status": 400,
      "code": "0435",
      "message": "You do not manage the user."
    },
    {
      "status": 400,
      "code": "0436",
      "message": "project ids of user manage argument error"
    },
    {
      "status": 400,
      "code": "0437",
      "message": "authority argument error"
    },
    {
      "status": 400,
      "code": "0438",
      "message": "user id argument error."
    },
    {
      "status": 400,
      "code": "0439",
      "message": "user id can't be applied for contractor user id."
    },
    {
      "status": 400,
      "code": "0440",
      "message": "The no admin user is not pemitted in this vendor"
    },
    {
      "status": 400,
      "code": "0441",
      "message": "Vendor id argument error"
    },
    {
      "status": 400,
      "code": "0442",
      "message": "Enable download application argument error."
    },
    {
      "status": 400,
      "code": "0443",
      "message": "project id argument error."
    },
    {
      "status": 400,
      "code": "0444",
      "message": "The user has already existed"
    },
    {
      "status": 400,
      "code": "0445",
      "message": "Can\'t send email"
    },
    {
      "status": 400,
      "code": "0446",
      "message": "build_id argument error."
    },
    {
      "status": 400,
      "code": "0447",
      "message": "page argument error."
    },
    {
      "status": 400,
      "code": "0448",
      "message": "You can not delete the user because the user is yourself or contractor."
    },
    // Common Internal Error
    {
      "status": 400,
      "code": "9999",
      "message": "Internal error."
    }
  ];

// class : Api_Common
// memo  : common class for when using api
class Api_Common {
  constructor() {
    let api_conf = JSON.parse(fs.readFileSync("/work/api_conf/api.json", 'utf8'));
    this.BASE_URL = api_conf.web_url;
    this.FILE_ROOT = "/work/public/files";
    this.IMAGE_ROOT = "/work/public/images"
    this.TEMPATE_PLIST_PATH = "/work/template/template.plist";
    this.NO_ICON_PATH = "/work/template/no_image_icon.png";

    this.APP_TEMP_LOCAL_DIRECTORY = this.FILE_ROOT + "/app_temp";
    this.IPA_LOCAL_DIRECTORY = this.FILE_ROOT + "/ipa";
    this.PLIST_LOCAL_DIRECTORY = this.FILE_ROOT + "/plist";
    this.APK_LOCAL_DIRECTORY = this.FILE_ROOT + "/apk";
    this.SCREENSHOT_LOCAL_DIRECTORY = this.IMAGE_ROOT + "/screenshot";
    this.ICON_LOCAL_DIRECTORY = this.IMAGE_ROOT + "/icon";

    this.IPA_URL = this.BASE_URL + "/files/ipa";
    this.PLIST_URL = this.BASE_URL + "/files/plist";
    this.APK_URL = this.BASE_URL + "/files/apk";
    this.SCREENSHOT_URL = this.BASE_URL + "/files/screenshot";
    this.ICON_URL = this.BASE_URL + "/files/icon";
  }

  // Function : response_200
  // Argument : none
  // response : HTTP:200 json
  // memo     : search json meet condition
  response_200() {
    return search_response(200);
  }

  // Function : response_400_0004
  // Argument : none
  // response : HTTP:400 & CODE:0004 json
  // memo     : search json meet condition
  response_400_0004() {
    return search_response_and_code(400, "0004");
  }

  // Function : response_401_0005
  // Argument : none
  // response : HTTP:400 & CODE:0005 json
  // memo     : search json meet condition
  response_401_0005() {
    return search_response_and_code(401, "0005");
  }

  // Function : response_400_0006
  // Argument : none
  // response : HTTP:400 & CODE:0006 json
  // memo     : search json meet condition
  response_400_0006() {
    return search_response_and_code(400, "0006");
  }

  // Function : response_400_0008
  // Argument : none
  // response : HTTP:400 & CODE:0008 json
  // memo     : search json meet condition
  response_400_0008() {
    return search_response_and_code(400, "0008");
  }

  // Function : response_400_0009
  // Argument : none
  // response : HTTP:400 & CODE:0009 json
  // memo     : search json meet condition
  response_400_0009() {
    return search_response_and_code(400, "0009");
  }

  // Function : response_400_0009
  // Argument : none
  // response : HTTP:400 & CODE:0009 json
  // memo     : search json meet condition
  response_403_0010() {
    return search_response_and_code(403, "0010");
  }

  // Function : response_400_0101
  // Argument : none
  // response : HTTP:400 & CODE:0101 json
  // memo     : search json meet condition
  response_400_0101() {
    return search_response_and_code(400, "0101");
  }

  // Function : response_400_0102
  // Argument : none
  // response : HTTP:400 & CODE:0102 json
  // memo     : search json meet condition
  response_400_0102() {
    return search_response_and_code(400, "0102");
  }

  // Function : response_400_0103
  // Argument : none
  // response : HTTP:400 & CODE:0103 json
  // memo     : search json meet condition
  response_400_0103() {
    return search_response_and_code(400, "0103");
  }

  // Function : response_400_0401
  // Argument : none
  // response : HTTP:400 & CODE:0401 json
  // memo     : search json meet condition
  response_400_0401() {
    return search_response_and_code(400, "0401");
  }

  // Function : response_400_0402
  // Argument : none
  // response : HTTP:400 & CODE:0402 json
  // memo     : search json meet condition
  response_400_0402() {
    return search_response_and_code(400, "0402");
  }

  // Function : response_400_0403
  // Argument : none
  // response : HTTP:400 & CODE:0401 json
  // memo     : search json meet condition
  response_400_0403() {
    return search_response_and_code(400, "0403");
  }

  // Function : response_400_0404
  // Argument : none
  // response : HTTP:400 & CODE:0404 json
  // memo     : search json meet condition
  response_400_0404() {
    return search_response_and_code(400, "0404");
  }

  // Function : response_400_0405
  // Argument : none
  // response : HTTP:400 & CODE:0401 json
  // memo     : search json meet condition
  response_400_0405() {
    return search_response_and_code(400, "0405");
  }

  // Function : response_400_0406
  // Argument : none
  // response : HTTP:400 & CODE:0406 json
  // memo     : search json meet condition
  response_400_0406() {
    return search_response_and_code(400, "0406");
  }

  // Function : response_400_0407
  // Argument : none
  // response : HTTP:400 & CODE:0407 json
  // memo     : search json meet condition
  response_400_0407() {
    return search_response_and_code(400, "0407");
  }

  // Function : response_400_0408
  // Argument : none
  // response : HTTP:400 & CODE:0408 json
  // memo     : search json meet condition
  response_400_0408() {
    return search_response_and_code(400, "0408");
  }

  // Function : response_400_0409
  // Argument : none
  // response : HTTP:400 & CODE:0409 json
  // memo     : search json meet condition
  response_400_0409() {
    return search_response_and_code(400, "0409");
  }

  // Function : response_400_0410
  // Argument : none
  // response : HTTP:400 & CODE:0409 json
  // memo     : search json meet condition
  response_400_0410() {
    return search_response_and_code(400, "0410");
  }

  // Function : response_400_0411
  // Argument : none
  // response : HTTP:400 & CODE:0409 json
  // memo     : search json meet condition
  response_400_0411() {
    return search_response_and_code(400, "0411");
  }

  // Function : response_400_0412
  // Argument : none
  // response : HTTP:400 & CODE:0412 json
  // memo     : search json meet condition
  response_400_0412() {
    return search_response_and_code(400, "0412");
  }

  // Function : response_400_0413
  // Argument : none
  // response : HTTP:400 & CODE:0413 json
  // memo     : search json meet condition
  response_400_0413() {
    return search_response_and_code(400, "0413");
  }

  // Function : response_400_0414
  // Argument : none
  // response : HTTP:400 & CODE:0414 json
  // memo     : search json meet condition
  response_401_0414() {
    return search_response_and_code(401, "0414");
  }


  // Function : response_400_0415
  // Argument : none
  // response : HTTP:400 & CODE:0415 json
  // memo     : search json meet condition
  response_400_0415() {
    return search_response_and_code(400, "0415");
  }


  // Function : response_400_0416
  // Argument : none
  // response : HTTP:400 & CODE:0416 json
  // memo     : search json meet condition
  response_400_0416() {
    return search_response_and_code(400, "0416");
  }

  // Function : response_400_0417
  // Argument : none
  // response : HTTP:400 & CODE:0417 json
  // memo     : search json meet condition
  response_400_0417() {
    return search_response_and_code(400, "0417");
  }

  // Function : response_401_0418
  // Argument : none
  // response : HTTP:401 & CODE:0418 json
  // memo     : search json meet condition
  response_401_0418() {
    return search_response_and_code(401, "0418");
  }

  // Function : response_400_0419
  // Argument : none
  // response : HTTP:400 & CODE:0419 json
  // memo     : search json meet condition
  response_400_0419() {
    return search_response_and_code(400, "0419");
  }

  // Function : response_400_0420
  // Argument : none
  // response : HTTP:400 & CODE:0420 json
  // memo     : search json meet condition
  response_400_0420() {
    return search_response_and_code(400, "0420");
  }

  // Function : response_400_0421
  // Argument : none
  // response : HTTP:400 & CODE:0421 json
  // memo     : search json meet condition
  response_400_0421() {
    return search_response_and_code(400, "0421");
  }

  // Function : response_400_0422
  // Argument : none
  // response : HTTP:400 & CODE:0422 json
  // memo     : search json meet condition
  response_400_0422() {
    return search_response_and_code(400, "0422");
  }

  // Function : response_400_0423
  // Argument : none
  // response : HTTP:400 & CODE:0423 json
  // memo     : search json meet condition
  response_400_0423() {
    return search_response_and_code(400, "0423");
  }

  // Function : response_400_0424
  // Argument : none
  // response : HTTP:400 & CODE:0424 json
  // memo     : search json meet condition
  response_400_0424() {
    return search_response_and_code(400, "0424");
  }

  // Function : response_400_0425
  // Argument : none
  // response : HTTP:400 & CODE:0425 json
  // memo     : search json meet condition
  response_400_0425() {
    return search_response_and_code(400, "0425");
  }

  // Function : response_400_0426
  // Argument : none
  // response : HTTP:400 & CODE:0426 json
  // memo     : search json meet condition
  response_400_0426() {
    return search_response_and_code(400, "0426");
  }

  // Function : response_400_0427
  // Argument : none
  // response : HTTP:401 & CODE:0427 json
  // memo     : search json meet condition
  response_400_0427() {
    return search_response_and_code(400, "0427");
  }

  // Function : response_400_0428
  // Argument : none
  // response : HTTP:401 & CODE:0428 json
  // memo     : search json meet condition
  response_400_0428() {
    return search_response_and_code(400, "0428");
  }

  // Function : response_400_0426
  // Argument : none
  // response : HTTP:400 & CODE:0429 json
  // memo     : search json meet condition
  response_400_0429() {
    return search_response_and_code(400, "0429");
  }

  // Function : response_400_0430
  // Argument : none
  // response : HTTP:400 & CODE:0430 json
  // memo     : search json meet condition
  response_400_0430() {
    return search_response_and_code(400, "0430");
  }

  // Function : response_400_0431
  // Argument : none
  // response : HTTP:400 & CODE:0431 json
  // memo     : search json meet condition
  response_400_0431() {
    return search_response_and_code(400, "0431");
  }

  // Function : response_400_0432
  // Argument : none
  // response : HTTP:400 & CODE:0432 json
  // memo     : search json meet condition
  response_400_0432() {
    return search_response_and_code(400, "0432");
  }

  // Function : response_400_0433
  // Argument : none
  // response : HTTP:400 & CODE:0433 json
  // memo     : search json meet condition
  response_400_0433() {
    return search_response_and_code(400, "0433");
  }

  // Function : response_403_0434
  // Argument : none
  // response : HTTP:400 & CODE:0434 json
  // memo     : search json meet condition
  response_400_0434() {
    return search_response_and_code(400, "0434");
  }

  // Function : response_403_0435
  // Argument : none
  // response : HTTP:400 & CODE:0434 json
  // memo     : search json meet condition
  response_400_0435() {
    return search_response_and_code(400, "0435");
  }

  // Function : response_400_0436
  // Argument : none
  // response : HTTP:400 & CODE:0436 json
  // memo     : search json meet condition
  response_400_0436() {
    return search_response_and_code(400, "0436");
  }

  // Function : response_400_0437
  // Argument : none
  // response : HTTP:400 & CODE:0436 json
  // memo     : search json meet condition
  response_400_0437() {
    return search_response_and_code(400, "0437");
  }

  // Function : response_400_0438
  // Argument : none
  // response : HTTP:400 & CODE:0438 json
  // memo     : search json meet condition
  response_400_0438() {
    return search_response_and_code(400, "0438");
  }

  // Function : response_400_0439
  // Argument : none
  // response : HTTP:400 & CODE:0439 json
  // memo     : search json meet condition
  response_400_0439() {
    return search_response_and_code(400, "0439");
  }


  // Function : response_400_0440
  // Argument : none
  // response : HTTP:400 & CODE:0440 json
  // memo     : search json meet condition
  response_400_0440() {
    return search_response_and_code(400, "0440");
  }

  // Function : response_400_0441
  // Argument : none
  // response : HTTP:400 & CODE:0440 json
  // memo     : search json meet condition
  response_400_0441() {
    return search_response_and_code(400, "0441");
  }

  // Function : response_400_0442
  // Argument : none
  // response : HTTP:400 & CODE:0442 json
  // memo     : search json meet condition
  response_400_0442() {
    return search_response_and_code(400, "0442");
  }

  // Function : response_400_0804
  // Argument : none
  // response : HTTP:400 & CODE:0804 json
  // memo     : search json meet condition
  response_400_0804() {
    return search_response_and_code(400, "0804");
  }

  // Function : response_400_0443
  // Argument : none
  // response : HTTP:400 & CODE:0443 json
  // memo     : search json meet condition
  response_400_0443() {
    return search_response_and_code(400, "0443");
  }

  // Function : response_400_0444
  // Argument : none
  // response : HTTP:400 & CODE:0444 json
  // memo     : search json meet condition
  response_400_0444() {
    return search_response_and_code(400, "0444");
  }

  // Function : response_400_0445
  // Argument : none
  // response : HTTP:400 & CODE:0445 json
  // memo     : search json meet condition
  response_400_0445() {
    return search_response_and_code(400, "0445");
  }

  // Function : response_400_0446
  // Argument : none
  // response : HTTP:400 & CODE:0446 json
  // memo     : search json meet condition
  response_400_0446() {
    return search_response_and_code(400, "0446");
  }

  // Function : response_400_0447
  // Argument : none
  // response : HTTP:400 & CODE:0447 json
  // memo     : search json meet condition
  response_400_0447() {
    return search_response_and_code(400, "0447");
  }

  // Function : response_400_0448
  // Argument : none
  // response : HTTP:400 & CODE:0448 json
  // memo     : search json meet condition
  response_400_0448() {
    return search_response_and_code(400, "0448");
  }

  // Function : response_400_9999
  // Argument : none
  // response : HTTP:400 & CODE:0444 json
  // memo     : search json meet condition
  response_400_9999() {
    return search_response_and_code(400, "9999");
  }

  // Function : response_object
  // Argument : res      / response object of api
  //          : code     / http stauts to response
  //          : data     / json contents to response
  // response : none
  response_object(res, status, code, data, log_file_name) {
    res.header("Content-Type", "application/json; charset=utf-8");
    if (status === 200) {
      res.status(status).json(create_response_json(code, data));
    } else {
      res.status(status).send(create_response_json(code, data));
    }
    if (log_file_name !== undefined && log_file_name != null) {
      let pre = status === 200 ? "NOMAL" : "ERROR"
      common_logs_func.output_log(
        "header : apikey=" + res.req.headers['apikey']
        + " secretkey=" + res.req.headers['apikey']
        + " response=" + JSON.stringify(create_response_json(code, data)), pre, log_file_name);
    }
  };
}


// Function : create_response_json
// Argument : create json for response
// response : none
const create_response_json = (code, data) => {
  return {
    "code": code,
    "data": data
  };
};

// Function : search_response
// Argument : status / equal to response[?].status
// response : json object of response[?]
// memo     : search json meet status condition
const search_response = (status) => {
  let response_contents = response[response.length - 1];
  response.filter((value) => {
    if (value.status === status) {
      response_contents = value;
    };
  });
  return response_contents;
};

// Function : search_response_and_code
// Argument : status / equal to response[?].status
// response : json object of response[?]
// memo     : search json meet status and code condition
const search_response_and_code = (status, code) => {
  let response_contents = response[response.length - 1];
  response.filter((value) => {
    if (value.status === status && value.code === code) {
      response_contents = value;
    };
  });
  return response_contents;
};

module.exports = Api_Common;
