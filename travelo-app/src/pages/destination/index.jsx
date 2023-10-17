import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  getDestinations,
  deleteDestination,
  updateDestination,
} from "../../utils/apis/destination/api";
import { useToken } from "../../utils/contexts/token";

import FaqComponent from "../../components/faq";
import Layout from "../../components/layout";
import Swal from "../../utils/swal";

export default function Destinasi() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  const [destinations, setDestination] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDestinations();
      setDestination(result);
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

  async function onSubmitEdit(data) {
    try {
      await updateDestination({ ...data, id: selectedId });
      Swal.fire({
        title: "Success",
        text: "Successfully updated the destination",
        showCancelButton: false,
      });
      setSelectedId("");
      reset();
      fetchData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
    }
  }

  function onClickEdit(data) {
    setSelectedId(data.id);
    setValue("destination", data.destination);
    setValue("image", data.image);
    setValue("description", data.description);
    setValue("price", data.price);

    navigate(`/addDestination/${data.id}`);
  }

  async function onClickDelete(id_destinasi) {
    try {
      await deleteDestination(id_destinasi);
      Swal.fire({
        title: "Success",
        text: "Successfully deleted the destination",
        showCancelButton: false,
      });
      fetchData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        showCancelButton: false,
      });
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
              {destinations.map((data) => {
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
                      <p className="m-0 text-primary fw-bold">{data.price}</p>
                      <div>
                        {token === "" ? null : (
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
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col className="text-center">
                {token === "" ? (
                  <button
                    className="btn btn-success rounded-5 btn-lg"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    onClick={() => navigate("/login")}
                  >
                    Tambah Destinasi
                    <i className="fa-solid fa-plus ms-1"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-success rounded-5 btn-lg"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    onClick={() => navigate("/addDestination")}
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
