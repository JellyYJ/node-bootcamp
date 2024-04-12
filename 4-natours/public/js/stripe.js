/* eslint-disable */
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51P41PPHt8iuoFvAVLtCPFPs9M0MvqBWJHK6GbOvQhqzQzqNiqV5OxsPSfMhdJyj84yH6i03QGCldbNbLmxfpjRoB00URp8XxEj'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    // IF ABOVE DOES NOT WORK TRY FOLLOWING
    // window.location.assign(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
