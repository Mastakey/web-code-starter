exports.generateReducersCodes = objects => {
  let reducers = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getReducer(object);
    reducers.push(code);
  });
  return reducers;
};

let getReducer = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const upperName = smallName.toUpperCase();
  return `//${smallName} reducers
import {
  CREATE_${upperName},
  READ_${upperName}_ALL,
  READ_${upperName},
  UPDATE_${upperName},
  DELETE_${upperName},
  READ_LOADING_${upperName},
  WRITE_LOADING_${upperName},
  SET_${upperName}_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  ${smallName}s: [],
  ${smallName}: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_${upperName}_ALL:
      return {
        ...state,
        readLoading: false,
        ${smallName}s: action.payload,
        error: {}
      };
    case READ_${upperName}:
      return {
        ...state,
        readLoading: false,
        ${smallName}: action.payload,
        error: {}
      };
    case CREATE_${upperName}:
      return {
        ...state,
        writeLoading: false,
        ${smallName}s: [...state.${smallName}s, action.payload],
        error: {}
      };
    case DELETE_${upperName}:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_${upperName}:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_${upperName}:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_${upperName}:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_${upperName}_ERROR:
      return {
        ...state,
        readLoading: false,
        writeLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
`;
};

//let code = getReducers(["todo", "project"]);
//console.log(code);
