import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import TagManager from '../../components/common/TagManager.jsx';

const PostForm = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
        setTitle(response.data.courseName);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleError = error => {
    if (error.response) {
      if (error.response.status === 401) {
        setError('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
      } else if (error.response.status === 404) {
        setError('해당 데이터를 찾을 수 없습니다.');
      } else if (error.response.status === 500) {
        setError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError(`오류 발생: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // 요청이 전송되었으나 응답이 없는 경우
      setError('서버와 연결할 수 없습니다. 네트워크를 확인해주세요.');
    } else {
      // 설정 중 오류가 발생한 경우
      setError(`요청 설정 오류: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    if ((title || '').trim() === '') {
      setError('코스 이름은 필수 항목입니다.');
      return;
    }
    if ((content || '').trim() === '') {
      setError('소개 글은 필수 항목입니다.');
      return;
    }

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

      navigate('/postlist');
    } catch (error) {
      handleError(error); // 에러 처리 함수 호출
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
      {loading ? (
        <></>
      ) : myData.data ? (
        <Container className="align-items-center min-vh-100">
          <Row className="text-center create-text-center">
            <Col className="col-12 col-sm-12 col-md-12 col-lg-6">
              <input
                className="title form-control form-control-lg"
                value={title || ''}
                placeholder="코스 이름"
                onChange={e => setTitle(e.target.value)}
              />
              <div>
                <TagManager tags={tag} setTags={setTag} />
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
              {error && <Alert variant="danger">{error}</Alert>} {/* 에러 메시지 출력 */}
            </Col>
            <Col className="">{repeatRoutesSubTitle(myData.data)}</Col>
          </Row>
          <div className="col-12 d-flex justify-content-end">
            <Button className="fw-bold btn-lg rounded-pill btn-warning" onClick={handleSubmit}>
              저장
            </Button>
          </div>
        </Container>
      ) : (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      )}
    </div>
  );
};

export default PostForm;
