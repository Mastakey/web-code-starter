const { db } = require("../../util/admin");
const {
  createObjService,
  getObjsService,
  getObjByIdService,
  editObjService,
  deleteObjService
} = require("./obj_service");

exports.createObj = async (req, res) => {
  try {
    let resp = await createObjService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getObjs = async (req, res) => {
  try {
    let resp = await getObjsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getObjById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId
    };
    let resp = await getObjByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editObj = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId
    };
    let resp = await editObjService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteObj = async (req, res) => {
  const params = {
    objId: req.params.objId
  };
  try {
    let resp = await deleteObjService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
