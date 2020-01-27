const { routeCode } = require("./routes_code");

exports.generateRoutesCode = objects => {
  const headersStr = getHeadersStr(objects);
  const routesStr = getRoutesStr(objects);
  const code = routeCode(headersStr, routesStr);
  return code;
};

let getHeadersStr = objects => {
  let headerStr = "";
  objects.forEach(object => {
    headerStr += getHeaderStr(object);
  });
  return headerStr;
};

let getHeaderStr = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `const {
  create${bigName},
  get${bigName}s,
  get${bigName}ById,
  edit${bigName},
  delete${bigName}
} = require("./handlers/${smallName}/${smallName}_controller");

`;
};

let getRoutesStr = objects => {
  let routeStr = "";
  objects.forEach(object => {
    routeStr += getRouteStr(object);
  });
  return routeStr;
};

let getRouteStr = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `//${bigName} routes
app.post("/${smallName}", FBAuth, create${bigName});
app.get("/${smallName}", FBAuth, get${bigName}s);
app.get("/${smallName}/:${smallName}Id", FBAuth, get${bigName}ById);
app.put("/${smallName}/:${smallName}Id", FBAuth, edit${bigName});
app.delete("/${smallName}/:${smallName}Id", FBAuth, delete${bigName});
  
`;
};
