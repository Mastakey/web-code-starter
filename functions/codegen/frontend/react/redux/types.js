exports.generateTypeCodes = objects => {
  let code = `//user reducers types
export const SET_AUTH = "SET_AUTH";
export const SET_UNAUTH = "SET_UNAUTH";
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";
export const SIGNUP_USER = "SIGNUP_USER";

// UI reducer types
export const LOADING_UI = "LOADING_UI";
export const STOP_LOADING_UI = "STOP_LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_ERRORS = "SET_ERRORS";
export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

`;
  objects.forEach(object => {
    code += getObjectTypes(object);
    code += "\n\n";
  });
  return code;
};

let getObjectTypes = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const upperName = smallName.toUpperCase();
  return `// ${bigName} reducers
export const CREATE_${upperName} = "CREATE_${upperName}";
export const READ_${upperName}_ALL = "READ_${upperName}_ALL";
export const READ_${upperName} = "READ_${upperName}";
export const UPDATE_${upperName} = "UPDATE_${upperName}";
export const DELETE_${upperName} = "DELETE_${upperName}";
export const WRITE_LOADING_${upperName} = "WRITE_LOADING_${upperName}";
export const READ_LOADING_${upperName} = "READ_LOADING_${upperName}";
export const SET_${upperName}_ERROR = "SET_${upperName}_ERROR";`;
};

//let code = getTypes(["todo", "project"]);
//console.log(code);
