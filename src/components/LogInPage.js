import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./LogInPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../auth";

const userIds = ["sarahedo", "tylermcginnis", "mtsamis", "zoshikanlu"];
const passwords = ["password123", "abc321", "xyz123", "pass246"];
const avatars = {
  sarahedo: "https://i.pravatar.cc/512?img=31",
  tylermcginnis: "https://ui.dev/would-you-rather/tyler.jpg",
  mtsamis: "https://i.pravatar.cc/512?img=54",
  zoshikanlu: "https://i.pravatar.cc/512?img=16",
};

function LogInPage() {
  const [userid, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [showError, setShowError] = useState(false);

  const { state: navState } = useLocation();
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/" />; // if already logged in, redirect
  }

  const authenticate = (userid, pass) => {
    return (
      userIds.includes(userid) &&
      userIds.indexOf(userid) === passwords.indexOf(pass)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.length > 2 && target[1] && target[2]) {
      const [submitUser, submitPass] = [target[1].value, target[2].value];
      const success = authenticate(submitUser, submitPass);
      if (success) {
        login(
          {
            id: submitUser,
            avatarURL: avatars[submitUser],
          },
          navState?.path
        );
      } else {
        setShowError(true);
      }
    }
  };

  const handleSelect = (e) => {
    if (e.target.value === "Select user") {
      setUserId("");
      setPass("");
    } else {
      const idx = e.target.value;
      setUserId(userIds[idx]);
      setPass(passwords[idx]);
      setShowError(false);
    }
  };

  const handleChangeUsername = (e) => {
    setUserId(e.target.value);
    setShowError(false);
  };

  const handleChangePassword = (e) => {
    setPass(e.target.value);
    setShowError(false);
  };

  return (
    <div className="form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-header">Employee Polls</h3>
        <div className="select-box">
          <Form.Select className="select-user" onChange={handleSelect}>
            <option>Select user</option>
            {userIds.map((id, idx) => (
              <option key={id} value={idx}>
                {id}
              </option>
            ))}
          </Form.Select>
        </div>
        <Form.Group>
          <Form.Control
            data-testid="username-field"
            className="username"
            type="username"
            placeholder="Username"
            value={userid}
            onChange={handleChangeUsername}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            data-testid="password-field"
            className="password"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={handleChangePassword}
          />
        </Form.Group>
        <Button
          data-testid="login-btn"
          className="submit-btn"
          variant="primary"
          size="lg"
          type="submit"
        >
          Submit
        </Button>
        {showError && (
          <Alert className="error-box" variant="danger">
            Username or password is incorrect. Try again.
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default LogInPage;
