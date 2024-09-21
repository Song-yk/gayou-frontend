import React from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dreamImage from '../../assets/images/한꿈이.png'; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/region');
  };

  return (
    <div className="home h-100 d-flex justify-content-center align-items-center position-relative">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="main-title fw-bold" style={{ fontSize: '85px', lineHeight: '1.2' }}>
              대전 여행 <br />
              준비 되셨나유? <br />
              그럼 <span style={{ color: '#FF7828' }}>이대로 가유~</span>
            </p>
            <Button
              className="start-button fw-bold btn-lg mt-4 rounded-pill"
              style={{ 
                border: '1px solid black', 
                padding: '10px 50px',
                fontSize: '30px',
                transition: 'background-color 0.3s, transform 0.3s',
                backgroundColor: '#FF7828',
              }}
              onClick={handleStartClick}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              시작하기
            </Button>
          </Col>
        </Row>
      </Container>
      <img
        src={dreamImage}
        alt="한꿈이"
        style={{
          position: 'absolute',
          bottom: '100px', 
          right: '400px', 
          width: '200px', 
          height: 'auto', 
          zIndex: -1
        }}
      />
    </div>
  );
};

export default HomePage;
