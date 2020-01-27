const { generateRoutesCode } = require("../routes_generate");

function testRoutes() {
  let code = generateRoutesCode(["code", "field", "obj", "app"]);
  console.log(code);
}

testRoutes();
