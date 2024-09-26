import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Lists from '../../components/common/lists.jsx';

const HomePage = () => {
  const [myData, setMyData] = useState(null); // 초기값을 null로 설정
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 필요 시 사용
  const areas = ['전체', '유성구', '대덕구', '서구', '중구', '동구'];
  const tags = [
    '자연', '관광지', '문화시설', '스포츠', '역사',
    '체험', '음식', '카페', '쇼핑', '빵지순례',
    '로컬 맛집', '지역축제', '예술/공연', '동네탐험',
    '반려동물', '아이',
  ];
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
        console.log(response.data.totlike);
        setTitle(response.data.courseName);

      } catch (error) {
        console.error('Error fetching data from the database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="home">
      {loading ? (<p>Loading...</p>  // 로딩 메시지 추가
      ) : myData ? (
        <Container>
          <Row className="text-center">
            <Col>
              <div className='mt-5' style={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: '5px' }}>
                <div>
                  <Lists
                    user='히타민'
                    image={myData.data}
                    title={myData.courseName}
                    town={myData.town}
                    distance={myData.totDistance}
                    content={myData.content}
                    tag={myData.tag}
                    like={myData.totlike}
                  />
                </div>
                <div className='ms-3'>
                  <p className='m-3 fw-bold btn-lg mt-4 rounded-pill'>
                    카테고리를 선택해 보세유!
                  </p><hr></hr>
                  <div>
                    <div className='text-center'>
                      {areas.map((area) => (
                        <Options key={area} named={area} />
                      ))}
                    </div>
                    <hr />
                    <div>
                      {tags.map((tag) => (
                        <Options key={tag} named={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container >
      ) : (
        <p>No data found</p> // 데이터가 없을 때 메시지 표시
      )}
    </div >
  );
};

function Options({ named }) {
  const [cl, setcl] = useState('transparent');
  const [tx, settx] = useState('black');

  function chagecl() {
    if (cl === 'transparent') {
      setcl('#EA515B');
      settx('white');
    } else {
      setcl('transparent');
      settx('black');
    }
  }

  return (
    <button
      className='m-2'
      style={{
        borderRadius: '10px',
        backgroundColor: cl,
        border: 'none',
        color: tx,
      }}
      onClick={chagecl}
    >
      #{named}
    </button>
  );
}
export default HomePage;
