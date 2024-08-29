import React from 'react';
import './home.css';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    //alert("시작하기 버튼이 클릭되었습니다!");
    navigate('/region');
  };

  return (
    <div className="home">
      <Navbar />
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="text-center">
          <Col>
            <p className="main-title fw-bold" style={{ fontSize: '70px' }}>
              대전 여행 <br />
              준비 되셨나유? <br />
              그럼 <span className="text-warning">이대로 가유~</span>
            </p>
            <Button
              className="start-button fw-bold btn-lg mt-4 rounded-pill btn-warning"
              style={{ border: '1px solid black' }}
              onClick={handleStartClick}
            >
              시작하기
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
