import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ActivityCard from '../../components/common/ActivityCard';

const MyCourse = () => {
  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetData = async () => {
    // try {
    //   const response = await axios.get('/api/springboot/route/locations');
    //   setMyData(response.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }
    setLoading(false);
    setMyData();
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Box>
      {/* {loading ? (
        <div>
          <h1 className="main-title fw-bold">
            이대로 가유가 <br />
            AI 동네투어를 생성중이에유. <br />
          </h1>
        </div>
      ) : myData.items.length > 0 ? ( */}
        <Box>
          
        </Box>
      {/* ) : (
        <div>
          <h1 className="main-title fw-bold">No myData found.</h1>
        </div>
      )} */}
    </Box>
  );
};

export default MyCourse;
