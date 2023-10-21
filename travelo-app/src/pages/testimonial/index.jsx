import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTestimonials } from "../../utils/apis/testimonial/api";
import { useToken } from "../../utils/contexts/token";
import { Loading } from "../../components/loading";

import FaqComponent from "../../components/faq";
import Layout from "../../components/layout";

export default function testimonialPage() {
  const { token } = useToken();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getTestimonials();
      setTestimonial(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <Layout>
      <div className="testimonial-page">
        <div className="testimonial">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
                  Semua Testimonial
                </h1>
                <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Anda dapat membaca dan menambahkan testimoni.
                </p>
              </Col>
            </Row>
            {isLoading ? (
              <Loading />
            ) : (
              <Row className="row-cols-lg-3 row-cols-1">
                {testimonial.map((data) => {
                  return (
                    <Col key={data.id} className="mb-2">
                      <div className="bg shadow-sm">
                        <div className="people mb-3 pt-3">
                          <img src={data.image} alt="" />
                          <div>
                            <h5 className="mb-1">{data.name}</h5>
                            <p className="m-0 fw-bold">{data.address}</p>
                          </div>
                        </div>
                      </div>
                      <p className="desc shadow-sm">{data.testi}</p>
                    </Col>
                  );
                })}
              </Row>
            )}
            <Row>
              <Col className="text-center">
                {token === "" ? (
                  <button
                    className="btn btn-success rounded-5 btn-lg"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    onClick={() => navigate("/login")}
                  >
                    Tambah Testimoni
                    <i className="fa-solid fa-plus ms-1"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-success rounded-5 btn-lg"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    onClick={() => navigate("/testimonial/add")}
                  >
                    Tambah Testimoni
                    <i className="fa-solid fa-plus ms-1"></i>
                  </button>
                )}
              </Col>
            </Row>
          </Container>
        </div>

        <FaqComponent />
      </div>
    </Layout>
  );
}
