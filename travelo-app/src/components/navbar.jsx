import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useToken } from "../utils/contexts/token";
import Logo from "../assets/img/travelo.png";

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
    toast.success("Successfully logout");
  }

  return (
    <div>
      <Navbar
        expand="lg"
        className={`${
          changeColor ? "bg-white color-active" : ""
        } burger-button`}
      >
        <Container>
          <Navbar.Brand
            className="fs-3 fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src={Logo}
              alt="Logo Travelo"
              width="40"
              height="40"
              className="me-1"
            />
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
                  <button
                    className="btn btn-success rounded-1"
                    style={{
                      backgroundColor: "#599b5e",
                      borderColor: "#599b5e",
                    }}
                  >
                    Login
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-danger rounded-1"
                  onClick={() => handleLogout()}
                  style={{
                    backgroundColor: "#FF6666",
                    borderColor: "#FF6666",
                  }}
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
