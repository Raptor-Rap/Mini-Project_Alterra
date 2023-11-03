import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  getDestinations,
  deleteDestination,
} from "../../utils/apis/destination/api";
import { useToken } from "../../utils/contexts/token";
import { Loading } from "../../components/loading";
import { toast } from "react-toastify";

import FaqComponent from "../../components/faq";
import Layout from "../../components/layout";

export default function Destinasi() {
  const navigate = useNavigate();
  const [destinations, setDestination] = useState([]);
  const { token } = useToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDestinations();
      setDestination(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  }

  function onClickEdit(data) {
    navigate(`/destination/${data.id}/edit`);
  }

  async function onClickDelete(id_destinasi) {
    try {
      await deleteDestination(id_destinasi);
      toast.success("Successfully deleted the destination");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <div className="destinasi-page">
        <div className="destinasi min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Semua Destinasi
                </h1>
                <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Anda dapat menambah, mengedit, dan menghapus serta membaca
                  penjelasan lengkap tentang destinasi wisata.
                </p>
              </Col>
            </Row>
            <Row>
              {isLoading ? (
                <Loading />
              ) : (
                destinations.map((data) => {
                  return (
                    <Col
                      key={data.id}
                      className="shadow rounded"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <img
                        src={data.image}
                        alt="image"
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
                        <p className="m-0 fw-bold">{data.price}</p>
                        <div>
                          {token === "" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="btn btn-outline-primary rounded-1 me-2"
                                onClick={() => onClickEdit(data)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger rounded-1"
                                onClick={() => onClickDelete(data.id)}
                                style={{
                                  backgroundColor: "#FF6666",
                                  borderColor: "#FF6666",
                                }}
                              >
                                Hapus
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                })
              )}
            </Row>
            <Row>
              <Col className="text-center">
                {token === "" ? (
                  <></>
                ) : (
                  <button
                    className="btn btn-success rounded-5 btn-lg"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    onClick={() => navigate("/destination/add")}
                    style={{
                      backgroundColor: "#599b5e",
                      borderColor: "#599b5e",
                    }}
                  >
                    Tambah Destinasi
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
