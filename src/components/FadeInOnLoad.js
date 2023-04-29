import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Dashboard.css";
import Fade from "react-bootstrap/Fade";

function FadeInOnLoad({ loader, loading, children }) {
  const [show, setShow] = useState(!loading);

  useEffect(() => {
    if (!loading) {
      setShow(true);
    }
  }, [loading]);

  const loaderComponent =
    loader !== undefined ? (
      loader
    ) : (
      <Spinner className="spinner" animation="border" variant="dark" />
    );

  return <>{loading ? loaderComponent : <Fade in={show}>{children}</Fade>}</>;
}

export default FadeInOnLoad;
