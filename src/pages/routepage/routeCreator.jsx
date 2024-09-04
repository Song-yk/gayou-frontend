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
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');

  const { control } = useForm();

  const GetData = async () => {
    try {
      const response = await axios.get('/api/flask/route/locations/');
      setMyData(response.data);
      if (response.data.data && Object.values(response.data.data).length > 0) {
        setMapCenter(response.data.data['day1']);
        setSelectedDay('day1');
      }
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

  function repeatRoutes(obj) {
    return obj.map((location, index) => (
      <MyCardControls
        key={`location-${index}-${location.title}`}
        width="100%"
        image={location.firstimage}
        alt={location.title}
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

  function repeatRoutesSubTitle(obj) {
    return Object.values(obj).map((day, index) => (
      <React.Fragment key={`day-${index}`}>
        <Box key={`day-${index}-box`}>
          <h4 style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {index + 1}일차
          </h4>
        </Box>
        <Box
          key={`day-${index}-box2`}
          sx={{
            border: 'solid 1px',
            borderRadius: '20px',
            padding: '1em',
            borderColor: '#a6a6a6',
            height: '450px',
            overflow: 'auto',
          }}
        >
          {repeatRoutes(Object.values(day))}
        </Box>
      </React.Fragment>
    ));
  }

  function createMap(obj) {
    let app = [];
    app.push(
      <Box sx={{ marginBottom: '1em', float: 'left' }}>
        {Object.values(obj).map((dayKey, index) => (
          <MyButtonField
            key={`dayButton-${index}`}
            name="day"
            control={control}
            color={
              selectedDay === `day${index + 1}`
                ? 'sunsetOrangeSelected'
                : 'sunsetOrange'
            }
            value={`${index + 1}일차`}
            onClick={() => {
              setMapCenter(myData.data[`day${index + 1}`]); // Dynamically set the center based on the day
              setSelectedDay(`day${index + 1}`); // Update selected day
            }}
          />
        ))}
      </Box>
    );
    return app;
  }

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
                    {myData.courseTite}
                  </h5>
                </Box>
                {repeatRoutesSubTitle(myData.data)}
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
                {createMap(myData.data)}
                <KakaoMap
                  name="location"
                  control={control}
                  center={mapCenter}
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
            <h1 className="main-title fw-bold">No myData found.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCreator;
