import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./auth/auth.jsx";  // Ensure the folder and file casing matches
import { StoreProvider } from "./context/Store.jsx";
import { ToastContainer } from "react-toastify"; // Assuming ToastContainer is from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"; // Import styles for the Toast

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StoreProvider>
      <StrictMode>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
        />
      </StrictMode>
    </StoreProvider>
  </AuthProvider>
);
