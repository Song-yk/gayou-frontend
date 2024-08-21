import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Navbar from '../navbar/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import KakaoMap from '../../forms/kakaoMap.jsx';
import MyCardControls from '../../forms/MyCardControls.jsx';
import Grid from '@mui/material/Grid';
import MyButtonField from '../../forms/MyButtonField.jsx';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const RouteCreator = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapHeight, setMapHeight] = useState('500px');

  const { control } = useForm();

  const GetData = async () => {
    const response = await axios.get('api/route/locations');
    setLocations(response.data);
    setLoading(false);

    if (response.data.length > 0) {
      const calculatedHeight = `${response.data.length * 116.4}px`;
      setMapHeight(calculatedHeight);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const AnimatedGridItem = styled(Grid)(({ theme }) => ({
    transition: 'all 0.2s ease',
  }));

  return (
    <div className="options">
      <Navbar />
      <div style={{ textAlign: '-webkit-center' }}>
        {loading ? (
          <div>
            <h1 className="main-title fw-bold">
              이대로 가유가 <br />
              AI 동네투어를 생성중이에유. <br />
            </h1>
          </div>
        ) : locations.length > 0 ? (
          <Box sx={{ width: '80%' }}>
            <Grid container spacing={3}>
              <AnimatedGridItem item xs={12}>
                <h1 style={{ textAlign: 'left' }}>오늘의 동네는 OOO입니다.</h1>
              </AnimatedGridItem>
              <AnimatedGridItem
                item
                xs
                sx={{
                  border: 'solid 1px',
                  borderRadius: '20px',
                  padding: '2em',
                  borderColor: '#a6a6a6',
                }}
              >
                <Box>
                  <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>
                    코스명
                  </h3>
                </Box>
                <Box
                  sx={{
                    border: 'solid 1px',
                    borderRadius: '20px',
                    borderColor: '#a6a6a6',
                    paddingLeft: '1em',
                    marginBottom: '2em',
                    textAlign: 'left',
                  }}
                >
                  <h5 style={{ margin: '5px 0', fontWeight: 'bold' }}>
                    계족산에서 힐링 한 바가지 두 바가지
                  </h5>
                </Box>
                <Box>
                  <h4 style={{ textAlign: 'left', fontWeight: 'bold' }}>
                    1일차
                  </h4>
                </Box>
                <Box
                  sx={{
                    border: 'solid 1px',
                    borderRadius: '20px',
                    padding: '1em',
                    borderColor: '#a6a6a6',
                    height: '450px',
                    overflow: 'auto',
                  }}
                >
                  {locations.map((location, index) => (
                    <MyCardControls
                      key={index}
                      width="100%"
                      image={location.firstimage}
                      alt={location.title}
                      title={location.title}
                      description={location.title}
                    />
                  ))}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <MyButtonField
                    width="25%"
                    name="route"
                    control={control}
                    color="rosePink"
                    value="일정 편집하기"
                  />
                </Box>
              </AnimatedGridItem>
              <AnimatedGridItem
                item
                xs={12}
                sm={12}
                md={6}
                lg={7}
                xl={7}
                xxl={7}
              >
                <Box>
                  <KakaoMap
                    name="location"
                    control={control}
                    center={locations}
                    height={mapHeight}
                  />
                </Box>
              </AnimatedGridItem>
              <AnimatedGridItem item xs={12} md={12}>
                <Box sx={{ textAlign: 'right' }}>
                  <MyButtonField
                    width="10%"
                    name="route"
                    control={control}
                    color="rosePink"
                    value="코스 저장하기"
                  />
                  <MyButtonField
                    width="10%"
                    name="route"
                    control={control}
                    color="sunsetOrange"
                    value="다시 추천 받기"
                  />
                </Box>
              </AnimatedGridItem>
            </Grid>
          </Box>
        ) : (
          <div>
            <h1 className="main-title fw-bold">No locations found.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCreator;
