import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { getDestinations } from "../../utils/apis/destination/api";
import { getTestimonials } from "../../utils/apis/testimonial/api";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Loading } from "../../components/loading";

import Layout from "../../components/layout";
import FaqComponent from "../../components/faq";

export default function homepage() {
  const navigate = useNavigate();
  const [newDestinations, setDestination] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataDestinations();
    fetchDataTestimonials();
  }, []);

  async function fetchDataDestinations() {
    try {
      const result = await getDestinations();
      const limitedDestinations = result.slice(0, 4);
      setDestination(limitedDestinations);
      setIsLoading(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function fetchDataTestimonials() {
    try {
      const response = await getTestimonials();
      const limitedTestimonials = response.slice(0, 6);
      setTestimonial(limitedTestimonials);
      setIsLoading(false);
    } catch (error) {
      console.error(error.toString());
    }
  }

  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  }

  function toggleExpanded(id) {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  }

  return (
    <Layout>
      <div className="homepage">
        <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
          <Container>
            <Row className="header-box align-items-center pt-lg-5">
              <Col>
                <h1 className="mb-4 animate__animated animate__fadeInUp animate__delay-1s text-center">
                  Jelajahi Indonesia,
                  <br />
                  <span>Temukan Keindahanya</span>
                  <br /> Bersama kami!
                </h1>
                <p className="mb-4 animate__animated animate__fadeInUp animate__delay-1s text-center">
                  Kami adalah panduan terbaik Anda untuk menjelajahi kekayaan
                  Indonesia yang luar biasa.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-success btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s center"
                    onClick={() => navigate("/destination")}
                  >
                    Lihat Destinasi
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <div className="destinasi w-100 min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center fw-bold">Destinasi Terbaru</h1>
                <p className="text-center">
                  Keindahan alam yang belum terjamah oleh keramaian.
                </p>
              </Col>
            </Row>
            <Row>
              {isLoading ? (
                <Loading />
              ) : (
                newDestinations.map((data) => {
                  return (
                    <Col
                      key={data.id}
                      className="shadow rounded"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <img
                        src={data.image}
                        alt="destination"
                        className="w-100 mb-3 rounded-top"
                      />
                      <h5 className="px-3">{data.destination}</h5>
                      <div className="star pb-3 px-3">
                        {renderStars(data.rating)}
                      </div>
                      <Link to={`/destination/${data.id}`}>
                        <p className="px-3 pb-2">Selengkapnya...</p>
                      </Link>
                      <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                        <p className="m-0 text-primary fw-bold">{data.price}</p>
                      </div>
                    </Col>
                  );
                })
              )}
            </Row>
            <Row>
              <Col className="text-center">
                <button
                  className="btn btn-success rounded-5 btn-lg"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  onClick={() => navigate("/destination")}
                >
                  Lihat Semua Destinasi
                  <i className="fa-solid fa-chevron-right ms-1"></i>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="testimonial py-5">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center fw-bold my-5">Testimonial</h1>
              </Col>
            </Row>
            <Row>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  992: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  testimonial.map((data) => {
                    const isExpanded = expanded[data.id] || false;
                    return (
                      <SwiperSlide key={data.id} className="shadow-sm">
                        <div className="people mb-5">
                          <img src={data.image} alt="" />
                          <div>
                            <h5 className="mb-1">{data.name}</h5>
                            <p className="m-0 fw-bold">{data.address}</p>
                          </div>
                        </div>
                        <p className="desc">
                          {isExpanded
                            ? data.testi
                            : data.testi.split(" ").slice(0, 7).join(" ")}
                          {data.testi.split(" ").length > 10 && (
                            <span
                              style={{
                                color: "#0d6efd",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => toggleExpanded(data.id)}
                            >
                              <br />
                              {isExpanded ? "Sembunyikan" : "Selengkapnya..."}
                            </span>
                          )}
                        </p>
                      </SwiperSlide>
                    );
                  })
                )}
              </Swiper>
            </Row>
          </Container>
        </div>
        <FaqComponent />
      </div>
    </Layout>
  );
}
