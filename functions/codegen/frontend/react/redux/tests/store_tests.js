const { generateStoreCodes } = require("../store");

let code = generateStoreCodes(["code", "field", "obj", "app"]);
console.log(code);
