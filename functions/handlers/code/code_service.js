const { validateName } = require("./code_validators");

const {
  getFieldsByObj,
  getObjectsByApp,
  getObjectsByAppReturnData,
  createCodeObj,
  getAppById
} = require("./code_util");

//service
const {
  generateServiceCode,
  generateServiceTestCode,
  generateValidatorCode
} = require("../../codegen/backend/firebase/service/service_generate");
//controller
const {
  generateControllerCode,
  generateControllerTestCode
} = require("../../codegen/backend/firebase/controller/controller_generate");

//routes
const {
  generateRoutesCode
} = require("../../codegen/backend/firebase/routes/routes_generate");

//reducer
const {
  generateReducersCodes
} = require("../../codegen/frontend/react/redux/reducers");

//store
const {
  generateStoreCodes
} = require("../../codegen/frontend/react/redux/store");

//type
const {
  generateTypeCodes
} = require("../../codegen/frontend/react/redux/types");

//actions
const {
  generateActionsCodes
} = require("../../codegen/frontend/react/redux/actions");

//react routes
const {
  generateRouteAllCodes
} = require("../../codegen/frontend/react/routes/all");
const {
  generateRouteCreateCodes
} = require("../../codegen/frontend/react/routes/create");
const {
  generateRouteEditCodes
} = require("../../codegen/frontend/react/routes/edit");
const {
  generateRouteViewCodes
} = require("../../codegen/frontend/react/routes/view");

//react components
const {
  generateComponentAllCodes
} = require("../../codegen/frontend/react/components/All");
const {
  generateComponentCreateCodes
} = require("../../codegen/frontend/react/components/Create");
const {
  generateComponentEditCodes
} = require("../../codegen/frontend/react/components/Edit");
const {
  generateComponentViewCodes
} = require("../../codegen/frontend/react/components/View");

//appjs
const { generateAppjsCode } = require("../../codegen/frontend/react/appjs/App");

const { getAppByIdService } = require("../app/app_service");

exports.createCodeService = async (db, params, user) => {
  try {
    let date = new Date();
    const newCode = {
      name: params.name,
      description: params.description,
      username: user.username,
      appId: params.appId,
      objId: params.objId,
      code: params.code,
      folder: params.folder,
      type: params.type,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createCodeService";
    throw err;
  }
};

exports.getCodesService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: codes };
  } catch (err) {
    err.function = "getCodesService";
    throw err;
  }
};

exports.getCodeByIdService = async (db, params, user) => {
  try {
    let code = await db
      .collection("code")
      .doc(params.codeId)
      .get();
    if (!code.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    return { status: 200, response: { ...code.data(), id: code.id } };
  } catch (err) {
    err.function = "getCodeByIdService";
    throw err;
  }
};

exports.editCodeService = async (db, params, user) => {
  try {
    let date = new Date();
    const editCode = {
      name: params.name,
      description: params.description,
      username: user.username,
      appId: params.appId,
      objId: params.objId,
      code: params.code,
      folder: params.folder,
      type: params.type,
      updatedAt: date.toUTCString(),
      updatedAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }

    let code = await db.doc(`/code/${params.codeId}`).get();
    if (!code.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    await code.ref.update(editCode);
    return { status: 200, response: editCode };
  } catch (err) {
    err.function = "editCodeService";
    throw err;
  }
};

exports.deleteCodeService = async (db, params, user) => {
  try {
    const code = db.doc(`/code/${params.codeId}`);
    const doc = await code.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    await code.delete();
    return { status: 200, response: { id: doc.id, message: "code deleted" } };
  } catch (err) {
    err.function = "deleteCodeService";
    throw err;
  }
};

exports.getCodesByObjIdService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .where("objId", "==", params.objId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: codes };
  } catch (err) {
    throw err;
  }
};

exports.getCodesByAppIdService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .where("appId", "==", params.appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return {
      status: 200,
      response: codes
    };
  } catch (err) {
    throw err;
  }
};

//backend
//create service
exports.createCodeGenSerService = createCodeGenSerService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let code = "";
    let codeTest = "";
    let codeValidators = "";
    let objId = params.objId;
    let appId = params.appId;

    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return {
        status: 404,
        response: { error: `objId [${objId}] not found` }
      };
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
    const fields = await getFieldsByObj(db, objId);
    code = generateServiceCode(smallName, bigName, fields);
    const app = await getAppByIdService(db, { appId: appId }, user);
    const databaseURL = app.response.databaseURL;
    codeTest = generateServiceTestCode(smallName, bigName, fields, databaseURL);
    codeValidators = generateValidatorCode(smallName, bigName, fields);
    const newCodeService = {
      name: `${smallName}_service.js`,
      description: `${bigName} Service Code`,
      username: user.username,
      type: "service",
      code: code,
      folder: `functions/handlers/${smallName}/`,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeServiceTest = {
      ...newCodeService,
      name: `${smallName}_service_tests.js`,
      description: `${bigName} Service Code Tests`,
      type: "test",
      code: codeTest,
      folder: `functions/handlers/${smallName}/tests/`
    };
    const newCodeValidator = {
      ...newCodeService,
      name: `${smallName}_validators.js`,
      description: `${bigName} Service Validators`,
      type: "validator",
      code: codeValidators,
      folder: `functions/handlers/${smallName}/`
    };

    let codeServiceResp = newCodeService;
    let codeService = await db.collection("code").add(newCodeService);
    codeServiceResp.id = codeService.id;
    let codeServiceTestResp = newCodeServiceTest;
    let codeServiceTest = await db.collection("code").add(newCodeServiceTest);
    codeServiceTestResp.id = codeServiceTest.id;
    let codeValidatorResp = newCodeValidator;
    let codeValidator = await db.collection("code").add(newCodeValidator);
    codeValidatorResp.id = codeValidator.id;
    let resp = [codeServiceResp, codeServiceTestResp, codeValidatorResp];
    return { status: 200, response: resp };
  } catch (err) {
    throw err;
  }
};
//create controller
exports.createCodeGenConService = createCodeGenConService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let code = "";
    let codeTest = "";
    let objId = params.objId;
    let appId = params.appId;

    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return {
        status: 404,
        response: {
          error: `objId [${objId}] not found`
        }
      };
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
    const fields = await getFieldsByObj(db, objId);
    code = generateControllerCode(smallName, bigName, fields);
    const app = await getAppByIdService(
      db,
      {
        appId: appId
      },
      user
    );
    const apiUrl = app.response.apiUrl;
    codeTest = generateControllerTestCode(smallName, bigName, fields, apiUrl);
    const newCodeController = {
      name: `${smallName}_controller.js`,
      description: `${bigName} Controller Code`,
      username: user.username,
      type: "controller",
      code: code,
      folder: `functions/handlers/${smallName}/`,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeControllerTest = {
      ...newCodeController,
      name: `${smallName}_controller_tests.js`,
      description: `${bigName} Controller Code Tests`,
      type: "test",
      code: codeTest,
      folder: `functions/handlers/${smallName}/tests/`
    };
    let codeControllerResp = newCodeController;
    let codeController = await db.collection("code").add(newCodeController);
    codeControllerResp.id = codeController.id;
    let codeControllerTestResp = newCodeControllerTest;
    let codeControllerTest = await db
      .collection("code")
      .add(newCodeControllerTest);
    codeControllerTestResp.id = codeControllerTest.id;
    let resp = [codeControllerResp, codeControllerTestResp];
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//create route
exports.createCodeGenRouteService = createCodeGenRouteService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let code = "";
    let appId = params.appId;
    //if (appId === '' || appId === undefined || appId === null){
    //  throw('missing appId');
    //}
    const objectNames = await getObjectsByApp(db, appId);
    code = generateRoutesCode(objectNames);
    const newCodeRoute = {
      name: `index.js`,
      description: `Route Code`,
      username: user.username,
      type: "route",
      code: code,
      folder: "functions/",
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let routeCodeObj = await db.collection("code").add(newCodeRoute);
    let codeRes = newCodeRoute;
    codeRes.id = routeCodeObj.id;
    return {
      status: 200,
      response: codeRes
    };
  } catch (err) {
    throw err;
  }
};
//frontend
//reducers
exports.createCodeGenReducerService = createCodeGenReducerService = async (
  db,
  params,
  user
) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    //if (appId === '' || appId === undefined || appId === null){
    //  throw('missing appId');
    //}
    const objectNames = await getObjectsByApp(db, appId);
    const reducerCodes = generateReducersCodes(objectNames);
    reducerCodes.forEach(async reducerCode => {
      const newCodeReducer = {
        name: `${reducerCode.name}Reducer.js`,
        description: `object reducer`,
        username: user.username,
        type: "reducer",
        code: reducerCode.code,
        folder: "src/redux/reducers/",
        appId: appId,
        objId: "",
        createdAt: date.toUTCString(),
        createdAtTimestamp: date.getTime()
      };

      let reducerCodeObj = await db.collection("code").add(newCodeReducer);
      let codeRes = newCodeReducer;
      codeRes.id = reducerCodeObj.id;
      resp.push(codeRes);
    });

    //store
    const storeCode = generateStoreCodes(objectNames);
    const newCodeStore = {
      name: `store.js`,
      description: `redux store`,
      username: user.username,
      type: "store",
      code: storeCode,
      folder: "src/redux/",
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let storeCodeObj = await db.collection("code").add(newCodeStore);
    let codeResStore = newCodeStore;
    codeResStore.id = storeCodeObj.id;
    resp.push(codeResStore);

    //type
    const typeCode = generateTypeCodes(objectNames);
    const newCodeType = {
      name: `type.js`,
      description: `redux types`,
      username: user.username,
      type: "type",
      code: typeCode,
      folder: "src/redux/",
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let typeCodeObj = await db.collection("code").add(newCodeType);
    let codeResType = newCodeType;
    codeResType.id = typeCodeObj.id;
    resp.push(codeResType);

    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//actions
exports.createCodeGenActionService = createCodeGenActionService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let resp = [];

    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const actionCodes = generateActionsCodes(objectNames);
    for (let i = 0; i < actionCodes.length; i++) {
      const actionCode = actionCodes[i];
      const newCodeActions = {
        name: `${actionCode.name}Actions.js`,
        description: `object actions`,
        username: user.username,
        type: "actions",
        code: actionCode.code,
        folder: "src/redux/actions/",
        appId: appId,
        objId: "",
        createdAt: date.toUTCString(),
        createdAtTimestamp: date.getTime()
      };
      let actionCodeObj = await db.collection("code").add(newCodeActions);
      let codeRes = newCodeActions;
      codeRes.id = actionCodeObj.id;
      resp.push(codeRes);
    }
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//routes
exports.createCodeGenReactRouteService = createCodeGenReactRouteService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let resp = [];
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const objectData = await getObjectsByAppReturnData(db, appId);
    const getAllPages = generateRouteAllCodes(objectNames);
    const getCreatePages = generateRouteCreateCodes(objectNames);
    const getViewPages = generateRouteViewCodes(objectNames);
    for (let i = 0; i < getAllPages.length; i++) {
      let page = getAllPages[i];
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}All.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    for (let i = 0; i < getCreatePages.length; i++) {
      let page = getCreatePages[i];
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}Create.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    let editData = [];
    for (var i = 0; i < objectData.length; i++) {
      const obj = objectData[i];
      const fields = await getFieldsByObj(db, obj.id);
      editData.push({
        name: obj.name,
        fields: fields
      });
    }
    const getEditPages = generateRouteEditCodes(editData);
    for (let i = 0; i < getEditPages.length; i++) {
      let page = getEditPages[i];
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}Edit.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    for (let i = 0; i < getViewPages.length; i++) {
      let page = getViewPages[i];
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}View.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//components
exports.createCodeGenComponentService = createCodeGenComponentService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let resp = [];
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const objectData = await getObjectsByAppReturnData(db, appId);

    const allComps = generateComponentAllCodes(objectNames);
    for (let i = 0; i < allComps.length; i++) {
      let page = allComps[i];
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `All${bigName}.js`,
        "object actions",
        "components",
        page.code,
        `src/components/app/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    let objData = [];
    for (var i = 0; i < objectData.length; i++) {
      const obj = objectData[i];
      const fields = await getFieldsByObj(db, obj.id);
      objData.push({
        name: obj.name,
        fields: fields
      });
    }
    const createComps = generateComponentCreateCodes(objData);
    for (let i = 0; i < createComps.length; i++) {
      let page = createComps[i];
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `Create${bigName}.js`,
        "object actions",
        "actions",
        page.code,
        `src/components/app/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    const editComps = generateComponentEditCodes(objData);
    for (let i = 0; i < editComps.length; i++) {
      let page = editComps[i];
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `Edit${bigName}.js`,
        "object actions",
        "actions",
        page.code,
        `src/components/app/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    const allViews = generateComponentViewCodes(objData);
    for (let i = 0; i < allViews.length; i++) {
      let page = allViews[i];
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `View${bigName}.js`,
        "object actions",
        "components",
        page.code,
        `src/components/app/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    }
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//appjs
exports.createCodeAppjsService = createCodeAppjsService = async (
  db,
  params,
  user
) => {
  try {
    let date = new Date();
    let resp = [];
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const appData = await getAppById(db, appId);
    const appCode = generateAppjsCode(objectNames, appData.apiUrl);
    let codeRes = await createCodeObj(
      db,
      date,
      `App.js`,
      "appjs",
      "appjs",
      appCode,
      `src/`,
      appId,
      user
    );
    resp.push(codeRes);
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};
//deleteCodesAll
//deleteCodesByApp
exports.deleteCodesByAppService = async (db, params, user) => {
  try {
    const appId = params.appId;
    let allCodes = await db
      .collection("code")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    allCodes.forEach(async doc => {
      doc.ref.delete();
    });
    return { status: 200, response: { message: "codes deleted" } };
  } catch (err) {
    throw err;
  }
};
//createCodesAll
//createCodesByApp
exports.createCodesByAppService = async (db, params, user) => {
  try {
    let codes = [];
    const appId = params.appId;
    //backend
    const route = await createCodeGenRouteService(db, params, user);
    codes.push(route.response);
    const objects = await getObjectsByAppReturnData(db, appId);
    //use for i loop instead of forEach for async
    for (var i = 0; i < objects.length; i++) {
      let obj = objects[i];
      const service = await createCodeGenSerService(
        db,
        { objId: obj.id, appId: "" },
        user
      );
      codes = codes.concat(service.response);
      const controller = await createCodeGenConService(
        db,
        { objId: obj.id, appId: "" },
        user
      );
      codes = codes.concat(controller.response);
    }

    //frontend
    const reducer = await createCodeGenReducerService(db, params, user);
    codes = codes.concat(reducer.response);
    const actions = await createCodeGenActionService(db, params, user);
    codes = codes.concat(actions.response);
    const reactRoute = await createCodeGenReactRouteService(db, params, user);
    codes = codes.concat(reactRoute.response);
    const component = await createCodeGenComponentService(db, params, user);
    codes = codes.concat(component.response);
    const appjs = await createCodeAppjsService(db, params, user);
    codes = codes.concat(appjs.response);
    return {
      status: 200,
      response: codes
    };
  } catch (err) {
    throw err;
  }
};
