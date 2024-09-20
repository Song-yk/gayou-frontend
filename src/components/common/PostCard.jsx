import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Switch,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';

export default function PostCard({ data }) {
  const [likes, setLikes] = useState(data.likesCount || 0);
  const [isPublic, setIsPublic] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 여러 이미지가 있을 때 처리 (contentid 배열의 firstimage 사용)
  const images = data.data.map(item => item.contentid.firstimage);

  // 좋아요 클릭 핸들러
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // 공개/비공개 스위치 토글 핸들러
  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  // 이미지 변경 핸들러
  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: 2, border: '1px solid #cccccc' }}>
      {/* 이미지 슬라이더 부분 */}
      <Box sx={{ position: 'relative', width: '40%' }}>
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
          {/* 이미지 인디케이터 (작은 점들) */}
          {images.map((_, index) => (
            <CircleIcon
              key={index}
              fontSize="small"
              sx={{
                color: currentImageIndex === index ? '#555' : '#ccc',
              }}
            />
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
            padding: 1,
          }}
        >
          {/* 이전 이미지로 이동하는 버튼 */}
          <IconButton
            onClick={handlePreviousImage}
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* 다음 이미지로 이동하는 버튼 */}
          <IconButton
            onClick={handleNextImage}
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 코스 정보 부분 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', padding: 2 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {/* 코스 이름 및 위치 */}
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            {data.courseName || '코스 이름입니다.'}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{ marginBottom: 1 }}
          >
            {data.data[0].addr1} {data.data[0].addr2} ({data.data[0].areacode})
          </Typography>

          {/* 설명 */}
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginBottom: 1 }}
          >
            {data.data[0].overview || '코스 요약 설명이 들어갑니다.'}
          </Typography>

          {/* 해시태그 */}
          <Box sx={{ marginBottom: 2 }}>
            <Chip label="#해시태그1" size="small" sx={{ marginRight: 1 }} />
            <Chip label="#해시태그2" size="small" />
          </Box>

          {/* 좋아요, 댓글, 공유 아이콘 */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike}>
              <FavoriteIcon color="error" />
            </IconButton>
            <Typography>{likes}</Typography>
            <IconButton>
              <ChatBubbleIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </Box>
        </CardContent>

        {/* 공개/비공개 스위치 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginRight: 1 }}
          >
            {isPublic ? '공개' : '비공개'}
          </Typography>
          <Switch checked={isPublic} onChange={togglePrivacy} />
        </Box>
      </Box>
    </Card>
  );
}
