import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../../components/common/PostCard';
import defaultProfile from '../../assets/images/defaultProfile.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

const Postlist = () => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const areas = ['전체', '유성구', '대덕구', '서구', '중구', '동구'];
  const tags = [
    '자연',
    '관광지',
    '문화시설',
    '스포츠',
    '역사',
    '체험',
    '음식',
    '카페',
    '쇼핑',
    '빵지순례',
    '로컬 맛집',
    '지역축제',
    '예술/공연',
    '동네탐험',
    '반려동물',
    '아이',
  ];
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션 배열 상태
  const toggleSelection = (name) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(name)) {
        // 이미 선택된 경우, 배열에서 제거
        const updatedSelection = prevSelected.filter((option) => option !== name);
        return updatedSelection;
      } else {
        // 선택되지 않은 경우, 배열에 추가
        const updatedSelection = [...prevSelected, name];
        return updatedSelection;
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/springboot/route/datas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyData(response.data);

      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);
  const filteredData = myData.filter(post => {
    return selectedOptions.length === 0 || post.tag.some(tag => selectedOptions.includes(tag));
  });
  return (
    <Box className="home" sx={{ padding: '20px' }}>
      {loading ? (
        <CircularProgress />
      ) : myData ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box mt={5} sx={{ display: 'grid', gridTemplateColumns: '1fr 275px', gap: '5px' }}>
              <Box sx={{ border: 'solid 1px #aaa', borderRadius: '15px', padding: '1em', height: 'fit-content' }}>
                {filteredData.map((data, index) => (
                  <Box key={index} sx={{ borderBottom: 'solid 1px #ddd', marginBottom: '1em' }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar
                        src={data.userId.profilePicture || defaultProfile}
                        alt="profile"
                        sx={{ width: 35, height: 35 }}
                        onError={e => {
                          e.target.src = defaultProfile;
                        }}
                      />
                      <Typography variant="body1" ml={1}>
                        {data.userId.name}
                      </Typography>
                    </Box>
                    <Box>
                      <PostCard data={data} cumBorder="none" cumBoxShadow="none" flag={false} />
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ marginLeft: '10px' }}>
                <Typography variant="h5" component="p" className="fw-bold mt-4">
                  카테고리를 선택해 보세유!
                </Typography>
                <Divider />
                <Box mt={2}>
                  <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {areas.map(area => (
                      <Options key={area} named={area} onToggleSelection={toggleSelection} />
                    ))}
                  </Box>
                  <Divider sx={{ marginY: '10px' }} />
                  <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {tags.map(tag => (
                      <Options key={tag} named={tag} onToggleSelection={toggleSelection} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">No data found</Typography> // 데이터가 없을 때 메시지 표시
      )}
    </Box>
  );
};

function Options({ named, onToggleSelection }) {
  const [cl, setCl] = useState('transparent'); // 배경색 상태
  const [tx, setTx] = useState('black'); // 글자색 상태

  const changeCl = () => {
    if (cl === 'transparent') {
      setCl('#EA515B'); // 선택 시 배경색 변경
      setTx('white'); // 선택 시 글자색 변경
    } else {
      setCl('transparent'); // 선택 해제 시 배경색 초기화
      setTx('black'); // 선택 해제 시 글자색 초기화
    }
    // 부모 컴포넌트에서 선택 토글
    onToggleSelection(named);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: cl,
        color: tx,
        borderRadius: '10px',
        margin: '8px',
        padding: '5px 10px',
      }}
      onClick={changeCl}
    >
      #{named}
    </Button>
  );
}

export default Postlist;
