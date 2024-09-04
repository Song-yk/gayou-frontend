import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 

const RouteCreate = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const { region, neighborhoods, age, gender, travelDate, isLocal, transport, selectedConcepts } = location.state || {};

  useEffect(() => {
    const requestData = {
      region,
      neighborhoods,
      age,
      gender,
      travelDate,
      isLocal,
      transport,
      selectedConcepts,
    };

    axios.post('/api/springboot/route', requestData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    })
      .then(response => {
        console.log('성공!!');
      })
      .catch(error => {
        console.error("오류:", error);
      });
  }, []); 

  return (
    <div className="options">
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
