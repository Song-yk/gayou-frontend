import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const navigate = useNavigate();

  const goToPrivacyPolicy = () => {
    navigate('/privacyPolicy'); 
  };
  const goToTermsOfService = () => {
    navigate('/termsOfService'); 
  };

  return (
    <footer className="footer bg-light p-2">
      <Container>
        <Row>
          <Col className="text-center">
            <a href="#" style={{ color: '#FF7828' }} onClick={goToPrivacyPolicy}>개인정보처리방침</a> |  <a href="#" style={{ color: '#FF7828' }} onClick={goToTermsOfService}>이용약관</a>   
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            이대로가유(이건대전로컬가이드유) | 대표 Aivle | 개인정보보호책임자 Aivle
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            ⓒ 2024 Aivle조. ALL RIGHTS RESERVED.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
