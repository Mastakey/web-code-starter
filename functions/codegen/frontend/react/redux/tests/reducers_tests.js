const { generateReducersCodes } = require("../reducers");

let codes = generateReducersCodes(["code", "field", "obj", "app"]);
let code = generateReducersCodes(["app"]);
console.log(code[0].code);
