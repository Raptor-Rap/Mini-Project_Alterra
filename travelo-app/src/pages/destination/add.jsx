import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import * as z from "zod";

import { Input, TextArea } from "../../components/input";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Swal from "../../utils/swal";
import {
  createDestination,
  getDestinations,
  updateDestination,
} from "../../utils/apis/destination/api";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z.object({
  id: z.string().optional(),
  destination: z
    .string()
    .min(1, { message: "Please enter a valid destination name" }),
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
  description: z
    .string()
    .min(1, { message: "Please enter a valid description" }),
  price: z.string().min(1, { message: "Please enter a valid price" }),
  rating: z.number().min(1, { message: "Please enter a valid rating" }),
});

export default function AddDestination() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(0);
  const [destination, setDestination] = useState([]);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDestinations();
      setDestination(result);

      const destinationData = result.find((item) => item.id === id);
      if (destinationData) {
        setSelectedId(destinationData.id);
        setValue("destination", destinationData.destination);
        setValue("image", destinationData.image);
        setValue("description", destinationData.description);
        setValue("price", destinationData.price);
        setValue("rating", destinationData.rating);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function onSubmit(data) {
    try {
      await createDestination(data);
      Swal.fire({
        title: "Success",
        text: "Successfully created a new destination",
        showCancelButton: false,
      });
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

  async function onSubmitEdit(data) {
    try {
      await updateDestination({ ...data, id: selectedId });
      Swal.fire({
        title: "Success",
        text: "Successfully updated the destination",
        showCancelButton: false,
      });
      setSelectedId(0);
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

  function edit(id) {}

  return (
    <Layout>
      <div className="add-destination">
        <div className="destination min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-0.8s">
                  Masukan Destinasi
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <form
                  onSubmit={handleSubmit(
                    selectedId == 0 ? onSubmit : onSubmitEdit
                  )}
                  aria-label="destination-form"
                >
                  <Input
                    aria-label="input-destination-name"
                    label="Destination Name"
                    name="destination"
                    register={register}
                    error={errors.destination?.message}
                  />
                  <Input
                    aria-label="input-destination-image"
                    label="Image"
                    name="image"
                    type="file"
                    register={register}
                    error={errors.image?.message}
                  />
                  <TextArea
                    aria-label="input-destination-description"
                    label="Description"
                    role="input"
                    name="description"
                    register={register}
                    error={errors.description?.message}
                  />
                  <Input
                    aria-label="input-destination-price"
                    label="Price"
                    name="price"
                    register={register}
                    error={errors.price?.message}
                  />
                  <Input
                    aria-label="input-destination-rating"
                    label="Rating (1-5)"
                    name="rating"
                    type="number"
                    register={register}
                    error={errors.rating?.message}
                  />
                  <div className="d-grid pt-1">
                    <Button
                      aria-label="btn-submit"
                      label={selectedId == 0 ? "Submit" : "Update"}
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
