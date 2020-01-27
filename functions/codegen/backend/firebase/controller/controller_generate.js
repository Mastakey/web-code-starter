const { getFieldParams } = require("../util");
const { controllerCode, controllerTestCode } = require("./controller_code");
exports.generateControllerCode = (smallName, bigName) => {
  const code = controllerCode(smallName, bigName);
  return code;
};

exports.generateControllerTestCode = (smallName, bigName, fields, apiUrl) => {
  const fieldParams = getFieldParams(fields, {
    prefix: "",
    tabLevel: 2,
    generateValues: true
  });
  const code = controllerTestCode(smallName, bigName, fieldParams, apiUrl);
  return code;
};
