const { validateName } = require("./code_validators");
  
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