import axiosWithConfig from "../axiosWithConfig";

export const getTestimonials = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://6527ae37931d71583df12e4d.mockapi.io/api/v1/testimonial"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get testimonials");
  }
};

export const createTestimonial = async (data) => {
  try {
    const newData = {
      ...data,
      image:
        "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=1380&t=st=1697271647~exp=1697272247~hmac=cbfe611c28ed05e3e4d6e2da07f3464778cdfe38cbec8423d057aa64210ffa2b",
    };
    const response = await axiosWithConfig.post(
      "https://6527ae37931d71583df12e4d.mockapi.io/api/v1/testimonial",
      newData
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to create a new testimonial");
  }
};
