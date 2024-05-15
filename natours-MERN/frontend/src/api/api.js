import { server as hostUrl } from "../config";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Tours
export async function getToursData() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/tours");
    const toursData = response.data.data.data;
    // console.log(toursData);
    // console.log("api", response.data); ORIGINAL VERSION
    return toursData;
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tours from server");
  }
}

export async function getTour(tourId) {
  try {
    const response = await axios.get(hostUrl + `/api/v1/tours/${tourId}`);
    // const tour = response;
    if (response.data.status === "success") {
      // console.log(response.data);
      return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tours from server");
  }
}

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
    // localStorage.setItem("token", response.data.token);
    console.log("signupAPI", response);

    if (response.data.status === "success") {
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
}

// User
export async function getLogInUser() {
  try {
    const token = localStorage.getItem("token");
    // console.log("getToken", token);
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + "/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.data.doc;

    return userData;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getUser(userId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const tour = response;
    if (response.data.status === "success") {
      console.log(response);
      // return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

export async function updateMe({ name, email }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "PATCH",
      url: hostUrl + "/api/v1/users/updateMe",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
      },
    });
    if (response.data.status === "success") {
      // console.log(response.data.data.user);
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating your info");
  }
}

export async function updatePassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "PATCH",
      url: hostUrl + "/api/v1/users/updateMyPassword",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (response.data.status === "success") {
      console.log(response);
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating your password");
  }
}

// Bookings
export async function getMyBookings() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users/my-tours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "success") {
      // console.log(response);
      return response.data.data.tours;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

export async function getMyReviews() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users/my-reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "success") {
      // console.log(response);
      return response.data.data.reviews;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

// Stripe
export async function getbookTourSession(tourId) {
  const stripe = await loadStripe(
    "pk_test_51P41PPHt8iuoFvAVLtCPFPs9M0MvqBWJHK6GbOvQhqzQzqNiqV5OxsPSfMhdJyj84yH6i03QGCldbNbLmxfpjRoB00URp8XxEj"
  );

  try {
    const frontendHost = window.location.origin; // Get frontend host dynamically
    // Get Logged in user token
    const token = localStorage.getItem("token");
    // console.log("getToken", token);
    if (!token) {
      console.log("Token not available");
      return null;
    }

    // 1) Get checkout session from API
    const {
      data: { session },
    } = await axios.get(
      hostUrl +
        `/api/v1/bookings/checkout-session/${tourId}?frontendHost=${frontendHost}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.id,
      // sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Error with Stripe");
  }
}
