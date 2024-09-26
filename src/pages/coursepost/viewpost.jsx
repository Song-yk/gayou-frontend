import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import MyCardControls from '../../components/common/MyCardControls.jsx';


const HomePage = () => {
  // State to store form data
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  // State for data fetched from the database
  const [searchParams] = useSearchParams();

  // Fetch location, distance, and eximg from the database
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
        setTitle(response.data.courseName);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]); // searchParams를 dependency array에 추가
  // Function to handle form submission
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
  const RemoveHtmlTags = ({ content }) => {
    // HTML 태그를 제거하는 함수
    const removeHtmlTags = (str) => {
      return str.replace(/<p>|<\/p>/g, '');
    };

    return (
      <div>
        <p className='text-start'>{removeHtmlTags(content)}</p>
      </div>
    );
  };
  let 댓글 = 10;
  let username = '히타민';
  let 댓글시간 = '2024년 8월 15일';
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
      {loading ? (<></>
      ) : myData ? (
        <Container className="align-items-center min-vh-100">

          <Row className="text-center">

            <Col>
              <h1 className='text-start'>{title}</h1>

              <pre className="text-start text-muted small mt-1">
                {myData.town} | 코스 총 거리 {myData.totDistance}km
              </pre>
              <div className="d-flex justify-content-between align-items-center">
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
              <hr className='w-auto mt-1' />

              <div className='my-3'>
                <RemoveHtmlTags content={myData.content} />
              </div>
              {repeatRoutesSubTitle(myData.data)}
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
                    <h6 className="text-start">{username}{댓글시간}</h6>

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
      ) : (
        <></>
      )}
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
        <h6 className="text-start my-3">{username}{댓글시간}</h6>

        <span className="text-start" style={{ minHeight: '100px' }}>댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용</span>

      </div>
      <Button className='fw-bold mt-4' style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }} onClick={() => { 따봉수(따봉 + 1) }}>👍{따봉}</Button>
    </div>
  )
}

export default HomePage;
