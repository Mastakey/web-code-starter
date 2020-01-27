const { db } = require("../../util/admin");
const {
  createFieldService,
  getFieldsService,
  getFieldByIdService,
  editFieldService,
  deleteFieldService,
  getFieldsByObjIdService
} = require("./field_service");

exports.createField = async (req, res) => {
  try {
    let resp = await createFieldService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFields = async (req, res) => {
  try {
    let resp = await getFieldsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      fieldId: req.params.fieldId
    };
    let resp = await getFieldByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFieldsByObjId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId
    };
    let resp = await getFieldsByObjIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editField = async (req, res) => {
  try {
    const params = {
      ...req.body,
      fieldId: req.params.fieldId
    };
    let resp = await editFieldService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteField = async (req, res) => {
  const params = {
    fieldId: req.params.fieldId
  };
  try {
    let resp = await deleteFieldService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
