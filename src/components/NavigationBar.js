import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../auth";

const routes = ["Home", "Leaderboard", "Add"];
const icons = ["fa-home", "fa-poll", "fa-plus"];

function NavigationBar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    switch (route) {
      case "Home":
        navigate("/");
        break;
      case "Leaderboard":
        navigate("/leaderboard");
        break;
      case "Add":
        navigate("/add");
        break;
    }
  };

  return (
    <Navbar className="nav" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>Employee Polls</Navbar.Brand>
        <Nav className="me-auto nav-icons">
          {routes.map((route, i) => (
            <Nav.Link
              data-testid={`nav-${route}`}
              key={i}
              onClick={() => handleNavigate(route)}
            >
              <i className={`fa fa-solid ${icons[i]}`}></i>
              <br />
              <span>{route}</span>
            </Nav.Link>
          ))}
        </Nav>
        {user && (
          <Nav>
            <NavDropdown
              data-testid="avatar-dropdown"
              title={
                <>
                  <img src={user.avatarURL} className="avatar" />
                  {user.id}
                </>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
