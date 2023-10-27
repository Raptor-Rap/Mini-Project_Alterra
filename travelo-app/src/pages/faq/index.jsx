import { Link } from "react-router-dom";

import FaqComponent from "../../components/faq";
import Layout from "../../components/layout";

export default function faqPage() {
  return (
    <Layout>
      <FaqComponent
        height={"pt-5"}
        children={
          <div className="text-center pt-5">
            <p>
              Butuh pertanyaan lainya?{" "}
              <Link to={"/faq/question"}>klik disini!</Link>
            </p>
          </div>
        }
      />
    </Layout>
  );
}
