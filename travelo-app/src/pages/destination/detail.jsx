import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getDetailDestinations } from "../../utils/apis/destination/api";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "../../utils/contexts/token";
import "../../styles/destination/detail.css";

import Layout from "../../components/layout";
import { Loading } from "../../components/loading";

export default function DetailTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();
  const [isLoading, setIsLoading] = useState(true);

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailDestinations(id);
      setDetail(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <Layout>
      <div className="detail-page">
        <Container>
          <Row className="detail shadow-sm">
            {isLoading ? (
              <Loading />
            ) : (
              <Col key={detail.id} data-aos="fade-up" data-aos-duration="1000">
                <div className="card-detail d-flex">
                  <div>
                    <img src={detail.image} alt="Tour Image" />
                  </div>
                  <Container className="text">
                    <div className="row align-items-start">
                      <h2>{detail.destination}</h2>
                      <p className="detail-description animate__animated animate__fadeInUp animate__delay-0.8s">
                        {detail.description}
                      </p>
                    </div>
                    <Row className="price d-flex justify-content-between align-items-center align-items-end">
                      <Col>
                        <p className="animate__animated animate__fadeInUp animate__delay-1s text-primary">
                          {detail.price}
                        </p>
                      </Col>
                      <Col className="col-auto">
                        {token === "" ? (
                          <>
                            <button
                              className="btn btn-success animate__animated animate__fadeInUp animate__delay-1s"
                              onClick={() => navigate("/login")}
                            >
                              Beli Tiket
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-success animate__animated animate__fadeInUp animate__delay-1s"
                              onClick={() =>
                                navigate(
                                  `/destination/${detail.id}/transaction`
                                )
                              }
                            >
                              Beli Tiket
                            </button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
