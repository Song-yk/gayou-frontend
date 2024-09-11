import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import KakaoMap from '../../components/common/kakaoMap.jsx';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import Grid from '@mui/material/Grid';
import MyButtonField from '../../components/common/MyButtonField.jsx';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const RouteCreator = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const { control } = useForm();

  const GetData = async () => {
    try {
      const response = await axios.get('/api/flask/route/locations/');
      setMyData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const AnimatedGridItem = styled(Grid)(({ theme }) => ({
    transition: 'all 0.2s ease',
  }));

  const moveCardUp = useCallback(
    idx => {
      if (idx > 0) {
        const newItems = [...myData.data];
        [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
        setMyData(prevData => ({ ...prevData, data: newItems }));
      }
    },
    [myData]
  );

  const moveCardDown = useCallback(
    idx => {
      if (idx < myData.data.length - 1) {
        const newItems = [...myData.data];
        [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
        setMyData(prevData => ({ ...prevData, data: newItems }));
      }
    },
    [myData]
  );

  const removeCard = useCallback(
    idx => {
      const newItems = myData.data.filter((_, cardIdx) => cardIdx !== idx);
      setMyData(prevData => ({ ...prevData, data: newItems }));
    },
    [myData]
  );

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  function repeatRoutesSubTitle(obj) {
    return obj.map((location, index) => (
      <MyCardControls
        key={`location-${index}-${location.title}`}
        width="100%"
        image={location.firstimage}
        image2={location.firstimage2}
        title={location.title}
        overview={location.overview}
        idx={index}
        totalItems={obj.length}
        moveCardUp={() => moveCardUp(index)}
        moveCardDown={() => moveCardDown(index)}
        removeCard={() => removeCard(index)}
        showIcons={editMode}
      />
    ));
  }

  const saveCourse = async () => {
    try {
      myData.userId = 1;
      const response = await axios.post(
        '/api/springboot/route/locations',
        myData
      );

      if (response.status === 200) {
        console.log('Course saved successfully!');
      } else {
        console.log('Failed to save course.');
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const retryRec = async () => {
    setLoading(true);
    try {
      // const response = await axios.get('/api/flask/retryRec');
      const response = await axios.get('/api/flask/route/locations/');

      if (response.status === 200) {
        setMyData(response.data);
      } else {
        alert('Failed to get new recommendations.');
      }
    } catch (error) {
      console.error('Error getting new recommendations:', error);
      alert('An error occurred while getting new recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="options">
      <div style={{ textAlign: '-webkit-center' }}>
        {loading ? (
          <div>
            <h1 className="main-title fw-bold">
              이대로 가유가 <br />
              AI 동네투어를 생성중이에유. <br />
            </h1>
          </div>
        ) : myData.day > 0 ? (
          <Box sx={{ width: '80%' }}>
            <Grid container spacing={3}>
              <AnimatedGridItem item xs={12}>
                <h1 style={{ textAlign: 'left' }}>
                  오늘의 동네는 {myData.town}입니다.
                </h1>
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
                    {myData.courseName}
                  </h5>
                </Box>
                <Box
                  sx={{
                    border: 'solid 1px',
                    borderRadius: '20px 0px 0px 20px',
                    padding: '1em',
                    borderColor: '#a6a6a6',
                    height: '450px',
                    overflow: 'auto',
                  }}
                >
                  {repeatRoutesSubTitle(myData.data)}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <MyButtonField
                    width="25%"
                    name="route"
                    control={control}
                    color="rosePink"
                    value="일정 편집하기"
                    onClick={toggleEditMode}
                  />
                </Box>
              </AnimatedGridItem>
              <AnimatedGridItem
                item
                style={{ paddingTop: 0 }}
                xs={12}
                sm={12}
                md={4}
                lg={5}
                xl={7}
                xxl={7}
              >
                <KakaoMap
                  name="location"
                  control={control}
                  center={myData.data}
                />
              </AnimatedGridItem>
              <AnimatedGridItem item xs={12} md={12}>
                <Box sx={{ textAlign: 'right' }}>
                  <MyButtonField
                    width="10%"
                    name="route"
                    control={control}
                    color="rosePink"
                    value="코스 저장하기"
                    onClick={saveCourse}
                  />
                  <MyButtonField
                    width="10%"
                    name="route"
                    control={control}
                    color="sunsetOrange"
                    value="다시 추천 받기"
                    onClick={retryRec}
                  />
                </Box>
              </AnimatedGridItem>
            </Grid>
          </Box>
        ) : (
          <div>
            <h1 className="main-title fw-bold">No myData found.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCreator;
