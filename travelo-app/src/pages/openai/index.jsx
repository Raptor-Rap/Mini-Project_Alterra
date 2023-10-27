import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import OpenAI from "openai";
import clsx from "clsx";
import "../../styles/openai/openai.css";

import Layout from "../../components/layout";
import { Input } from "../../components/input";
import Button from "../../components/button";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function chat() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
      setResults(response.choices);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const userMsg = {
      message: {
        content: prompt,
        role: "user",
      },
    };
    const newData = [...results, userMsg];
    setResults(newData);
    setPrompt("");
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const choice = response.choices[0];
      setResults([...newData, choice]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="openai-page">
        <div className="openai min-vh-100">
          <Container>
            <Row className="openai-row shadow-sm pt-2">
              <Col className="pt-3">
                <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-0.8s">
                  Masukan Pertanyaan
                </h1>
              </Col>
            </Row>
            <Row className="openai-row shadow-sm scrollable-div">
              <Col>
                <div className="chat-container">
                  {results.map((result, index) => (
                    <p
                      className={clsx(
                        `border rounded p-3 mb-4 ${
                          result.message.role === "assistant"
                            ? "left"
                            : "right bg-success text-light"
                        }`
                      )}
                      style={{ backgroundColor: "#ffffff" }}
                      key={index}
                    >
                      {result.message.content}
                    </p>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="form-container">
                  <Form onSubmit={handleSubmit}>
                    <Row className="openai-row shadow-sm">
                      <Col>
                        <Input
                          style={{
                            backgroundColor: "#dee2e6",
                            border: "1px solid #B4B4B4",
                            borderRadius: "15px",
                          }}
                          placeholder="Insert prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </Col>
                      <Col className="tombol col-auto">
                        <Button
                          label={isLoading ? "Loading" : "Submit"}
                          height={"pt-1 pb-5"}
                          type="submit"
                          disabled={isLoading}
                          aria-disabled={isLoading}
                        />
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}
