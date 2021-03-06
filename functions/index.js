const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
app.use(cors());

const {
  signUp,
  login,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

const {
  createCode,
  getCodes,
  getCodeById,
  getCodesByObjId,
  getCodesByAppId,
  editCode,
  deleteCode,
  createCodeGenSer,
  createCodeGenCon,
  createCodeGenRoute,
  createCodeGenReducer,
  createCodeGenAction,
  createCodeGenReactRoute,
  createCodeGenComponent,
  createCodeAppjs,
  deleteCodesByApp,
  createCodesByApp
} = require("./handlers/code/code_controller");

const {
  createField,
  getFields,
  getFieldById,
  getFieldsByObjId,
  editField,
  deleteField
} = require("./handlers/field/field_controller");

const {
  createObj,
  getObjs,
  getObjById,
  getObjsByAppId,
  editObj,
  deleteObj
} = require("./handlers/obj/obj_controller");

const {
  createApp,
  getApps,
  getAppById,
  editApp,
  deleteApp
} = require("./handlers/app/app_controller");


//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

//Code routes
app.post("/code", FBAuth, createCode);
app.get("/code", FBAuth, getCodes);
app.get("/code/:codeId", FBAuth, getCodeById);
app.get("/obj/:objId/code", FBAuth, getCodesByObjId);
app.get("/app/:appId/code", FBAuth, getCodesByAppId);
app.put("/code/:codeId", FBAuth, editCode);
app.delete("/code/:codeId", FBAuth, deleteCode);

//Custom routes
app.post("/obj/:objId/code/service", FBAuth, createCodeGenSer);
app.post("/obj/:objId/code/controller", FBAuth, createCodeGenCon);
app.post("/app/:appId/code/route", FBAuth, createCodeGenRoute);
app.post("/app/:appId/code/reducer", FBAuth, createCodeGenReducer);
app.post("/app/:appId/code/actions", FBAuth, createCodeGenAction);
app.post("/app/:appId/code/reactroutes", FBAuth, createCodeGenReactRoute);
app.post("/app/:appId/code/component", FBAuth, createCodeGenComponent);
app.post("/app/:appId/code/appjs", FBAuth, createCodeAppjs);
app.delete("/app/:appId/code", FBAuth, deleteCodesByApp);
app.post("/app/:appId/code", FBAuth, createCodesByApp);
  
//Field routes
app.post("/field", FBAuth, createField);
app.get("/field", FBAuth, getFields);
app.get("/field/:fieldId", FBAuth, getFieldById);
app.get("/obj/:objId/field", FBAuth, getFieldsByObjId);
app.put("/field/:fieldId", FBAuth, editField);
app.delete("/field/:fieldId", FBAuth, deleteField);
  
//Obj routes
app.post("/obj", FBAuth, createObj);
app.get("/obj", FBAuth, getObjs);
app.get("/obj/:objId", FBAuth, getObjById);
app.get("/app/:appId/obj", FBAuth, getObjsByAppId);
app.put("/obj/:objId", FBAuth, editObj);
app.delete("/obj/:objId", FBAuth, deleteObj);
  
//App routes
app.post("/app", FBAuth, createApp);
app.get("/app", FBAuth, getApps);
app.get("/app/:appId", FBAuth, getAppById);
app.put("/app/:appId", FBAuth, editApp);
app.delete("/app/:appId", FBAuth, deleteApp);
  

exports.api = functions.https.onRequest(app);