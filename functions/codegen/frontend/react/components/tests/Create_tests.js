const { generateComponentCreateCodes } = require("../Create");

let code = generateComponentCreateCodes([
  { name: "app", fields: ["apiUrl", "databaseURL"] }
]);
console.log(code[0].code);
