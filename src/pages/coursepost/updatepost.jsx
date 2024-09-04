import React, { useState } from 'react';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {


  const navigate = useNavigate();

  const handleStartClick = () => {
    //alert("시작하기 버튼이 클릭되었습니다!");
    navigate('/region');
  };
  let location = '대전 서구';
  let distance = '17.3';
  let 댓글 = 10;
  let username = '히타민';
  let 댓글시간 = '2024년 8월 15일';
  const eximg = 'https://github.com/user-attachments/assets/27b21286-b516-4c41-aacd-1f4148cb9b18';
  const update = 'https://github.com/user-attachments/assets/e7977ac6-0db7-40a7-b18d-b20dfdd5f8bb';
  const [save, usesave] = useState('https://ifh.cc/g/OTp81P.png');
  const share = 'https://github.com/user-attachments/assets/c2381a16-4bde-4b7a-81ae-c668330f88c8';
  const smallImgStyle = {
    width: '30px',
    height: '30px'
  };
  function changesave() {
    if (save == 'https://ifh.cc/g/OTp81P.png') {
      usesave('https://ifh.cc/g/8vTa4q.png');
    }
    else {
      usesave('https://ifh.cc/g/OTp81P.png')
    }
  }
  const [sortOption, setSortOption] = useState('시간순');

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <div className="home">
      <Navbar />
      <Container className="align-items-center min-vh-100">

        <Row className="text-center">

          <Col>
            <input className='form-control form-control-lg' placeholder="제목을 입력하세유" />
            <pre className='text-start text-muted small mt-1'> {location} | 코스 총 거리{distance}km </pre>
            <div className="my-3 d-flex justify-content-between align-items-center">
              <div>
                <span style={{ fontSize: '30px' }}>❤️</span>
                <span style={{ fontSize: '30px' }}>👁️</span>
              </div>
              <div>
                <span>
                  <img src={update} alt='Example' style={smallImgStyle} />
                </span>
                <span>
                  <img src={save} alt='Example' style={smallImgStyle} onClick={changesave} />
                </span>
                <span>
                  <img src={share} alt='Example' style={smallImgStyle} />
                </span>
              </div>
            </div>
            <input className='my-3 form-control form-control-sm' placeholder="#태그 입력하기" />
            <CKEditor
              editor={ClassicEditor}
              data=""
              config={{
                placeholder: '여기에 내용을 입력해주세요.',
              }}
            />
            <div className='my-3'>
              <img src={eximg} />
            </div>
          </Col>
          <div class="col-12 d-flex justify-content-end">
            <Button className='fw-bold btn-lg mt-4 rounded-pill btn-warning'>저장</Button>
          </div>
        </Row>

      </Container>
    </div>
  );
};


export default HomePage;
