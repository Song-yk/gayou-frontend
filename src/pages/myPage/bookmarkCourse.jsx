import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import PostCard from '../../components/common/PostCard';
import MyButton from '../../components/common/MyButton';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const BookmarkCourse = () => {
  const [myData, setMyData] = useState(null);
  const { control } = useForm({});
  const navigate = useNavigate();

  const GetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/springboot/route/bookmark', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Box>
      {myData && myData.length > 0 ? (
        <Box>
          {myData.map((data, index) => (
            <PostCard key={index} data={data} flag={false} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ fontSize: '3em' }}>아직 저장한 코스가 없어요.</Box>
          <Box sx={{ fontSize: '1.5em' }}>다른 사람들의 여행 게시물을 확인 해보시는 건 어떠신가요?</Box>
          <MyButton
            control={control}
            name="newRecommend"
            onClick={() => navigate('/postlist')}
            value="게시물 구경가기"
            width="fit-content"
            color="rosePink"
          />
        </Box>
      )}
    </Box>
  );
};

export default BookmarkCourse;
