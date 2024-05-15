import React from "react";
import ReactDOM from "react-dom/client";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "./utils/ErrorBoundary";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <App />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
