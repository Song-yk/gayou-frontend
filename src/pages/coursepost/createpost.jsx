import React from 'react';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {


  const navigate = useNavigate();
  let location = '대전 서구';
  let distance = '17.3';
  const eximg = 'https://github.com/user-attachments/assets/27b21286-b516-4c41-aacd-1f4148cb9b18';
  return (
    <div className="home">
      <Navbar />
      <Container className="align-items-center min-vh-100">
        
        <Row className="text-center">
          
          <Col>
          <input className='form-control form-control-lg' placeholder="제목을 입력하세유"/>
          <pre className='text-start text-muted small mt-1'> {location} | 코스 총 거리{distance}km </pre>
          <input className='form-control form-control-sm' placeholder="#태그 입력하기"/>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{
            placeholder: '소개글을 써줘유',
          }}
        />
        <img src={eximg} />
        <div>
          
        </div>
          </Col>
        
        </Row>
        <div class="col-12 d-flex justify-content-end">
          <Button className='fw-bold btn-lg mt-4 rounded-pill btn-warning'>저장</Button>
      </div>
      </Container>
    </div>
  );
};

export default HomePage;
