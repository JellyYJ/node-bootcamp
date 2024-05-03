import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./pages/AppLayout";
import Overview from "./pages/tour/Overview";
import Account from "./pages/user/Account";
import TourDetails from "./pages/tour/TourDetails";
import Login from "./pages/user/Login";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
