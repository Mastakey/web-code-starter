const { generateComponentEditCodes } = require("../Edit");

let code = generateComponentEditCodes([
  { name: "app", fields: ["apiUrl", "databaseURL"] }
]);
console.log(code[0].code);
