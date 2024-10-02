import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Switch, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/common/MyButton.jsx';

export default function PostCard({
  data,
  cumBorder = null,
  cumBoxShadow = null,
  flag = true,
  onDelete = null,
  flag2 = true,
}) {
  const navigate = useNavigate();
  const { control } = useForm();
  const [likes, setLikes] = useState(data.totlike || 0);
  const [isPublic, setIsPublic] = useState(data.public);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const images = useMemo(() => data.data.map(item => item.contentid.firstimage), [data.data]);
  const isContentLong = data.content && data.content.length > 150;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!flag) {
      setIsBookmarked(data.bookmark?.id || false);
      setIsLiked(data.like?.id || false);
    }
  }, [flag, data.like?.id, data.bookmark?.id]);

  const togglePrivacy = async () => {
    try {
      const newIsPublic = !isPublic;

      await axios.put(
        '/api/springboot/route/update-public',
        {},
        {
          params: {
            id: data.id,
            isPublic: newIsPublic,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsPublic(newIsPublic);
    } catch (error) {
      console.error('Error updating post privacy:', error);
    }
  };

  const handleNextImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

  const handlePreviousImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleBookmark = async () => {
    try {
      const newIsBookmarked = !isBookmarked;

      if (isBookmarked) {
        await axios.delete('/api/springboot/route/bookmark', {
          params: {
            id: data.id,
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
              id: data.id,
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
  const toggleLike = async () => {
    try {
      const newIsLiked = !isLiked;

      if (isLiked) {
        await axios.delete('/api/springboot/route/like', {
          params: {
            id: data.id,
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
              id: data.id,
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

  const handleEditPost = async () => {
    if (!token) {
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }

    sessionStorage.removeItem('myData');
    sessionStorage.removeItem('optionData');
    sessionStorage.removeItem('places');
    navigate(`/Createpost`, { state: { id: data.id } });
  };

  const handleDeletePost = async () => {
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await axios.delete('/api/springboot/route/locations', {
          params: {
            id: data.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (onDelete) {
          onDelete(data.id);
        }
      } catch (error) {}
    }
  };
  const handledetail = () => {
    navigate('/viewpost', { state: { id: data.id, flag: flag } });
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 2,
        border: cumBorder || '1px solid #cccccc',
        height: 'auto',
        boxShadow: cumBoxShadow,
        maxWidth: '1222px',
        minHeight: '270px',
      }}
    >
      <Box sx={{ position: 'relative', width: '270px' }}>
        <CardMedia
          component="img"
          sx={{ width: '270px', height: '270px', objectFit: 'cover' }}
          image={images[currentImageIndex] || ''}
          alt="이미지가 없습니다."
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <CircleIcon key={index} fontSize="small" sx={{ color: currentImageIndex === index ? '#555' : '#ccc' }} />
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <IconButton onClick={handlePreviousImage} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextImage} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          height: '100%',
          alignSelf: 'center',
        }}
      >
        <CardContent
          sx={{ flexGrow: 1, width: '100%', minHeight: '270px', textAlign: 'left', padding: '0.8em !important' }}
        >
          {data.courseName ? (
            <Typography
              component="div"
              variant="h6"
              sx={{
                fontWeight: 'bold',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              {data.courseName}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                component="div"
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                해당 코스는 임시 저장된 코스 입니다. 우측 작성 버튼을 클릭해서 게시물을 작성해 보세요!
              </Typography>
            </Box>
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginBottom: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{
              __html: data.content
                ? showFullContent
                  ? data.content
                  : isContentLong
                  ? `${data.content.slice(0, 150)}...`
                  : data.content.slice(0, 150)
                : '',
            }}
          />
          {isContentLong && (
            <span onClick={toggleContent} style={{ color: 'blue', cursor: 'pointer', float: 'right' }}>
              {showFullContent ? '숨기기' : '더보기'}
            </span>
          )}

          <Box sx={{ marginBottom: 2 }}>
            {data.tag.map((tag, index) => (
              <Chip key={index} label={'#' + tag} size="small" sx={{ marginRight: 1 }} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {data.courseName && (
                <>
                  <IconButton onClick={toggleLike}>
                    {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                  {/* <Typography>{likes}</Typography> */}
                  {!flag && (
                    <IconButton onClick={toggleBookmark}>
                      {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  )}
                </>
              )}
            </Box>

            {flag && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {data.courseName ? (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      onClick={togglePrivacy}
                      sx={{
                        cursor: 'pointer',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        MsUserSelect: 'none',
                        userSelect: 'none',
                      }}
                    >
                      {isPublic ? '공개' : '비공개'}
                    </Typography>
                    <Switch
                      checked={isPublic}
                      onChange={togglePrivacy}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#f6854f',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#f6854f',
                        },
                        '& .MuiSwitch-switchBase': {
                          color: '#cccccc',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: '#dddddd',
                        },
                      }}
                    />
                    <MyButton
                      control={control}
                      name="edit"
                      value="수정"
                      color="sunsetOrange"
                      margin="0"
                      onClick={handleEditPost}
                    />
                  </>
                ) : (
                  <MyButton
                    control={control}
                    name="create"
                    value="작성"
                    color="sunsetOrange"
                    margin="0"
                    onClick={handleEditPost}
                  />
                )}
                <MyButton
                  control={control}
                  name="delete"
                  value="삭제"
                  color="sunsetOrange"
                  margin="0"
                  onClick={handleDeletePost}
                />
              </Box>
            )}
          </Box>
          {flag2 && (
            <Box sx={{ textAlign: 'center' }}>
              <MyButton
                control={control}
                name="detail"
                value="모두 보기"
                color="roseBlush"
                border="none"
                margin="1em 0 0 0"
                width="100%"
                onClick={handledetail}
              />
            </Box>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
