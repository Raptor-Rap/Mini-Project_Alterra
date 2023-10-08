import { Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

import homepage from "./pages/homepage";
import kelasPage from "./pages/kelasPage";
import testimonialPage from "./pages/testimonialPage";
import faqPage from "./pages/faqPage";
import syaratPage from "./pages/syaratPage";

function App() {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/" Component={homepage} />
        <Route path="/kelas" Component={kelasPage} />
        <Route path="/testimonial" Component={testimonialPage} />
        <Route path="/faq" Component={faqPage} />
        <Route path="/syarat" Component={syaratPage} />
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App;
