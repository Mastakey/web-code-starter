const {generateAppjsCode} = require("./App");

let code = generateAppjsCode(
  ["code", "field", "obj", "app"],
  "https://us-central1-web-code-starter.cloudfunctions.net/api"
);
console.log(code);