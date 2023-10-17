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
  name: z.string().min(1, { message: "Please enter a valid name" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  phone: z.number().min(1, { message: "Please enter a valid phone number" }),
  package: z.string().min(1, { message: "Please select a tour package" }),
  payment: z.string().min(1, { message: "Please select a payment method" }),
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
      phone: 0,
      package: "",
      payment: "",
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
                <h2 className="text-center mb-4">Book Your Tour</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  aria-label="transaction-form"
                >
                  <Input
                    id="input-name"
                    aria-label="input-name"
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                  />
                  <Input
                    id="input-email"
                    aria-label="input-email"
                    label="Email"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                  />
                  <Input
                    id="input-phone-number"
                    aria-label="input-phone-number"
                    label="Phone Number"
                    name="phone"
                    type="number"
                    register={register}
                    error={errors.phone?.message}
                  />
                  <Select
                    id="select-package-tour"
                    aria-label="select-package-tour"
                    label="Select Tour Package"
                    name="package"
                    options={[
                      "Tour Package 1",
                      "Tour Package 2",
                      "Tour Package 3",
                    ]}
                    placeholder="Select Package"
                    register={register}
                    error={errors.package?.message}
                  />
                  <Select
                    id="select-payment-method"
                    aria-label="select-payment-method"
                    label="Select Payment Method"
                    name="payment"
                    options={["Credit Card", "Debit Card", "Paypal"]}
                    placeholder="Select payment method"
                    register={register}
                    error={errors.payment?.message}
                  />
                  <Button
                    id="btn-submit"
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
