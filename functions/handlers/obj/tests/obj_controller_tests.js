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

let createObj = async function() {
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
    let objRes = await axios.post(
      apiUrl + "/obj",
      {
        name: "new Obj 1",
        description: "just a new obj",
        appId: "appId value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
    return objRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjs = async function(headers) {
  try {
    let objRes = await axios.get(apiUrl + "/obj", { headers: headers });
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjById = async function(headers, id) {
  try {
    let objRes = await axios.get(apiUrl + "/obj/" + id, {
      headers: headers
    });
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editObj = async function(headers, id) {
  try {
    let objRes = await axios.put(
      apiUrl + "/obj/" + id,
      {
        name: "new Obj 2",
        description: "just a new obj edited",
        appId: "appId value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteObj = async function(headers, id) {
  try {
    let objRes = await axios.delete(apiUrl + "/obj/" + id, {
      headers: headers
    });
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjsByAppId = async function(headers, appId) {
  try {
    let objRes = await axios.get(apiUrl + "/app/" + appId + "/obj", {
      headers: headers
    });
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Obj Run");
  let id = await createObj(headers);
  console.log("Get Objs Run");
  await getObjs(headers);
  console.log("Get Obj by Id Run");
  await getObjById(headers, id);
  let appId = "4jOfLfzb0vUIptM0mBo1";
  console.log("Get Objs by App Id Run");
  await getObjsByAppId(headers, appId);
  console.log("Edit Obj Run");
  await editObj(headers, id);
  console.log("Delete Obj Run");
  await deleteObj(headers, id);
};

run();
