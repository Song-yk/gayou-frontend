import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import Navbar from '../navbar/navbar.jsx';
import { BsSearch } from 'react-icons/bs';

const Region = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const navigate = useNavigate();

    const regions = ['유성구', '대덕구', '동구', '서구', '중구'];

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
    };

    const handleNextClick = () => {
        navigate('/extra', { state: { region: selectedRegion }});
    };

    return (
        <div className="options">
            <Navbar />
            <Container className="min-vh-100 d-flex flex-column justify-content-center">
                <Row className="mb-5">
                    <Col md={5} className="d-flex flex-column justify-content-center">
                        <h1 className="fw-bold" style={{ fontSize: '90px' }}>
                            어디가세유?
                        </h1>
                    </Col>
                    <Col md={7} className="d-flex flex-column align-items-left mt-5">
                        <div className="d-flex align-items-center mb-3" style={{ maxWidth: '700px' }}>
                            <InputGroup className="flex-grow-1 m-2">
                                <FormControl className='form-control-lg'
                                    placeholder="원하는 동네가 있으면 입력해주세요"
                                    aria-label="Search"
                                    style={{
                                        padding: '10px',
                                        
                                    }}
                                />
                                <Button variant="outline-secondary">
                                    <BsSearch className='m-1'/>
                                </Button>
                            </InputGroup>
                            <Button
                                className="ms-2 btn-lg btn-secondary"
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    minWidth: '220px'
                                }}
                                onClick={() => handleRegionClick(null)}
                            >
                                아직 정하지 못했어요
                            </Button>
                        </div>
                        <div className="d-flex flex-wrap justify-content-left">
                            {regions.map((region) => (
                                <Button
                                    key={region}
                                    onClick={() => handleRegionClick(region)}
                                    className={`m-2 btn-lg ${selectedRegion === region ? 'btn-warning' : 'btn-light'}`}
                                    style={{ border: '1px solid black'
                                        , borderRadius: '8px'
                                        , padding: '10px 20px'
                                        , minWidth: '125px' }}
                                >
                                    {region}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="m-auto">
                    <Col className="text-end">
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

export default Region;
