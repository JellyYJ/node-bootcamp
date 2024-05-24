import { server as hostUrl } from "../config";
// import { deployedServer as hostUrl } from "../config";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

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
