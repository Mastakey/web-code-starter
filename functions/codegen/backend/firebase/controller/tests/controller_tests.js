const {
  generateControllerCode,
  generateControllerTestCode
} = require("../controller_generate");

let code = generateControllerCode("app", "App");
//console.log(code);
code = generateControllerTestCode(
  "app",
  "App",
  ["apiUrl", "databaseURL"],
  "https://us-central1-web-code-starter.cloudfunctions.net/api"
);
console.log(code);
