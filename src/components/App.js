import { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { handleInitialData } from "../actions/shared";
import LogInPage from "./LogInPage";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import AddPollPage from "./AddPollPage";
import { AuthRoute } from "./AuthRoute";
import NotFoundPage from "./NotFoundPage";

App.propTypes = {
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool,
};

function App({ dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" exact element={<LogInPage />} />
        <Route
          path="/"
          exact
          element={
            <AuthRoute path="/">
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <AuthRoute path="/leaderboard">
              <Leaderboard />
            </AuthRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <AuthRoute path="/add">
              <AddPollPage />
            </AuthRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default connect()(App);
