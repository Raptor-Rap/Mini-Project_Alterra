import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/history/history.css";
import { Loading } from "../../components/loading";

export default function HistoryPembayaran() {
  const [historyPembayaran, setHistoryPembayaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const savedTransactions =
        JSON.parse(localStorage.getItem("transactions")) || [];
      setHistoryPembayaran(savedTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="history-page">
        <div className="history min-vh-100">
          <Container>
            <Row>
              <Col>
                <h2 className="text-center mb-5">History Pembayaran</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="table-page">
                  {isLoading ? (
                    <Loading />
                  ) : historyPembayaran.length > 0 ? (
                    <table className="table mt-5">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Nama</th>
                          <th>Email</th>
                          <th>Nomor Telepon</th>
                          <th>Paket Wisata</th>
                          <th>Metode Pembayaran</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyPembayaran.map((transaction, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.nama}</td>
                            <td>{transaction.email}</td>
                            <td>{transaction.telepon}</td>
                            <td>{transaction.paket}</td>
                            <td>{transaction.pembayaran}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
