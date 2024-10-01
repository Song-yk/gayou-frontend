import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputAdornment, TextareaAutosize, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/defaultProfile.png';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import '../../components/common/post.css';
import ClearIcon from '@mui/icons-material/Clear';

const Viewpost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');
  const { id, flag } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/springboot/route/data', {
          params: { id },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setMyData(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

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

  const toggleLike = async () => {
    try {
      const newIsLiked = !isLiked;

      if (isLiked) {
        await axios.delete('/api/springboot/route/like', {
          params: {
            id: myData.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          '/api/springboot/route/like',
          {},
          {
            params: {
              id: myData.id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsLiked(newIsLiked);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };
  const toggleBookmark = async () => {
    try {
      const newIsBookmarked = !isBookmarked;

      if (isBookmarked) {
        await axios.delete('/api/springboot/route/bookmark', {
          params: {
            id: myData.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          '/api/springboot/route/bookmark',
          {},
          {
            params: {
              id: myData.id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsBookmarked(newIsBookmarked);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        '/api/springboot/route/comment',
        { comment },
        {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyData(prevData => ({
        ...prevData,
        comments: [response.data, ...prevData.comments],
      }));

      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentDelete = async commentId => {
    try {
      await axios.delete('/api/springboot/route/comment', {
        params: { id: commentId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyData(prevData => ({
        ...prevData,
        comments: prevData.comments.filter(comment => comment.id !== commentId),
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="home">
      {loading ? (
        <></>
      ) : myData.data ? (
        <Container className="align-items-center min-vh-100">
          <Row className="text-center create-text-center">
            <Col className="col-12 col-sm-12 col-md-12 col-lg-6" style={{ height: '35.5em' }}>
              <Typography
                className="title form-control form-control-lg"
                component="div"
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  textAlign: 'left',
                }}
              >
                {myData.courseName}
              </Typography>
              <Box className="content" sx={{ marginBottom: 2 }}>
                <ul className="tags-list">
                  {myData.tag.map((tag, index) => (
                    <li key={index} style={{ background: 'none', border: 'none', fontSize: '1.1em' }}>
                      #{tag}
                    </li>
                  ))}
                </ul>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                  sx={{ marginBottom: 1, textAlign: 'left' }}
                  dangerouslySetInnerHTML={{
                    __html: myData.content,
                  }}
                />
              </Box>

              {error && (
                <Alert variant="danger" className="create-error">
                  {error}
                </Alert>
              )}
            </Col>
            <Col className="" style={{ overflow: 'auto', height: '35.5em' }}>
              {repeatRoutesSubTitle(myData.data)}
            </Col>
          </Row>
          <Row className="text-center create-text-center">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box>
                  <ModeCommentOutlinedIcon /> 댓글 {myData.totComment}개
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleLike}>
                  {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                {flag && (
                  <IconButton onClick={toggleBookmark}>
                    {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto', marginBottom: '1em' }}>
              <img
                src={myData.userId.profilePicture || defaultProfileImage}
                alt="profile"
                style={{ width: '50px', height: '50px', marginRight: '1em', borderRadius: '50px' }}
              />
              <TextareaAutosize
                className="view-comment-textarea"
                value={comment}
                onChange={e => setComment(e.target.value)}
                minRows={3}
                style={{
                  width: '100%',
                  minHeight: '6em',
                  maxHeight: '6em',
                  border: 'solid 1px',
                  borderRadius: '5px',
                  resize: 'none',
                  overflowY: 'auto',
                  marginRight: '1em',
                }}
              />
              <InputAdornment position="start">
                <SendIcon sx={{ cursor: 'pointer' }} onClick={handleComment} />
              </InputAdornment>
            </Box>
            <hr />
            <Box sx={{ marginBottom: '2em' }}>
              {myData.comments.map((data, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto', marginBottom: '1em' }}>
                    <img
                      src={data.user.profilePicture || defaultProfileImage}
                      alt="profile"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50px',
                        marginRight: '1em',
                        marginBottom: 'auto',
                      }}
                    />
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ textAlign: 'left', marginBottom: '0.5em' }}>{data.user.name}&nbsp;&nbsp;</Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="p"
                          sx={{ marginBottom: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}
                        >
                          {new Date(data.createDate).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          className="title form-control form-control-lg"
                          component="div"
                          variant="body1"
                          sx={{
                            textAlign: 'left',
                          }}
                        >
                          {data.comment}
                        </Typography>
                        {myData.userId.id === data.user.id && (
                          <IconButton onClick={() => handleCommentDelete(data.id)}>
                            <ClearIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Row>
        </Container>
      ) : (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      )}
    </div>
  );
};

export default Viewpost;
