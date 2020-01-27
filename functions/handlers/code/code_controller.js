const { db } = require("../../util/admin");
const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService,
  getCodesByObjIdService,
  getCodesByAppIdService,
  createCodeGenSerService,
  createCodeGenConService,
  createCodeGenRouteService,
  createCodeGenReducerService,
  createCodeGenActionService,
  createCodeGenReactRouteService,
  createCodeGenComponentService,
  createCodeAppjsService,
  deleteCodesByAppService,
  createCodesByAppService
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

exports.getCodesByObjId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId
    };
    let resp = await getCodesByObjIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on getCodesByObjId"
    });
  }
};

exports.getCodesByAppId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await getCodesByAppIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on getCodesByAppId"
    });
  }
};

exports.createCodeGenSer = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId,
      appId: ""
    };
    let resp = await createCodeGenSerService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenSer"
    });
  }
};

exports.createCodeGenCon = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId,
      appId: ""
    };
    let resp = await createCodeGenConService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenCon"
    });
  }
};

exports.createCodeGenRoute = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeGenRouteService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenRoute"
    });
  }
};

exports.createCodeGenReducer = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeGenReducerService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenReducer"
    });
  }
};

exports.createCodeGenAction = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeGenActionService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenAction"
    });
  }
};

exports.createCodeGenReactRoute = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeGenReactRouteService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenReactRoute"
    });
  }
};

exports.createCodeGenComponent = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeGenComponentService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeGenComponent"
    });
  }
};

exports.createCodeAppjs = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodeAppjsService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeAppjs"
    });
  }
};

exports.deleteCodesByApp = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await deleteCodesByAppService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on deleteCodesByApp"
    });
  }
};

exports.createCodesByApp = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createCodesByAppService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodesByApp"
    });
  }
};
