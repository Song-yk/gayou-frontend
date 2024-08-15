import React from 'react';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const RouteCreate = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/routeCreator')
  };

  return (
    <div className="options">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="text-center">
          <Col>
            <h1 className="main-title fw-bold">
              이대로 가유가 <br />
              AI 동네투어를 생성중이에유. <br />
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RouteCreate;
