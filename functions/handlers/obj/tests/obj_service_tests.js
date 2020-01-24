var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-code-starter.firebaseio.com"
});
const db = admin.firestore();

const {
  createObjService,
  getObjsService,
  getObjByIdService,
  editObjService,
  deleteObjService
} = require("../obj_service");

let createObjTest = async () => {
  const params = {
    name: "test obj",
    description: "test obj desc",
    appId: "appId value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createObjService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getObjsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getObjsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getObjByIdTest = async objId => {
  try {
    const params = {
      objId: objId
    };
    let resp = await getObjByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editObjTest = async objId => {
  const params = {
    name: "test obj edited",
    description: "test obj desc edited",
    objId: objId,
    appId: "appId value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editObjService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteObjTest = async objId => {
  const params = {
    objId: objId
  };
  try {
    let resp = await deleteObjService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Obj");
  let objId = await createObjTest();
  console.log("Get Objs");
  await getObjsTest();
  console.log("Get Obj by Id");
  await getObjByIdTest(objId);
  console.log("Edit Obj");
  await editObjTest(objId);
  console.log("Delete Obj");
  await deleteObjTest(objId);
};

run();
