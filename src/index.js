import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import rootReducer from "./reducers";
import logger from "./middleware/logger";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./auth";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </Router>
//     </Provider>
//   </React.StrictMode>
// );

root.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
