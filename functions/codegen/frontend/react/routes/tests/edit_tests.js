const { generateRouteEditCodes } = require("../edit");

let code = generateRouteEditCodes([
  { name: "app", fields: ["apiUrl", "databaseURL"] }
]);
console.log(code[0].code);
