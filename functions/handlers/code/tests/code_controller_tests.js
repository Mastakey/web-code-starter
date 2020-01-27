const axios = require("axios");

let apiUrl = "https://us-central1-web-code-starter.cloudfunctions.net/api";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let createCode = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    let codeRes = await axios.post(
      apiUrl + "/code",
      {
        name: "new Code 1",
        description: "just a new code",
        appId: "appId value",
        objId: "objId value",
        code: "code value",
        folder: "folder value",
        type: "type value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getCodes = async function(headers) {
  try {
    let codeRes = await axios.get(apiUrl + "/code", { headers: headers });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getCodeById = async function(headers, id) {
  try {
    let codeRes = await axios.get(apiUrl + "/code/" + id, {
      headers: headers
    });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editCode = async function(headers, id) {
  try {
    let codeRes = await axios.put(
      apiUrl + "/code/" + id,
      {
        name: "new Code 2",
        description: "just a new code edited",
        appId: "appId value",
        objId: "objId value",
        code: "code value",
        folder: "folder value",
        type: "type value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteCode = async function(headers, id) {
  try {
    let codeRes = await axios.delete(apiUrl + "/code/" + id, {
      headers: headers
    });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

// app.post("/obj/:objId/code/service", FBAuth, createCodeGenSer);
// app.post("/obj/:objId/code/controller", FBAuth, createCodeGenCon);
// app.post("/app/:appId/code/route", FBAuth, createCodeGenRoute);
// app.post("/app/:appId/code/reducer", FBAuth, createCodeGenReducer);
// app.post("/app/:appId/code/actions", FBAuth, createCodeGenAction);
// app.post("/app/:appId/code/reactroutes", FBAuth, createCodeGenReactRoute);
// app.post("/app/:appId/code/component", FBAuth, createCodeGenComponent);
// app.post("/app/:appId/code/appjs", FBAuth, createCodeAppjs);
// app.delete("/app/:appId/code", FBAuth, deleteCodesByApp);
// app.post("/app/:appId/code", FBAuth, createCodesByApp);

let createCodeGenSerTest = async function(headers, objId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/obj/" + objId + "/code/service",
      {
        appId: "",
        objId: objId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenConTest = async function(headers, objId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/obj/" + objId + "/code/controller",
      {
        appId: "",
        objId: objId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenRouteTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/route",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenReducerTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/reducer",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenActionTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/actions",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenReactRouteTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/reactroutes",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeGenComponentTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/component",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeAppjsTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code/appjs",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteCodesByAppTest = async function(headers, appId) {
  try {
    let codeRes = await axios.delete(apiUrl + "/app/" + appId + "/code", {
      headers: headers
    });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodesByAppTest = async function(headers, appId) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/app/" + appId + "/code",
      {
        appId: "",
        appId: appId,
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Code Run");
  let id = await createCode(headers);
  let appId = "4jOfLfzb0vUIptM0mBo1";
  console.log("Get Codes Run");
  await getCodes(headers);
  console.log("Get Code by Id Run");
  await getCodeById(headers, id);
  console.log("Edit Code Run");
  await editCode(headers, id);
  console.log("Delete Code Run");
  await deleteCode(headers, id);
  console.log("Delete Code by App Run");
  await deleteCodesByAppTest(headers, appId);
  // console.log("Create Code Service Run");
  // await createCodeGenSerTest(headers, "JIhznYzLPseaFV7FmxVC");
  // console.log("Create Code Controller Run");
  // await createCodeGenConTest(headers, "JIhznYzLPseaFV7FmxVC");
  // console.log("Create Code Route Run");
  // await createCodeGenRouteTest(headers, appId);
  // console.log("Create Code Reducer Run");
  // await createCodeGenReducerTest(headers, appId);
  // console.log("Create Code Action Run");
  // await createCodeGenActionTest(headers, appId);
  // console.log("Create Code React Route Run");
  // await createCodeGenReactRouteTest(headers, appId);
  // console.log("Create Code Component Run");
  // await createCodeGenComponentTest(headers, appId);
  // console.log("Create Code Appjs Run");
  // await createCodeAppjsTest(headers, appId);
  console.log("Create Code by App Run");
  await createCodesByAppTest(headers, appId);
};

run();
