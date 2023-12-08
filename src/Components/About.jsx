import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Container fluid className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={10} className="text-center">
          <h1 className="mt-10 mb-4">About Our Blog</h1>
          <p>
            Welcome to our blog! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Proin vel nisi at metus ultrices hendrerit vel eu
            risus. Sed sed libero eu dolor bibendum fringilla. Vestibulum
            pharetra risus eu felis accumsan dignissim. Mauris id urna eu libero
            consectetur facilisis. Integer fermentum mi ac dolor aliquet, vel
            tempus elit fermentum.
          </p>

          <p>
            Our mission is to provide engaging and informative content to our
            readers. Whether you're a tech enthusiast, a design aficionado, or
            someone just looking for a good read, we've got something for you.
            Our team of passionate writers strives to deliver quality articles
            that spark curiosity and inspire exploration.
          </p>

          <p>
            Feel free to explore our blog, discover new topics, and join the
            conversation. We value your feedback and suggestions, so don't
            hesitate to reach out to us. Thank you for being part of our
            community!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
