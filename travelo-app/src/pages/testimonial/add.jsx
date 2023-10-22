import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import * as z from "zod";

import { Input, TextArea } from "../../components/input";
import Layout from "../../components/layout";
import Button from "../../components/button";
import {
  createTestimonial,
  getTestimonials,
} from "../../utils/apis/testimonial/api";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Please enter a valid name" }),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  address: z.string().min(1, { message: "Please enter a valid address" }),
  testi: z.string().min(1, { message: "Please enter a valid testimoni" }),
});

export default function AddTestimoni() {
  const [testimoni, setTestimoni] = useState([]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getTestimonials();
      setTestimoni(result);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function onSubmit(data) {
    try {
      await createTestimonial(data);
      toast.success("Successfully added new testimoni");
      reset();
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <div className="add-testimonial">
        <div className="testimonial min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-0.8s">
                  Masukan Testimoni
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  aria-label="destination-form"
                >
                  <Input
                    aria-label="input-name"
                    label="Nama"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                  />
                  <Input
                    aria-label="input-testimoni-image"
                    label="Gambar (Profil)"
                    name="image"
                    type="file"
                    register={register}
                    error={errors.image?.message}
                  />
                  <Input
                    aria-label="input-testimoni-alamat"
                    label="Alamat"
                    name="address"
                    register={register}
                    error={errors.address?.message}
                  />
                  <TextArea
                    aria-label="input-testimoni-testi"
                    label="Testimoni"
                    role="input"
                    name="testi"
                    register={register}
                    error={errors.testi?.message}
                  />
                  <div className="d-grid pt-1">
                    <Button
                      aria-label="btn-submit"
                      label="Submit"
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}
