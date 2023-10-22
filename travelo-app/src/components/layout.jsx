import { ToastContainer } from "react-toastify";
import Navbar from "./navbar";
import Footer from "./footer";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          draggable={false}
          pauseOnHover
        />
      </div>
      <Footer />
    </div>
  );
}
