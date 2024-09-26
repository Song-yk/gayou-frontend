import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import TagManager from '../../components/common/TagManager.jsx';
const PostForm = () => {
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
        console.log(response.data);
        setTitle(response.data.courseName);

      } catch (error) {
        console.error('Error fetching data from the database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]); // searchParams를 dependency array에 추가

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const id = searchParams.get('id');
    const updatedData = {
      id: id,
      courseName: title,
      tag: tag,
      content: content,
    };

    try {
      const response = await axios.put('/api/springboot/route/post', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Post successful:', response.data);

      navigate('/postlist');
    } catch (error) {
      console.error('There was an error creating the post!', error);

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
        <Container className="align-items-center min-vh-100">
          <Row className="text-center">
            <Col>
              <input
                className="title form-control form-control-lg"
                value={title}
                placeholder='코스 이름'
                onChange={(e) => setTitle(e.target.value)}
              />
              <pre className="text-start text-muted small mt-1">
                {myData.town} | 코스 총 거리 {myData.totDistance}km
              </pre>
              <div>
                <TagManager />
              </div>
              <CKEditor
                editor={ClassicEditor}
                data=""
                config={{
                  placeholder: '소개글을 써줘유',
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />
              {repeatRoutesSubTitle(myData.data)}
            </Col>
          </Row>
          <div className="col-12 d-flex justify-content-end">
            <Button
              className="fw-bold btn-lg mt-4 rounded-pill btn-warning"
              onClick={handleSubmit}
            >
              저장
            </Button>
          </div>

        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};


export default PostForm;
