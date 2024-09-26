import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MyCardControls from '../../components/common/MyCardControls.jsx';
const HomePage = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState('');
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const id = searchParams.get('id');
      try {
        const response = await axios.get('/api/springboot/route/data', {
          params: { id },
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyData(response.data);
        console.log(response.data);
        setTitle(response.data.courseName);

      } catch (error) {
        console.error('Error fetching data from the database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);
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

  function repeatRoutesSubTitle(obj) {
    return obj.map((location, index) => (
      <MyCardControls
        key={`location-${index}-${location.contentid.title}`}
        width="100%"
        image={location.contentid.firstimage}
        image2={location.contentid.firstimage2}
        title={location.contentid.title}
        overview={location.contentid.overview}
        idx={index}
        totalItems={obj.length}
      />
    ));
  }

  return (
    <div className="home">
      {loading ? (<></>
      ) : myData ? (
        <Container className=" ">
          <Row className="text-center">
            <Col>
              <div className='mt-5' style={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: '5px' }}>
                <div>
                  {repeatRoutesSubTitle(myData.data)}
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
      ) : (
        <></>
      )}
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
export default HomePage;
