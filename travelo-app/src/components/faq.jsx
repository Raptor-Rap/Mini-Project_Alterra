import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { getFaq } from "../utils/apis/faq/api";
import { Loading } from "./loading";

export default function FaqComponent(props) {
  const { children, height } = props;
  const [faq, setFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getFaq();
      setFaq(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <div className="faq">
      <Container className={height}>
        <Row>
          <Col>
            <h2 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
              Pertanyaan yang sering di tanyakan
            </h2>
          </Col>
        </Row>
        {isLoading ? (
          <Loading />
        ) : (
          <Row className="row-cols-lg-2 row-cols-1 g-4 pt-5">
            {faq.map((data) => {
              return (
                <Col key={data.id}>
                  <Accordion className="shadow-sm">
                    <Accordion.Item eventKey={data.eventKey}>
                      <Accordion.Header>{data.title}</Accordion.Header>
                      <Accordion.Body>{data.description}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              );
            })}
          </Row>
        )}
        {children}
      </Container>
    </div>
  );
}
