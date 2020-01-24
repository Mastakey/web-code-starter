const { validateName } = require("./app_validators");
  
  exports.createAppService = async (db, params, user) => {
  try {
    let date = new Date();
    const newApp = {
      name: params.name,
      description: params.description,
      username: user.username,
      apiUrl: params.apiUrl,
    databaseURL: params.databaseURL,
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
    let app = await db.collection("app").add(newApp);
    let resp = newApp;
    resp.id = app.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createAppService";
    throw err;
  }
};

exports.getAppsService = async (db, params, user) => {
  try {
    let allApps = await db
      .collection("app")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let apps = [];
    allApps.forEach(doc => {
      apps.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: apps };
  } catch (err) {
    err.function = "getAppsService";
    throw err;
  }
};

exports.getAppByIdService = async (db, params, user) => {
  try {
    let app = await db
      .collection("app")
      .doc(params.appId)
      .get();
    if (!app.exists) {
      return { status: 404, response: { error: "app not found" } };
    }
    return { status: 200, response: { ...app.data(), id: app.id } };
  } catch (err) {
    err.function = "getAppByIdService";
    throw err;
  }
};

exports.editAppService = async (db, params, user) => {
  try {
    let date = new Date();
    const editApp = {
      name: params.name,
      description: params.description,
      username: user.username,
      apiUrl: params.apiUrl,
    databaseURL: params.databaseURL,
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
  
    let app = await db.doc(`/app/${params.appId}`).get();
    if (!app.exists) {
      return { status: 404, response: { error: "app not found" } };
    }
    await app.ref.update(editApp);
    return { status: 200, response: editApp };
  } catch (err) {
    err.function = "editAppService";
    throw err;
  }
};

exports.deleteAppService = async (db, params, user) => {
  try {
    const app = db.doc(`/app/${params.appId}`);
    const doc = await app.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "app not found" } };
    }
    await app.delete();
    return { status: 200, response: { id: doc.id, message: "app deleted" } };
  } catch (err) {
    err.function = "deleteAppService";
    throw err;
  }
};