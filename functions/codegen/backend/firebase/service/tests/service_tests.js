const {
  generateServiceCode,
  generateServiceTestCode
} = require("../service_generate");

let code = generateServiceCode("app", "App", ["apiUrl", "databaseURL"]);
//console.log(code);
code = generateServiceTestCode(
  "app",
  "App",
  ["apiUrl", "databaseURL"],
  "https://us-central1-web-code-starter.cloudfunctions.net/api"
);
console.log(code);
