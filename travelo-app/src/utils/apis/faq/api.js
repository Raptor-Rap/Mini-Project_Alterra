import axiosWithConfig from "../axiosWithConfig";

export const getFaq = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://6527ae37931d71583df12e4d.mockapi.io/api/v1/faq"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get faq");
  }
};
