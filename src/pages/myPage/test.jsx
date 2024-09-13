import React, { useState } from "react";
import PostCard from '../../components/common/PostCard.jsx';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Switch,
  Box,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";

// Post 컴포넌트 정의
const Post = () => {
  const [likes, setLikes] = useState(11);
  const [comments] = useState(23);
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
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image="https://via.placeholder.com/160x160" // 이미지 부분
        alt="Post image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            코스 이름입니다.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            코스 등재 (EX, 대전 서구)
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p" sx={{ marginTop: 1 }}>
            코스 요약 설명 간입니다. 코스 요약 설명 간입니다. 코스 요약 설명 간입니다. 코스 요약 설명 간입니다.
          </Typography>

          {/* 좋아요, 댓글, 공유 아이콘 */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <IconButton onClick={handleLike}>
              <FavoriteIcon color="error" />
            </IconButton>
            <Typography>{likes}</Typography>
            <IconButton>
              <ChatBubbleIcon />
            </IconButton>
            <Typography>{comments}</Typography>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: 1 }}>
          <Typography variant="body2" color="text.secondary" component="p" sx={{ marginRight: 1 }}>
            {isPublic ? "공개" : "비공개"}
          </Typography>
          <Switch checked={isPublic} onChange={togglePrivacy} />
        </Box>
      </Box>
    </Card>
  );
};

// Test 컴포넌트 정의
const Test = () => {
    return (
      <Box sx={{ padding: 2 }}>
        {/* 여러 개의 포스트 카드 사용 */}
        <PostCard
          title="코스 이름입니다."
          location="코스 등재 (EX, 대전 서구)"
          description="코스 요약 설명 간입니다. 코스 요약 설명 간입니다. 코스 요약 설명 간입니다."
          imageUrl="https://via.placeholder.com/160x160"
          likesCount={11}
          commentsCount={23}
        />
        <PostCard
          title="다른 코스 이름입니다."
          location="코스 등재 (서울 강남구)"
          description="다른 코스 설명입니다. 추가로 설명을 더할 수 있습니다."
          imageUrl="https://via.placeholder.com/160x160"
          likesCount={15}
          commentsCount={34}
        />
        <PostCard
          title="세 번째 코스 이름"
          location="코스 등재 (부산 해운대)"
          description="이 코스는 해운대 주변을 탐방하는 코스입니다."
          imageUrl="https://via.placeholder.com/160x160"
          likesCount={8}
          commentsCount={12}
        />
      </Box>
    );
  };
  

export default Test;
