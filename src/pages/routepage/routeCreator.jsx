import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoMap from '../../components/common/kakaoMap.jsx';
import MyCardControls from '../../components/common/MyCardControls.jsx';
import Grid from '@mui/material/Grid';
import MyButton from '../../components/common/MyButton.jsx';
import { styled } from '@mui/material/styles';
import { Box, RadioGroup, FormControlLabel, Radio, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const RouteCreator = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [places, setPlaces] = useState([]);
  const { region, neighborhoods, travelDate, selectedConcepts } = location.state || {};
  const [params, setParams] = useState({
    region: region,
    neighborhoods: neighborhoods,
    selectedConcepts: selectedConcepts,
    rec: 1,
  });

  const { control } = useForm();

  const GetData = async () => {
    try {
      const response = await axios.get('/api/flask/route/locations/', { params });
      setMyData(response.data);
      sessionStorage.setItem('myData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!region) return navigate('/region');
    if (!travelDate) return navigate('/extra');
    if (!selectedConcepts) return navigate('/concept');

    const storedData = sessionStorage.getItem('myData');
    if (storedData) {
      setMyData(JSON.parse(storedData));
      setLoading(false);
    } else {
      GetData();
    }
  }, [location.state]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('/api/flask/route/locations/sort/', { params });
      console.log(response.data);
      setPlaces(response.data);
    } catch (error) {
      console.error('Failed to fetch places:', error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const AnimatedGridItem = styled(Grid)(({ theme }) => ({
    transition: 'all 0.2s ease',
  }));

  const moveCardUp = useCallback(
    idx => {
      if (idx > 0) {
        const newItems = [...myData.data];
        [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
        setMyData(prevData => {
          const updatedData = { ...prevData, data: newItems };
          sessionStorage.setItem('myData', JSON.stringify(updatedData));
          return updatedData;
        });
      }
    },
    [myData]
  );

  const moveCardDown = useCallback(
    idx => {
      if (idx < myData.data.length - 1) {
        const newItems = [...myData.data];
        [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
        setMyData(prevData => {
          const updatedData = { ...prevData, data: newItems };
          sessionStorage.setItem('myData', JSON.stringify(updatedData));
          return updatedData;
        });
      }
    },
    [myData]
  );

  const removeCard = useCallback(
    idx => {
      const newItems = myData.data.filter((_, cardIdx) => cardIdx !== idx);
      setMyData(prevData => {
        const updatedData = { ...prevData, data: newItems };
        sessionStorage.setItem('myData', JSON.stringify(updatedData));
        return updatedData;
      });
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
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('/api/springboot/route/locations', myData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
          navigate(`/Createpost?id=${response.data}`);
          sessionStorage.removeItem('myData');
        } else {
          alert('코스 저장에 실패 했습니다.');
        }
      } catch (error) {
        console.error('Error saving course:', error);
      }
    } else {
      sessionStorage.setItem('myData', JSON.stringify(myData));
      navigate(`/login?redirect=${location.pathname}`);
    }
  };

  const retryRec = async () => {
    setParams({ ...params, rec: params.rec + 1 });
    setLoading(true);
    console.log(params);
    try {
      const response = await axios.get('/api/flask/route/locations/', { params });

      if (response.status === 200) {
        setMyData(response.data);
        sessionStorage.setItem('myData', JSON.stringify(response.data));
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

  const [headFilter, setHeadFilter] = useState('recom');

  const handleEditModeMethod = (event, newEditModeMethod) => {
    if (newEditModeMethod !== null) {
      setHeadFilter(newEditModeMethod);
    }
  };

  function subFilterFunction(val, label) {
    return (
      <FormControlLabel
        value={val}
        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 15 } }} />}
        label={label}
        sx={{
          fontSize: '14px',
          '& .MuiFormControlLabel-label': { fontSize: '12px' },
        }}
      />
    );
  }

  function myToggleBtn(val, text) {
    return (
      <ToggleButton
        value={val}
        aria-label={val}
        sx={{
          height: '40px',
          border: 'none',
          borderRadius: '25px !important',
          backgroundColor: headFilter === val ? '#333 !important' : 'transparent',
          color: headFilter === val ? '#fff !important' : '#000',
          '&:hover': {
            backgroundColor: headFilter === val ? '#333 !important' : '#f0f0f0',
          },
        }}
      >
        {text}
      </ToggleButton>
    );
  }

  const addPlaceToRoute = useCallback(
    place => {
      if (!myData.data.some(item => item.contentid === place.contentid)) {
        const newItems = [...myData.data, place];
        setMyData(prevData => {
          const updatedData = { ...prevData, data: newItems };
          sessionStorage.setItem('myData', JSON.stringify(updatedData));
          return updatedData;
        });
      } else {
        alert('이미 추가된 장소입니다.');
      }
    },
    [myData]
  );

  function editModeData() {
    if (!editMode) return;
    return (
      <div className="custom_editcontrol radius_border">
        <Box sx={{ p: 1 }}>
          <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={headFilter}
              exclusive
              onChange={handleEditModeMethod}
              aria-label="editModeMethod"
              sx={{
                width: '100%',
                '& .MuiToggleButton-root:first-child': { marginRight: '5px' },
                ml: 1.5,
              }}
            >
              {myToggleBtn('recom', '추천여행지')}
              {myToggleBtn('search', '검색결과')}
            </ToggleButtonGroup>
            {headFilter === 'search' && (
              <>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                  <FormControl sx={{ width: '95%' }}>
                    <Input
                      id="input-with-icon-adornment"
                      endAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{ cursor: 'pointer' }} />
                        </InputAdornment>
                      }
                      sx={{
                        background: '#eee',
                        borderRadius: '5px',
                        '&:before': { borderBottom: 'none !important' },
                        '&:after': { borderBottom: 'none' },
                      }}
                    />
                  </FormControl>
                </Box>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="travel"
                  sx={{ margin: '', display: 'block' }}
                >
                  {subFilterFunction('travel', '여행지')}
                  {subFilterFunction('restaurant', '음식점')}
                  {subFilterFunction('lodging', '숙소')}
                </RadioGroup>
              </>
            )}
          </Box>

          <Grid container style={{ maxHeight: headFilter === 'search' ? '490px' : '570px' }}>
            {places.map((place, index) => (
              <Grid item xs={12} key={place.contentid}>
                <Card
                  variant=""
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1,
                    textAlign: 'left',
                    borderBottom: 'inset 1px',
                    pt: 1,
                    pb: 0.5,
                  }}
                >
                  <Avatar variant="rounded" src={place.firstimage} alt="" sx={{ width: 60, height: 60, mr: 1 }} />
                  <CardContent sx={{ flexGrow: 1, p: 0, mr: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {place.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {place.addr1}
                    </Typography>
                  </CardContent>
                  <Button
                    sx={{
                      padding: '3px 0',
                      minWidth: '50px',
                      border: 'solid 1px',
                      color: 'black',
                      fontWeight: 500,
                    }}
                    onClick={() => addPlaceToRoute(place)}
                  >
                    추가
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }

  return (
    <div style={{ textAlign: '-webkit-center', marginBottom: '2em' }}>
      {loading ? (
        <div>
          <h1 className="main-title fw-bold">
            이대로 가유가 <br />
            AI 동네투어를 생성중이에유. <br />
          </h1>
        </div>
      ) : myData.data.length > 0 ? (
        <Box sx={{ width: '80%' }}>
          <Grid container spacing={3}>
            <AnimatedGridItem item xs={12}>
              <h1 style={{ textAlign: 'left' }}>오늘의 동네는 {myData.town}입니다.</h1>
            </AnimatedGridItem>
            <AnimatedGridItem item xs>
              <Box
                sx={{
                  border: 'solid 1px',
                  borderRadius: '20px 10px 10px 20px',
                  padding: '1em',
                  borderColor: '#a6a6a6',
                  height: '593px',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#2f3542',
                    backgroundClip: 'padding-box',
                    border: '4px solid transparent',
                  },
                  '& ::-webkit-scrollbar-track ': {
                    boxShadow: 'inset 0px 0px 5px white',
                  },
                }}
              >
                {repeatRoutesSubTitle(myData.data)}
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <MyButton
                  width="25%"
                  name="route"
                  control={control}
                  color="rosePink"
                  value="일정 편집하기"
                  onClick={toggleEditMode}
                />
              </Box>
            </AnimatedGridItem>

            {/* 지도는 항상 표시 */}
            <AnimatedGridItem item style={{ paddingTop: 0 }} xs={12} sm={12} md={12} lg={5} xl={7} xxl={7}>
              <KakaoMap name="location" control={control} center={myData.data} editModeData={editModeData()} />
            </AnimatedGridItem>

            <AnimatedGridItem item xs={12}>
              <Box sx={{ textAlign: 'right' }}>
                <MyButton
                  width="10%"
                  name="route"
                  control={control}
                  color="rosePink"
                  value="코스 저장하기"
                  onClick={saveCourse}
                />
                <MyButton
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
  );
};

export default RouteCreator;
