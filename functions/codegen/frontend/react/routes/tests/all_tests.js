const { generateRouteAllCodes } = require("../all");

let codes = generateRouteAllCodes(["code", "field", "obj", "app"]);
let code = generateRouteAllCodes(["app"]);
console.log(code[0].code);
