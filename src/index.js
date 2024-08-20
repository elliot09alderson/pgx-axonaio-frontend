import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./index.css";

import App from "./App";
// import reportWebVitals from './reportWebVitals'
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

// import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={2000}
    >
      <App />
    </SnackbarProvider>
  </Provider>
);

// reportWebVitals()
