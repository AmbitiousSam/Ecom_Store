import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="my-3">
            <div className="hero-content text-center">
              <h1>Welcome to Fresh Grocery Story.</h1>
              <p>
                Discover the latest trends and find the perfect products for
                you.
              </p>
              <Button
                variant="primary"
                className="btn-bg"
                onClick={() => scrollToSection("pro")}
              >
                Shop Now
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="hero-image">
              {/* You can replace the image source with your actual image */}
              <Image
                src="/images/hero.jpg" // Replace with your image URL
                alt="E-Commerce"
                className="img-fluid"
                fluid
                rounded
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
