import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../../components//faq";

import Layout from "../../components/layout";

export default function syarat() {
  return (
    <Layout>
      <div className="syarat-ketentuan-page">
        <div className="syarat-ketentuan min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="fw-bold text-center mb-2 animate__animated animate__fadeInUp animate__delay-1s">
                  Syarat & Ketentuan
                </h1>
                <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Aturan yang harus diikuti pengguna dalam menggunakan website
                  ini.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">1. Penggunaan Website</h4>
                <p>
                  a. Dengan mengakses dan menggunakan website ini, Anda setuju
                  untuk mematuhi syarat dan ketentuan ini secara penuh dan
                  menyepakati untuk tidak melanggar ketentuan yang berlaku dalam
                  penggunaan website ini.
                  <br />
                  b. Penggunaan website ini hanya diperuntukkan bagi individu
                  yang telah mencapai usia dewasa atau di bawah pengawasan orang
                  dewasa.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">2. Halaman Awal</h4>
                <p>
                  a. Halaman awal website ini adalah pintu gerbang utama untuk
                  mengakses seluruh konten yang tersedia. Pengguna dapat
                  mengakses halaman destinasi, halaman testimoni, dan FAQ
                  melalui halaman awal ini. <br />
                  b. Pengguna diharapkan untuk menggunakan halaman awal ini
                  sebagai titik awal dalam menjelajahi website dan mencari
                  informasi yang relevan. <br />
                  c. Kami berusaha untuk menjaga halaman awal agar tetap
                  informatif dan user-friendly. Namun, perubahan pada tampilan
                  atau struktur halaman awal dapat terjadi tanpa pemberitahuan
                  sebelumnya dalam rangka peningkatan pengalaman pengguna.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">3. Penggunaan Halaman Destinasi</h4>
                <p>
                  a. Pengguna yang sudah login diperbolehkan untuk menggunakan
                  halaman destinasi untuk melihat informasi, menambahkan,
                  mengedit, atau menghapus data terkait destinasi wisata.
                  <br />
                  b. Anda harus memberikan informasi yang akurat dan tidak
                  mengecoh saat menambahkan atau mengedit data destinasi.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">4. Penggunaan Halaman Testimoni</h4>
                <p>
                  a. Anda dapat menambahkan testimoni pengguna tentang
                  pengalaman perjalanan Anda.
                  <br />
                  b. Testimoni yang Anda tambahkan harus berdasarkan pengalaman
                  Anda yang sebenarnya.
                  <br />
                  c. Website berhak untuk menghapus testimoni yang dianggap
                  melanggar pedoman atau tidak relevan.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">5. FAQ (Frequently Asked Questions)</h4>
                <p>
                  a. Anda dapat menggunakan halaman FAQ untuk mencari informasi
                  terkait dengan perjalanan dan penggunaan website.
                  <br />
                  b. FAQ adalah sumber informasi umum dan bukan konsultasi
                  pribadi.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">6. Perubahan Syarat dan Ketentuan</h4>
                <p>
                  a. Website ini berhak untuk mengubah syarat dan ketentuan ini
                  tanpa pemberitahuan sebelumnya. Pastikan untuk secara berkala
                  memeriksa syarat dan ketentuan yang terbaru.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-center">
                  Dengan mengakses dan menggunakan website ini, berarti Anda
                  telah menunjukkan persetujuan terhadap syarat dan ketentuan
                  yang telah ada.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <FaqComponent />
      </div>
    </Layout>
  );
}
