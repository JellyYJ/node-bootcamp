import { server as hostUrl } from "../config";
// import { deployedServer as hostUrl } from "../config";
import axios from "axios";

// Auth
export async function login({ email, password }) {
  try {
    let response = await axios({
      method: "POST",
      url: hostUrl + "/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    // const data = await response.json();
    // console.log("settoken:", response.data.token);
    localStorage.setItem("token", response.data.token);

    if (response.data.status === "success") {
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No current logged in user");
      return null;
    }

    const response = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.log(err.response);
  }
}

export async function signup({ name, email, password, passwordConfirm }) {
  try {
    let response = await axios({
      method: "POST",
      url: hostUrl + "/api/v1/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log("signupAPI", response);

    if (response.data.status === "success") {
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
}
