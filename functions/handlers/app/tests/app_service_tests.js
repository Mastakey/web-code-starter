var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-code-starter.firebaseio.com"
});
const db = admin.firestore();

const {
  createAppService,
  getAppsService,
  getAppByIdService,
  editAppService,
  deleteAppService
} = require("../app_service");

let createAppTest = async () => {
  const params = {
    name: "test app",
    description: "test app desc",
    apiUrl: "apiUrl value",
    databaseURL: "databaseURL value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createAppService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getAppsTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await getAppsService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getAppByIdTest = async appId => {
  try {
    const params = {
      appId: appId
    };
    let resp = await getAppByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editAppTest = async appId => {
  const params = {
    name: "test app edited",
    description: "test app desc edited",
    appId: appId,
    apiUrl: "apiUrl value",
    databaseURL: "databaseURL value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editAppService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteAppTest = async appId => {
  const params = {
    appId: appId
  };
  try {
    let resp = await deleteAppService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create App");
  let appId = await createAppTest();
  console.log("Get Apps");
  await getAppsTest();
  console.log("Get App by Id");
  await getAppByIdTest(appId);
  console.log("Edit App");
  await editAppTest(appId);
  console.log("Delete App");
  await deleteAppTest(appId);
};

run();
