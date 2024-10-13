import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from '../../components/common/PostCard';
import MyButton from '../../components/common/MyButton';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const MyCourse = () => {
  const [myData, setMyData] = useState(null);
  const { control } = useForm({});
  const navigate = useNavigate();

  const GetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/springboot/route/locations', {
        params: {
          flag: true,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleDeletePost = id => {
    setMyData(prevData => prevData.filter(post => post.id !== id));
  };

  return (
    <Box>
      {myData && myData.length > 0 ? (
        <Box>
          {myData.map((data, index) => (
            <PostCard key={index} data={data} onDelete={handleDeletePost} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ fontSize: '3em' }}>아직 활동한 코스가 없어요.</Box>
          <Box sx={{ fontSize: '1.5em' }}>신나는 여행을 즐겨 보시는게 어떠신가요?</Box>
          <MyButton
            control={control}
            name="newRecommend"
            onClick={() => navigate('/region')}
            value="여행 가기"
            width="fit-content"
            color="rosePink"
          />
        </Box>
      )}
    </Box>
  );
};

export default MyCourse;
