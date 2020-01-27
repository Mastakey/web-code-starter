const { generateActionsCodes } = require("../actions");

let codes = generateActionsCodes(["code", "field", "obj", "app"]);
let code = generateActionsCodes(["app"]);
console.log(code[0].code);
