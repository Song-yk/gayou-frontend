import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Extra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('남성');
  const [travelDate, setTravelDate] = useState(new Date());
  const [isLocal, setIsLocal] = useState(false);
  const { region, neighborhoods } = location.state || {};
  const token = localStorage.getItem('token');

  const handleNextClick = () => {
    navigate('/concept', { state: { region, neighborhoods, age, gender, travelDate, isLocal } });
  };

  const calculateAge = birthdayString => {
    const birthDate = new Date(birthdayString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (token) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`/api/springboot/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response.data;
          setAge(calculateAge(data.birthday));
          setGender(data.isGender ? '남성' : '여성');
          setIsLocal(data.isLocal);
          console.log(data);
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        }
      };

      fetchProfileData();
    }
  }, [token]);
  return (
    <div className="options h-100 d-flex flex-column justify-content-start">
      <Container>
        <Row className="mb-5">
          <Col md={5} className="d-flex flex-column justify-content-start mt-5">
            <h1 style={{ fontSize: '90px' }}>
              조금 더<br />
              알려주세유.
            </h1>
          </Col>
          <Col md={7} className="d-flex flex-column align-items-left mt-5">
            <Row className="mb-4">
              <Col md={6}>
                <div className="mb-4">
                  <h4>나이를 선택해주세요.</h4>
                  <hr />
                  <Form.Range min={0} max={100} step={1} value={age} onChange={e => setAge(Number(e.target.value))} />
                  <p>선택된 나이: {age}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <h4>성별을 선택해주세요.</h4>
                  <hr />
                  <Button
                    variant={gender === '남성' ? 'warning' : 'light'}
                    onClick={() => setGender('남성')}
                    className="m-1"
                  >
                    남성
                  </Button>
                  <Button
                    variant={gender === '여성' ? 'warning' : 'light'}
                    onClick={() => setGender('여성')}
                    className="m-1"
                  >
                    여성
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <div className="mb-4">
                  <h4>여행 일정을 알려주세요.</h4>
                  <hr />
                  <DatePicker
                    selected={travelDate}
                    onChange={date => setTravelDate(date)}
                    className="form-control"
                    dateFormat="yyyy/MM/dd"
                  />
                </div>
              </Col>
              <Col>
                <div className="mb-4">
                  <h4>대전 사람인가요?</h4>
                  <hr />
                  <Form.Check
                    type="switch"
                    id="isLocal"
                    label={isLocal ? '예' : '아니오'}
                    checked={isLocal}
                    onChange={e => setIsLocal(e.target.checked)}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Button
          className="fw-bold btn-lg m-5"
          style={{
            position: 'fixed',
            left: '20px',
            bottom: '90px',
            backgroundColor: '#FF7828',
            borderRadius: '30px',
            border: '1px solid black',
            padding: '10px 40px',
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </Button>

        <Button
          className="fw-bold btn-lg m-5"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '90px',
            backgroundColor: '#FF7828',
            borderRadius: '30px',
            border: '1px solid black',
            padding: '10px 40px',
          }}
          onClick={handleNextClick}
        >
          다음
        </Button>
      </Container>
    </div>
  );
};

export default Extra;
