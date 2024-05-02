import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Overview from "./pages/tour/Overview";
import Account from "./pages/user/Account";
import TourDetails from "./pages/tour/TourDetails";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to="overview"></Navigate>}
            />
            <Route element={<Overview />} path="overview" />
            <Route element={<Account />} path="me" />
            <Route element={<TourDetails />} path="tours/:tourId" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
