import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Row, Col } from "react-bootstrap";
import { Loading } from "../../components/loading";
import "../../styles/history/history.css";

import TablePagination from "../../components/table/pagination";
import Table from "../../components/table/index";

export default function HistoryPembayaran() {
  const [historyPembayaran, setHistoryPembayaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyPerPage, setHistoryPerPage] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      const savedTransactions =
        JSON.parse(localStorage.getItem("transactions")) || [];
      setHistoryPembayaran(savedTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const indexOfLastHistory = currentPage * historyPerPage;
  const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
  const currentHistory = historyPembayaran.slice(
    indexOfFirstHistory,
    indexOfLastHistory
  );

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="history-page">
        <div className="history">
          <Container>
            <Row>
              <Col>
                <h2 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-0.8s mb-5">
                  History Pembayaran
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="table-page">
                  {isLoading ? (
                    <Loading />
                  ) : historyPembayaran.length > 0 ? (
                    <div>
                      <div className="table-responsive">
                        <Table
                          data={currentHistory}
                          currentPage={currentPage}
                          historyPerPage={historyPerPage}
                        />
                      </div>
                      <div>
                        <TablePagination
                          currentPage={currentPage}
                          pageCount={Math.ceil(
                            historyPembayaran.length / historyPerPage
                          )}
                          onPageChange={onPageChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="no-history">
                      Tidak ada history pembayaran yang tersedia.
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}
