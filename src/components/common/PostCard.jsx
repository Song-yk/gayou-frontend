// PostCard.jsx
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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// 공통 포스트 카드 컴포넌트
const PostCard = ({ title, description, location, imageUrl, likesCount, commentsCount }) => {
  const [likes, setLikes] = useState(likesCount);
  const [isPublic, setIsPublic] = useState(true);

  // 좋아요 클릭 핸들러
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // 공개/비공개 스위치 토글 핸들러
  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      {/* 이미지 부분 */}
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image={imageUrl || 'https://via.placeholder.com/160x160'}
        alt="Post image"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {/* 코스 이름 및 위치 */}
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {location}
          </Typography>

          {/* 설명 */}
          <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: 1 }}>
            {description}
          </Typography>

          {/* 좋아요, 댓글, 공유 아이콘 */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <IconButton onClick={handleLike}>
              <FavoriteIcon color="error" />
            </IconButton>
            <Typography>{likes}</Typography>
            <IconButton>
              <ChatBubbleIcon />
            </IconButton>
            <Typography>{commentsCount}</Typography>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </Box>
        </CardContent>

        {/* 공개/비공개 스위치 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 1 }}>
          <Typography variant="body2" color="text.secondary" component="p" sx={{ marginRight: 1 }}>
            {isPublic ? '공개' : '비공개'}
          </Typography>
          <Switch checked={isPublic} onChange={togglePrivacy} />
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
