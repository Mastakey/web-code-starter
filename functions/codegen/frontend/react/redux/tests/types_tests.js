const { generateTypeCodes } = require("../types");

let code = generateTypeCodes(["code", "field", "obj", "app"]);
console.log(code);
