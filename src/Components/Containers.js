import React from "react";
import "../App.css";
import FormCity from "./FormCity";
import Weather from "./Weather";
import { Alert, Col, Container, Row } from "react-bootstrap";

function Containers() {
  return (
    <Container className="center">
      <Alert variant="info">
        <Row>
          <Col>
            <Alert.Heading className="center">Hava Durumu</Alert.Heading>
            <hr />
            <Col md={4}>
              <FormCity />
            </Col>
          </Col>
        </Row>
        <br />
        <br />
        <Row style={{ margin: "auto 1% 1% 1%" }}>
          <Weather />
        </Row>
        <br />
        <br />
      </Alert>
    </Container>
  );
}

export default Containers;
