var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-code-starter.firebaseio.com"
});
const db = admin.firestore();

const {
  createFieldService,
  getFieldsService,
  getFieldByIdService,
  editFieldService,
  deleteFieldService,
  getFieldsByObjIdService
} = require("../field_service");

let createFieldTest = async () => {
  const params = {
    name: "test field",
    description: "test field desc",
    type: "type value",
    objId: "objId value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createFieldService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getFieldsTest = async () => {
  try {
    const params = {};
    const user = {
      username: "user5"
    };
    let resp = await getFieldsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getFieldByIdTest = async fieldId => {
  try {
    const params = {
      fieldId: fieldId
    };
    let resp = await getFieldByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editFieldTest = async fieldId => {
  const params = {
    name: "test field edited",
    description: "test field desc edited",
    fieldId: fieldId,
    type: "type value",
    objId: "objId value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editFieldService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteFieldTest = async fieldId => {
  const params = {
    fieldId: fieldId
  };
  try {
    let resp = await deleteFieldService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getFieldsByObjIdServiceTest = async () => {
  const params = {
    objId: "JIhznYzLPseaFV7FmxVC"
  };
  try {
    let resp = await getFieldsByObjIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Field");
  let fieldId = await createFieldTest();
  console.log("Get Fields");
  await getFieldsTest();
  console.log("Get Field by Id");
  await getFieldByIdTest(fieldId);
  console.log("Get Fields by Obj Id");
  await getFieldsByObjIdServiceTest();
  console.log("Edit Field");
  await editFieldTest(fieldId);
  console.log("Delete Field");
  await deleteFieldTest(fieldId);
};

run();
