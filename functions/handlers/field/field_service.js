const { validateName } = require("./field_validators");
  
  exports.createFieldService = async (db, params, user) => {
  try {
    let date = new Date();
    const newField = {
      name: params.name,
      description: params.description,
      username: user.username,
      type: params.type,
    objId: params.objId,
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
    let field = await db.collection("field").add(newField);
    let resp = newField;
    resp.id = field.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "createFieldService";
    throw err;
  }
};

exports.getFieldsService = async (db, params, user) => {
  try {
    let allFields = await db
      .collection("field")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let fields = [];
    allFields.forEach(doc => {
      fields.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: fields };
  } catch (err) {
    err.function = "getFieldsService";
    throw err;
  }
};

exports.getFieldByIdService = async (db, params, user) => {
  try {
    let field = await db
      .collection("field")
      .doc(params.fieldId)
      .get();
    if (!field.exists) {
      return { status: 404, response: { error: "field not found" } };
    }
    return { status: 200, response: { ...field.data(), id: field.id } };
  } catch (err) {
    err.function = "getFieldByIdService";
    throw err;
  }
};

exports.getFieldsByObjIdService = async (db, params, user) => {
  try {
    const objId = params.objId;
    let allFields = await db
      .collection("field")
      .where("objId", "==", objId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let fields = [];
    allFields.forEach(doc => {
      fields.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: fields };
  } catch (err) {
    err.function = "getFieldByObjIdService";
    throw err;
  }
};

exports.editFieldService = async (db, params, user) => {
  try {
    let date = new Date();
    const editField = {
      name: params.name,
      description: params.description,
      username: user.username,
      type: params.type,
    objId: params.objId,
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
  
    let field = await db.doc(`/field/${params.fieldId}`).get();
    if (!field.exists) {
      return { status: 404, response: { error: "field not found" } };
    }
    await field.ref.update(editField);
    return { status: 200, response: editField };
  } catch (err) {
    err.function = "editFieldService";
    throw err;
  }
};

exports.deleteFieldService = async (db, params, user) => {
  try {
    const field = db.doc(`/field/${params.fieldId}`);
    const doc = await field.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "field not found" } };
    }
    await field.delete();
    return { status: 200, response: { id: doc.id, message: "field deleted" } };
  } catch (err) {
    err.function = "deleteFieldService";
    throw err;
  }
};