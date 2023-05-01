import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useAuth } from "../auth";
import { withRouter } from "../utils/helpers";

AuthRoute.propTypes = {
  qid: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.object,
};

/**
 * @description Redirects the user back to the login page if not logged in. `
 * @param {string} qid - The question id, if the user tried to access a question page
 * @param {string} path - Path to redirect the user to requested page after login
 */
function AuthRoute({ qid, path, children }) {
  const { user } = useAuth();
  const pathToRoute = qid ? `question/${qid}` : path;

  if (!user) {
    return <Navigate to={"/login"} state={{ path: pathToRoute }} />; // not logged in, navigate to login
  }
  return children;
}

const mapStateToProps = ({}, props) => {
  const qid = props?.router?.params?.qid || null;
  return {
    qid,
  };
};

export default withRouter(connect(mapStateToProps)(AuthRoute));
