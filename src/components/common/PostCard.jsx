import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';

export default function PostCard({ data, cumBorder, cumBoxShadow, my = true }) {
  const [likes, setLikes] = useState(data.totlike || 0);
  const [isPublic, setIsPublic] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = data.data.map(item => item.contentid.firstimage);

  const handleLike = () => setLikes(likes + 1);
  const togglePrivacy = () => setIsPublic(!isPublic);
  const handleNextImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  const handlePreviousImage = () =>
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
        border: cumBorder || '1px solid #cccccc',
        height: '270px',
        boxShadow: cumBoxShadow,
      }}
    >
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

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', padding: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', width: '100%', textAlign: 'left', padding: 1 }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            {data.courseName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginBottom: 1 }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <Box sx={{ marginBottom: 2 }}>
            {data.tag.map((tag, index) => (
              <Chip key={index} label={'#' + tag} size="small" sx={{ marginRight: 1 }} />
            ))}
          </Box>
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
        {my && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 1 }}>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ marginRight: 1 }}>
              {isPublic ? '공개' : '비공개'}
            </Typography>
            <Switch checked={isPublic} onChange={togglePrivacy} />
          </Box>
        )}
      </Box>
    </Card>
  );
}
