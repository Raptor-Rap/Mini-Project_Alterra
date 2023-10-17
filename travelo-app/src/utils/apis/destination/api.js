import axiosWithConfig from "../axiosWithConfig";

export const getDestinations = async () => {
  try {
    const response = await axiosWithConfig.get("/destinations");

    return response.data;
  } catch (error) {
    throw Error("Failed to get destinations");
  }
};

export const getDetailDestinations = async (id_destination) => {
  try {
    const response = await axiosWithConfig.get(
      "/destinations/" + id_destination
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get a destination");
  }
};

export const createDestination = async (data) => {
  try {
    const newData = {
      ...data,
      image:
        "https://img.freepik.com/free-photo/temple-gates-lempuyang-luhur-temple-bali-indonesia_335224-367.jpg?w=900&t=st=1697351247~exp=1697351847~hmac=fa2b5aab609e77a11f1857d484c7a488c5def0b2bcabf27cdcf489a761478ea7",
    };
    const response = await axiosWithConfig.post("/destinations", newData);

    return response.data;
  } catch (error) {
    throw Error("Failed to create a new destination");
  }
};

export const updateDestination = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
      image:
        "https://img.freepik.com/free-photo/temple-gates-lempuyang-luhur-temple-bali-indonesia_335224-367.jpg?w=900&t=st=1697351247~exp=1697351847~hmac=fa2b5aab609e77a11f1857d484c7a488c5def0b2bcabf27cdcf489a761478ea7",
    };
    const response = await axiosWithConfig.put(`/destinations/${id}`, newData);

    return response.data;
  } catch (error) {
    throw Error("Failed to update a destination");
  }
};

export const deleteDestination = async (id_destination) => {
  try {
    const response = await axiosWithConfig.delete(
      "/destinations/" + id_destination
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to delete a product");
  }
};
