import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fmq7c2i', 'template_7eal4um', form.current, 'NqiZS_2AMO9iUIc4C')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");

        // Reset form fields after successful submission
        form.current.reset();

        // Show success toast
        toast.success('Email sent successfully!');
      })
      .catch((error) => {
        console.log(error.text);

        // Show error toast
        toast.error('Error sending email. Please try again.');
      });
  };

  return (
    
    <div>
<br />
<br />
      <Container fluid className="contact-container" style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
        <Row>
          <Col lg={3} className="contact-info">
            <br />
            <br />
            <div style={{marginLeft:"90px",marginTop:"20px"}}>
              {/* <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" /> */}
              <img  src="images/C1.jpeg" alt="Error To Get Image" />
              <h2>Contact Us</h2>
              <h4>We would love to hear from you!</h4>
            </div>
          </Col>
          <Col style={{marginLeft:"100px"}} lg={7} className="contact-form">
            <Form ref={form} onSubmit={sendEmail}>
              <br />
              <Form.Group controlId="fname">
                <Form.Label st>Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" name="user_name" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="user_email" />
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment:</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Type your comment here" name="message" />
              </Form.Group>
              <br />
              <br />
              <Button type="submit" variant="primary" style={{ marginBottom: '20px' }}>
  Submit
</Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Contact;
