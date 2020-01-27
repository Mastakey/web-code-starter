const {generateComponentAllCodes} = require("../All");

let codes = generateComponentAllCodes(["code", "field", "obj", "app"]);
let code = generateComponentAllCodes(["app"]);
console.log(code[0].code);
