import React from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ContactUsScreen = () => {
  return (
    <>
      <FormContainer>
        <h1 className="text-center">Contact Us</h1>
        <Form>
          <Form.Group className="mb-3" controlId="contactform.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactform.ControlInput2">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactform.ControlInput3">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="Subject" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactform.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <div className="text-center">
            <Button
              className="content-center btn-bg"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default ContactUsScreen;
