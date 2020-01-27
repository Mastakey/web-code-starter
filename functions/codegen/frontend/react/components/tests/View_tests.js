const { generateComponentViewCodes } = require("../View");

let code = generateComponentViewCodes([
  { name: "app", fields: ["apiUrl", "databaseURL"] }
]);
console.log(code[0].code);
