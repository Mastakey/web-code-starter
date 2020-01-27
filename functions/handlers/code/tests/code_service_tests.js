var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-code-starter.firebaseio.com"
});
const db = admin.firestore();

const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService,
  getCodesByObjIdService,
  getCodesByAppIdService,
  createCodeGenSerService,
  createCodeGenConService,
  createCodeGenRouteService,
  createCodeGenReducerService,
  createCodeGenActionService,
  createCodeGenReactRouteService,
  createCodeGenComponentService,
  createCodeAppjsService,
  createCodesByAppService,
  deleteCodesByAppService
} = require("../code_service");

let createCodeTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    appId: "appId value",
    objId: "objId value",
    code: "code value",
    folder: "folder value",
    type: "type value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getCodesTest = async () => {
  try {
    const params = {};
    const user = {
      username: "user5"
    };
    let resp = await getCodesService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getCodeByIdTest = async codeId => {
  try {
    const params = {
      codeId: codeId
    };
    let resp = await getCodeByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editCodeTest = async codeId => {
  const params = {
    name: "test code edited",
    description: "test code desc edited",
    codeId: codeId,
    appId: "appId value",
    objId: "objId value",
    code: "code value",
    folder: "folder value",
    type: "type value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editCodeService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteCodeTest = async codeId => {
  const params = {
    codeId: codeId
  };
  try {
    let resp = await deleteCodeService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getCodesByObjIdTest = async () => {
  try {
    const params = {
      objId: "1"
    };
    const user = {
      username: "user5"
    };
    let resp = await getCodesByObjIdService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getCodesByAppIdTest = async () => {
  try {
    const params = {
      appId: "1"
    };
    const user = {
      username: "user5"
    };
    let resp = await getCodesByAppIdService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenSerServiceTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    type: "service",
    objId: "JIhznYzLPseaFV7FmxVC",
    appId: ""
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenSerService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenConServiceTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    objId: "JIhznYzLPseaFV7FmxVC",
    appId: ""
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenConService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenRouteServiceTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenRouteService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenReducerServiceTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenReducerService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenActionServiceTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenActionService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeGenReactRouteServiceTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeGenReactRouteService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeAppjsServiceTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeAppjsService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let deleteCodesByAppTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await deleteCodesByAppService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodesByAppTest = async () => {
  const params = {
    appId: "4jOfLfzb0vUIptM0mBo1"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodesByAppService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  // console.log("Create Code");
  // let codeId = await createCodeTest();
  // console.log("Get Codes");
  // await getCodesTest();
  // console.log("Get Code by Id");
  // await getCodeByIdTest(codeId);
  // console.log("Edit Code");
  // await editCodeTest(codeId);
  // console.log("Delete Code");
  // await deleteCodeTest(codeId);
  // await getCodesByAppIdTest();
  // await getCodesByObjIdTest();
  // console.log("Create Service Code");
  // await createCodeGenSerServiceTest();
  // console.log("Create Controller Code");
  // await createCodeGenConServiceTest();
  // console.log("Create Routes Code");
  // await createCodeGenRouteServiceTest();
  console.log("Delete Codes by App");
  await deleteCodesByAppTest();
  // console.log("Create Codes by App");
  // await createCodesByAppTest();
  // console.log("Create Reducer Code");
  // await createCodeGenReducerServiceTest();
  // console.log("Create Actions Code");
  // await createCodeGenActionServiceTest();
  // console.log("Create React Route Code");
  // await createCodeGenReactRouteServiceTest();
  // console.log("Create Component Code");
  // await createCodeGenComponentServiceTest();
  // console.log("Create Appjs Code");
  // await createCodeAppjsServiceTest();
  ;
};

run();
