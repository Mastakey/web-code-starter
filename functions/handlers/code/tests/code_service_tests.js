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
  deleteCodeService
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
    const params = {
    };
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

let run = async () => {
  console.log("Create Code");
  let codeId = await createCodeTest();
  console.log("Get Codes");
  await getCodesTest();
  console.log("Get Code by Id");
  await getCodeByIdTest(codeId);
  console.log("Edit Code");
  await editCodeTest(codeId);
  console.log("Delete Code");
  await deleteCodeTest(codeId);
};

run();
