import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_ISSUER_BASE_URL}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
