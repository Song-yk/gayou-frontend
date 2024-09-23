import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomePage = () => {

  const navigate = useNavigate();
  let location = '대전 서구';
  let distance = '17.3';
  const eximg = 'https://github.com/user-attachments/assets/27b21286-b516-4c41-aacd-1f4148cb9b18';
  let username = '히타민';
  const share = 'https://github.com/user-attachments/assets/c2381a16-4bde-4b7a-81ae-c668330f88c8';
  const smallImgStyle = {
    width: '30px',
    height: '30px'
  };
  const [save, usesave] = useState('https://ifh.cc/g/OTp81P.png');
  function changesave() {
    if (save == 'https://ifh.cc/g/OTp81P.png') {
      usesave('https://ifh.cc/g/8vTa4q.png');
    }
    else {
      usesave('https://ifh.cc/g/OTp81P.png')
    }
  };
  const [love, uselove] = useState('https://ifh.cc/g/gDSohf.png');
  function changelove() {
    if (love == 'https://ifh.cc/g/gDSohf.png') {
      uselove('https://ifh.cc/g/Z0nfML.png');
    }
    else {
      uselove('https://ifh.cc/g/gDSohf.png')
    }
  };



  return (
    <div className="home">
      <Container className=" ">
        <Row className="text-center">
          <Col>
            <div className='mt-5' style={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: '5px' }}>
              <div>
                <Posts backgroundColor='black' id={2}/>
                <Posts backgroundColor='green' id={3}/>
                <Posts backgroundColor='yellow' id={1}/>
                <Posts backgroundColor='red' id={2}/>
                <Posts backgroundColor='navy' id={3}/>
              </div>
              <div className='ms-3'>
                <p className='m-3 fw-bold btn-lg mt-4 rounded-pill'>
                  카테고리를 선택해 보세유!<hr></hr>
                </p>
                <div className='text-center'>
                  <Options named='전체' />
                  <Options named='유성구' />
                  <Options named='대덕구' />
                  <Options named='서구' />
                  <Options named='중구' />
                  <Options named='동구' />
                  <hr></hr>
                </div>
                <div>
                  <Options named='#자연' />
                  <Options named='#관광지' />
                  <Options named='#문화시설' />
                  <Options named='#스포츠' />
                  <Options named='#역사' />
                  <Options named='#체험' />
                  <Options named='#음식' />
                  <Options named='#카페' />
                  <Options named='#쇼핑' />
                  <Options named='#빵지순례' />
                  <Options named='#로컬 맛집' />
                  <Options named='#지역축제' />
                  <Options named='#예술/공연' />
                  <Options named='#동네탐험' />
                  <Options named='#반려동물' />
                  <Options named='#아이' />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container >
    </div >
  );
};

function Options({ named }) {
  const [cl, setcl] = useState('transparent');
  const [tx, settx] = useState('black');
  function chagecl() {
    if (cl === 'transparent') {
      setcl('#EA515B'), settx('white')
    }
    else {
      setcl('transparent'), settx('black')
    }
  };
  return (
    <button className='m-2' style={{
      borderRadius: '10px', backgroundColor: cl, border: 'none', color: tx
    }} onClick={chagecl}>{named}</button>
  )
};


function Posts({ backgroundColor = 'gray', id = 1 }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [eximg, setEximg] = useState('');
  const [save, usesave] = useState('https://ifh.cc/g/OTp81P.png');
  const [love, uselove] = useState('https://ifh.cc/g/gDSohf.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/post/data/${id}`);
        console.log(response.data);
        setName(response.data.name);
        setLocation(response.data.location);
        setContent(response.data.content);
        setTag(response.data.tag);
        setDistance(response.data.distance);
        setEximg(response.data.eximg);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };

    fetchData();
  }, [id]); // ID가 변경될 때마다 데이터 재요청

  const changesave = () => {
    if (save === 'https://ifh.cc/g/OTp81P.png') {
      usesave('https://ifh.cc/g/8vTa4q.png');
    } else {
      usesave('https://ifh.cc/g/OTp81P.png');
    }
  };

  const changelove = () => {
    if (love === 'https://ifh.cc/g/gDSohf.png') {
      uselove('https://ifh.cc/g/Z0nfML.png');
    } else {
      uselove('https://ifh.cc/g/gDSohf.png');
    }
  };

  let username = '히타민';
  const share = 'https://github.com/user-attachments/assets/c2381a16-4bde-4b7a-81ae-c668330f88c8';
  const smallImgStyle = {
    width: '30px',
    height: '30px'
  };

  return (
    <div className='mt-2' style={{
      backgroundColor: 'none',
      borderRadius: '10px',
      border: '1px solid gray', // 회색 테두리 설정
    }}>
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <img className='m-2' src='https://ifh.cc/g/R0QZTF.png' style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              backgroundColor: backgroundColor
            }} />
            <span>{username}</span>
          </div>
          <img className='m-2' src={share} alt='Example' style={smallImgStyle} />
        </div>
        <div className='border-top d-flex justify-content-between align-items-center'>
          <img className='m-3' src={eximg} style={{
            width: "50%",
            height: "auto"
          }} alt={name} />
          <div className='내용' style={{
            width: "50%",
            height: "auto"
          }}>
            <div>
              <h1>{name}</h1>
              <p>{location} | {distance} km</p>
              <p>{content}</p>
              <p>{tag}</p>
            </div>
            <div className='아이콘 mb-2'>
                <img src={save} alt='Example' style={smallImgStyle} onClick={changesave} />
                <img src={love} alt='Example' style={smallImgStyle} onClick={changelove} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
