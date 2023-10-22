import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Homepage from "../pages/homepage/index";
import Destination from "../pages/destination/index";
import Testimonial from "../pages/testimonial/index";
import Faq from "../pages/faq/index";
import Syarat from "../pages/syarat/index";
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
import AddDestination from "../pages/destination/add";
import AddTestimonial from "../pages/testimonial/add";
import DetailDestination from "../pages/destination/detail";
import Transaction from "../pages/transaksi/index";
import History from "../pages/transaksi/history";
import ScrollToTop from "../components/scroll";
import { setAxiosConfig } from "../utils/apis/axiosWithConfig";
import { useToken } from "../utils/contexts/token";

export default function Router() {
  const { token } = useToken();

  useEffect(() => {
    setAxiosConfig("", "https://651a7c39340309952f0d5e9d.mockapi.io/api/v1");
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Homepage />
        </>
      ),
    },
    {
      path: "/login",
      element:
        token !== "" ? (
          <Navigate to="/" />
        ) : (
          <>
            <ScrollToTop />
            <Login />
          </>
        ),
    },
    {
      path: "/signup",
      element:
        token !== "" ? (
          <Navigate to="/" />
        ) : (
          <>
            <ScrollToTop />
            <SignUp />
          </>
        ),
    },
    {
      path: "/destination",
      element: (
        <>
          <ScrollToTop />
          <Destination />
        </>
      ),
    },
    {
      path: "/destination/:id",
      element: (
        <>
          <ScrollToTop />
          <DetailDestination />
        </>
      ),
    },
    {
      path: "/destination/:id/edit",
      element:
        token === "" ? (
          <Navigate to="/" />
        ) : (
          <>
            <ScrollToTop />
            <AddDestination />
          </>
        ),
    },
    {
      path: "/destination/add",
      element:
        token === "" ? (
          <Navigate to="/" />
        ) : (
          <>
            <ScrollToTop />
            <AddDestination />
          </>
        ),
    },
    {
      path: "/destination/:id/transaction",
      element: (
        <>
          <ScrollToTop />
          <Transaction />
        </>
      ),
    },
    {
      path: "/history",
      element: (
        <>
          <ScrollToTop />
          <History />
        </>
      ),
    },
    {
      path: "/testimonial",
      element: (
        <>
          <ScrollToTop />
          <Testimonial />
        </>
      ),
    },
    {
      path: "/testimonial/add",
      element:
        token === "" ? (
          <Navigate to="/" />
        ) : (
          <>
            <ScrollToTop />
            <AddTestimonial />
          </>
        ),
    },
    {
      path: "/faq",
      element: (
        <>
          <ScrollToTop />
          <Faq />
        </>
      ),
    },
    {
      path: "/syarat",
      element: (
        <>
          <ScrollToTop />
          <Syarat />
        </>
      ),
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
