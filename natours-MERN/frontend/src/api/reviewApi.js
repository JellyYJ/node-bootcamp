import { server as hostUrl } from "../config";
// import { deployedServer as hostUrl } from "../config";
import axios from "axios";

// Reviews
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

export async function createReview({ rating, review, tourId }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    let response = await axios({
      method: "POST",
      url: hostUrl + `/api/v1/tours/${tourId}/reviews`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        rating,
        review,
      },
    });

    console.log(response);
    if (response.data.status === "success") {
      return response.data.data.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updateReview({ rating, review, reviewId }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    let response = await axios({
      method: "PATCH",
      url: hostUrl + `/api/v1/reviews/${reviewId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        rating,
        review,
      },
    });

    if (response.data.status === "success") {
      // console.log(response.data.data);
      return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteReview(reviewId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    await axios({
      method: "DELETE",
      url: hostUrl + `/api/v1/reviews/${reviewId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
