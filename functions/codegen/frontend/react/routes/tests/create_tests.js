const { generateRouteCreateCodes } = require("../create");

let codes = generateRouteCreateCodes(["code", "field", "obj", "app"]);
let code = generateRouteCreateCodes(["app"]);
console.log(code[0].code);
