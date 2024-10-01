import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from '../../components/common/PostCard';

const MyCourse = () => {
  const [myData, setMyData] = useState(null);

  const GetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/springboot/route/locations', {
        params: {
          flag: false,
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
            <PostCard key={index} data={data} onDelete={handleDeletePost} flag2={false} />
          ))}
        </Box>
      ) : (
        <Box>No Data Available</Box>
      )}
    </Box>
  );
};

export default MyCourse;
