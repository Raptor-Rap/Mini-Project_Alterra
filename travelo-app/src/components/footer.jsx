import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/img/travelo.png";

export default function FooterComponent() {
  const navigate = useNavigate();

  return (
    <div className="footer py-5">
      <Container>
        <Row className="d-flex justify-content-between row">
          <Col lg="5">
            <h3 className="fw-bold">
              <img
                src={Logo}
                alt="Logo Travelo"
                width="40"
                height="40"
                className="me-1"
              />
              Travelo.
            </h3>
            <p className="desc text-justify">
              Temukan destinasi, testimoni, dan pelajari FAQ serta syarat dan
              ketentuan kami. Sayangnya, kami tidak bisa membantu dengan layanan
              pelanggan, pembayaran, atau jadwal penerbangan. Terimakasih Atas
              Kunjunganya!
            </p>
            <div className="no mb-1 mt-4">
              <Link className="text-decoration-none">
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0">+62 987-1441-9641</p>
              </Link>
            </div>
            <div className="mail">
              <Link className="text-decoration-none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0">you@example.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/destination")}>Destination</p>
            <p onClick={() => navigate("/testimonial")}>Testimonial</p>
            <p onClick={() => navigate("/faq")}>FAQ</p>
            <p onClick={() => navigate("/syarat")}>Syarat & Ketentuan</p>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Berlangganan</h5>
            <div className="subscribes">
              <input type="text" placeholder="Email" />
              <button
                className="btn btn-danger rounded-end rounded-0"
                style={{
                  backgroundColor: "#FF6666",
                  borderColor: "#FF6666",
                }}
              >
                Get!
              </button>
            </div>
            <div className="social mt-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">
              &copy; Copyright {new Date().getFullYear()} by{" "}
              <span className="fw-bold">Rafi Fikri</span>, All Right Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
