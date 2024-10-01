import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box, Chip } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';

export default function PostCard({ data, cumBorder = null, cumBoxShadow = null, my = true }) {
  const [likes, setLikes] = useState(data.totlike || 0);
  const [isPublic, setIsPublic] = useState(data.public);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);

  const images = data.data.map(item => item.contentid.firstimage);

  const handleLike = () => setLikes(likes + 1);

  const togglePrivacy = async () => {
    try {
      const newIsPublic = !isPublic;
      setIsPublic(newIsPublic);

      const token = localStorage.getItem('token');
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
    } catch (error) {
      console.error('Error updating post privacy:', error);
      setIsPublic(isPublic);
    }
  };

  const handleNextImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  const handlePreviousImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const isContentLong = data.content && data.content.length > 100;

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
        border: cumBorder || '1px solid #cccccc',
        height: 'auto',
        boxShadow: cumBoxShadow,
        maxWidth: '1222px',
      }}
    >
      <Box sx={{ position: 'relative', width: '35%', height: '270px' }}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          image={images[currentImageIndex] || 'https://via.placeholder.com/160x160'}
          alt="Post image"
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

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '65%', padding: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', width: '100%', textAlign: 'left', padding: 1 }}>
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
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginBottom: 1 }}
            dangerouslySetInnerHTML={{
              __html: data.content ? (showFullContent ? data.content : `${data.content.slice(0, 100)}...`) : '',
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

          {/* 아이콘 버튼과 공개 컴포넌트의 분리된 배치 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 왼쪽에 위치한 IconButton 그룹 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handleLike}>
                <FavoriteIcon color="error" />
              </IconButton>
              <Typography>{likes}</Typography>
              <IconButton>
                <ChatBubbleIcon />
              </IconButton>
              <IconButton>
                <BookmarkIcon />
              </IconButton>
            </Box>

            {/* 오른쪽에 위치한 공개 Switch */}
            {my && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {isPublic ? '공개' : '비공개'}
                </Typography>
                <Switch checked={isPublic} onChange={togglePrivacy} />
                <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
                  수정
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
