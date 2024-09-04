import React, { useState } from 'react';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Concept = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  
  const { region, neighborhoods, age, gender, travelDate, isLocal, transport } = location.state || {};
  
  const concepts = ['빵지순례', '지역 축제', '예술/공연', '자연', '스포츠', '로컬맛집', '동네 탐험', '감성 카페', '쇼핑', '아이/반려동물'];

  const handleConceptClick = (concept) => {
    setSelectedConcepts((prev) => 
      prev.includes(concept)
        ? prev.filter(item => item !== concept) // 선택 해제
        : [...prev, concept] // 선택 추가
    );
  };

  const handleNextClick = () => {
    console.log(region, neighborhoods, age, gender, travelDate, isLocal,selectedConcepts);
    navigate('/routeCreator', { state: { region, neighborhoods, age, gender, travelDate, isLocal, transport, selectedConcepts } });
  };

  const handleBeforeClick = () => {
    navigate(-1);
  };
  return (
    <div className="options">
      <Navbar />
      <Container className="min-vh-100 d-flex flex-column justify-content-start">
        <Row className="mb-5">
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="fw-bold" style={{ fontSize: '90px' }}>
              마지막이에유.<br />
              원하는 컨셉을 골라보세유.
            </h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-end">
            <div className="d-flex flex-wrap justify-content-left">
              {concepts.map((concept) => (
                <Button 
                  key={concept}
                  onClick={() => handleConceptClick(concept)}
                  className={`m-2 btn-lg ${selectedConcepts.includes(concept) ? 'btn-warning' : 'btn-light'}`}
                  style={{ border: '1px solid black', borderRadius: '8px', padding: '10px 20px', minWidth: '125px' }}
                >
                  {concept}
                </Button>
              ))}
            </div>
            <Button
              className="fw-bold btn-lg m-1"
              style={{ backgroundColor: '#FFA500', borderRadius: '30px', border: '1px solid black' }}
              onClick={handleBeforeClick}
              >
              이전
            </Button>
            <Button
              className="fw-bold btn-lg"
              style={{ backgroundColor: '#FFA500', borderRadius: '30px', border: '1px solid black' }}
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

export default Concept;
