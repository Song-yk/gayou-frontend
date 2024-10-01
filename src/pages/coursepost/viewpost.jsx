
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';

const PostForm = () => {

  const [showFullContent, setShowFullContent] = useState(false);
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { id } = location.state || {};
  const isContentLong = myData.content && myData.content.length > 150;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        alert('잘못된 접근입니다.');
        navigate('/');
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/springboot/route/data', {
          params: { id },
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyData(response.data);
        setTitle(response.data.courseName);
        setContent(response.data.content);
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
      setError('서버와 연결할 수 없습니다. 네트워크를 확인해주세요.');
    } else {
      setError(`요청 설정 오류: ${error.message}`);
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
              <Typography
                className="title form-control form-control-lg"
                component="div"
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                {title}
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                {myData.tag.map((tag, index) => (
                  <Chip key={index} label={'#' + tag} size="small" sx={{ marginRight: 1 }} />
                ))}
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                  sx={{ marginBottom: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}
                  dangerouslySetInnerHTML={{
                    __html: myData.content
                      ? showFullContent
                        ? myData.content
                        : isContentLong
                          ? `${myData.content.slice(0, 150)}...`
                          : myData.content.slice(0, 150)
                      : '',
                  }}
                />
              </Box>

              {error && (
                <Alert variant="danger" className="create-error">
                  {error}
                </Alert>
              )}
            </Col>
            <Col className="" style={{ overflow: 'auto' }}>
              {repeatRoutesSubTitle(myData.data)}
            </Col>
          </Row>

        </Container>
      ) : (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      )}
    </div>
  );
};

export default PostForm;
