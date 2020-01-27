const { validateName, validateAppId } = require("./obj_validators");

exports.createObjService = async (db, params, user) => {
  try {
    let date = new Date();
    const newObj = {
      name: params.name,
      description: params.description,
      username: user.username,
      appId: params.appId,
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
    //Id
    const appIdValidation = validateAppId(params.appId);
    if (!appIdValidation.valid) {
      validationErrors.push(appIdValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }
    let obj = await db.collection("obj").add(newObj);
    let resp = newObj;
    resp.id = obj.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createObjService";
    throw err;
  }
};

exports.getObjsService = async (db, params, user) => {
  try {
    let allObjs = await db
      .collection("obj")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let objs = [];
    allObjs.forEach(doc => {
      objs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: objs };
  } catch (err) {
    err.function = "getObjsService";
    throw err;
  }
};

exports.getObjByIdService = async (db, params, user) => {
  try {
    let obj = await db
      .collection("obj")
      .doc(params.objId)
      .get();
    if (!obj.exists) {
      return { status: 404, response: { error: "obj not found" } };
    }
    return { status: 200, response: { ...obj.data(), id: obj.id } };
  } catch (err) {
    err.function = "getObjByIdService";
    throw err;
  }
};

exports.getObjsByAppIdService = async (db, params, user) => {
  try {
    const appId = params.appId;
    let allObjs = await db
      .collection("obj")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let objs = [];
    allObjs.forEach(doc => {
      objs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: objs };
  } catch (err) {
    err.function = "getObjByAppIdService";
    throw err;
  }
};

exports.editObjService = async (db, params, user) => {
  try {
    let date = new Date();
    const editObj = {
      name: params.name,
      description: params.description,
      username: user.username,
      appId: params.appId,
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

    let obj = await db.doc(`/obj/${params.objId}`).get();
    if (!obj.exists) {
      return { status: 404, response: { error: "obj not found" } };
    }
    await obj.ref.update(editObj);
    return { status: 200, response: editObj };
  } catch (err) {
    err.function = "editObjService";
    throw err;
  }
};

exports.deleteObjService = async (db, params, user) => {
  try {
    const obj = db.doc(`/obj/${params.objId}`);
    const doc = await obj.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "obj not found" } };
    }
    await obj.delete();
    return { status: 200, response: { id: doc.id, message: "obj deleted" } };
  } catch (err) {
    err.function = "deleteObjService";
    throw err;
  }
};
