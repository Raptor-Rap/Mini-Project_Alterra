import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
import * as z from "zod";

import { Input, Select } from "../../components/input";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Swal from "../../utils/swal";

export const schema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, { message: "Please enter a valid name" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  telepon: z.number().min(1, { message: "Please enter a valid phone number" }),
  paket: z.string().min(1, { message: "Please select a tour package" }),
  pembayaran: z.string().min(1, { message: "Please select a payment method" }),
});

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      telepon: 0,
      paket: "",
      pembayaran: "",
    },
  });

  useEffect(() => {
    const savedTransaction =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransaction);
  }, []);

  const localStorages = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
  };

  function onSubmit(data) {
    const newData = { ...data };
    const dupeArr = [...transactions, newData];
    setTransactions(dupeArr);
    reset();
    localStorages(dupeArr);

    Swal.fire({
      title: "Success",
      text: "Transaction process is complete.",
      icon: "success",
      showCancelButton: false,
    });
  }

  return (
    <Layout>
      <div className="transaction-page">
        <div className="transaction min-vh-100">
          <Container>
            <Row>
              <Col>
                <h2 className="text-center mb-5">Pesan Tiket Anda</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  aria-label="transaction-form"
                >
                  <Input
                    aria-label="input-nama"
                    label="Nama"
                    name="nama"
                    register={register}
                    error={errors.name?.message}
                  />
                  <Input
                    aria-label="input-email"
                    label="Email"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                  />
                  <Input
                    aria-label="input-nomor-telepon"
                    label="Nomor Telepon"
                    name="telepon"
                    type="number"
                    register={register}
                    error={errors.phone?.message}
                  />
                  <Select
                    aria-label="select-paket-wisata"
                    label="Pilih Paket Wisata"
                    name="paket"
                    options={[
                      "Paket Wisata 1",
                      "Paket Wisata 2",
                      "Paket Wisata 3",
                    ]}
                    placeholder="Pilih Paket"
                    register={register}
                    error={errors.package?.message}
                  />
                  <Select
                    aria-label="select-metode-pembayaran"
                    label="Pilih Metode Pembayaran"
                    name="pembayaran"
                    options={["Kartu kredit", "Kartu debit", "Paypal"]}
                    placeholder="Pilih Metode Pembayaran"
                    register={register}
                    error={errors.payment?.message}
                  />
                  <Button
                    aria-label="btn-submit"
                    label="Submit"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}
