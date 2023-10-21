import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useToken } from "../utils/contexts/token";

export default function NavbarComponent() {
  const [changeColor, setChangeColor] = useState(false);
  const { token, changeToken } = useToken();
  const navigate = useNavigate();

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();

    window.addEventListener("scroll", changeBackgroundColor);
  });

  function handleLogout() {
    changeToken();
    // toast.success("Successfully logout");
  }

  return (
    <div>
      <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
        <Container>
          <Navbar.Brand href="#home" className="fs-3 fw-bold">
            Travelo.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              <div className="nav-link">
                <NavLink to="/">Home</NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/destination">Destinasi</NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/testimonial">Testimonial</NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/history">History</NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/faq">FAQ</NavLink>
              </div>
              <div className="nav-link">
                <NavLink to="/syarat">Syarat & Ketentuan</NavLink>
              </div>
            </Nav>

            <div className="text-center">
              {token === "" ? (
                <Link to="/login">
                  <button className="btn btn-success rounded-1">Login</button>
                </Link>
              ) : (
                <button
                  className="btn btn-danger rounded-1"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
