const { db } = require("../../util/admin");
const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService
} = require("./code_service");

exports.createCode = async (req, res) => {
  try {
    let resp = await createCodeService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getCodes = async (req, res) => {
  try {
    let resp = await getCodesService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getCodeById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      codeId: req.params.codeId
    };
    let resp = await getCodeByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editCode = async (req, res) => {
  try {
    const params = {
      ...req.body,
      codeId: req.params.codeId
    };
    let resp = await editCodeService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteCode = async (req, res) => {
  const params = {
    codeId: req.params.codeId
  };
  try {
    let resp = await deleteCodeService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
