import React from 'react';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Extra = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/concept');
  };

  return (
    <div className="options">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="text-center">
          <Col>
            <h1 className="main-title fw-bold">
              조금 더 <br />
              알려주세유. <br />
            </h1>
            <Button
              className="start-button fw-bold btn-lg mt-4 rounded-pill btn-warning"
              style={{ border: '1px solid black' }}
              onClick={handleNextClick}
            >
              다음
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Extra;
