const { generateRouteViewCodes } = require("../view");

let codes = generateRouteViewCodes(["code", "field", "obj", "app"]);
let code = generateRouteViewCodes(["app"]);
console.log(code[0].code);
