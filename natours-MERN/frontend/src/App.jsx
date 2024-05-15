import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./pages/AppLayout";
import Overview from "./pages/tour/Overview";
import Account from "./pages/user/Account";
import TourDetails from "./pages/tour/TourDetails";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import MyBookings from "./pages/user/MyBookings";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate replace to="overview"></Navigate>}
              />
              <Route element={<Overview />} path="overview" />
              <Route element={<TourDetails />} path="tours/:tourId" />
              <Route element={<Account />} path="me" />
              <Route element={<Login />} path="login" />
              <Route element={<Signup />} path="signup" />
              <Route element={<MyBookings />} path="my-bookings" />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-green-0)",
              color: "var(--color-green-800)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
