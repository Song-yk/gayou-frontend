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
            <h1 className='text-start'>게시글 제목</h1>
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
            
            <div className='my-3'>
              <img src={eximg} />
            </div>
            <div className="my-3 d-flex justify-content-between align-items-center">
              <span className="font-weight-light">
                🗨️ {댓글} 개
              </span>
              <div>
                <select value={sortOption} onChange={handleChange}>
                  <option>시간순</option>
                  <option>좋아요순</option>
                </select>
              </div>

            </div>
            <div>
              <div className="my-3 d-flex justify-content-between align-items-center">
                <img src='https://ifh.cc/g/R0QZTF.png' style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "gray", // 원하는 배경색으로 변경 가능
                }} />
                <div className="d-flex flex-column" style={{
                  width: '94%'
                }}>
                  <h9 className="text-start">{username}{댓글시간}</h9>

                  <input style={{ border: '1px solid gray', minHeight: '100px' }} placeholder='댓글을 작성해봐유' />
                </div>
              </div>

              <Comment backgroundColor='blue' />
              <Comment backgroundColor='green' />
              <Comment backgroundColor='red' />
              <Comment backgroundColor='yellow' />
              <Comment backgroundColor='navy' />
            </div>
          </Col>

        </Row>

      </Container>
    </div>
  );
};

function Comment({ backgroundColor = 'gray' }) {

  let 댓글 = 10;
  let username = '히타민';
  let 댓글시간 = '2024년 8월 15일';
  let [따봉, 따봉수] = useState(0);
  return (
    <div className="my-3 d-flex justify-content-between align-items-center">
      <img src='https://ifh.cc/g/R0QZTF.png' style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: backgroundColor, // 원하는 배경색으로 변경 가능
      }} />
      <div className="d-flex flex-column" style={{
        width: '90%'
      }}>
        <h9 className="text-start my-3">{username}{댓글시간}</h9>

        <span className="text-start" style={{ minHeight: '100px' }}>댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용</span>

      </div>
      <Button className='fw-bold mt-4' style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }} onClick={() => { 따봉수(따봉 + 1) }}>👍{따봉}</Button>
    </div>
  )
}

export default HomePage;
