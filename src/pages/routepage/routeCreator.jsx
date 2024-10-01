import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  styled,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoMap from '../../components/common/kakaoMap.jsx';
import MyButton from '../../components/common/MyButton.jsx';
import MyCardControls from '../../components/common/MyCardControls.jsx';

const AnimatedGridItem = styled(Grid)(({ theme }) => ({
  transition: 'all 0.2s ease',
}));

const RouteCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { control } = useForm();

  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totItems, setTotItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const gridContainerRef = useRef(null);

  const { region = '', neighborhoods, travelDate, selectedConcepts } = location.state || {};
  const [params, setParams] = useState({
    region: region,
    neighborhoods: neighborhoods,
    selectedConcepts: selectedConcepts,
    page: 1,
    rec: 1,
  });

  const fetchData = async (url, options = {}) => {
    try {
      const response = await axios.get(url, { params, ...options });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const GetData = async () => {
    const data = await fetchData('/api/flask/route/locations/');
    setMyData(data);
    sessionStorage.setItem('myData', JSON.stringify(data));
    setLoading(false);
  };

  const fetchPlaces = async (page = 1) => {
    setIsFetching(true);
    const data = await fetchData('/api/flask/route/locations/sort/', {
      params: {
        ...params,
        query: searchQuery,
        page: page,
      },
    });
    setTotItems(data.total_items);
    setPlaces(prevPlaces => ({
      query: searchQuery,
      data: [...(prevPlaces?.data || []), ...data.data],
    }));

    sessionStorage.setItem(
      'places',
      JSON.stringify({
        query: searchQuery,
        data: [...(places?.data || []), ...data.data],
      })
    );

    setIsFetching(false);
  };

  useEffect(() => {
    if (!neighborhoods.length) return navigate('/region');
    if (!travelDate) return navigate('/extra');
    if (!selectedConcepts) return navigate('/concept');

    const loadData = async () => {
      const optionData = {
        region: region,
        neighborhoods: neighborhoods,
        selectedConcepts: selectedConcepts,
      };

      const storedData = sessionStorage.getItem('myData');
      const places = JSON.parse(sessionStorage.getItem('places'));
      if (storedData && places.data && sessionStorage.getItem('optionData') === JSON.stringify(optionData)) {
        setMyData(JSON.parse(storedData));
        setPlaces(places);
        setSearchQuery(places.query);
        setLoading(false);
      } else {
        sessionStorage.setItem('optionData', JSON.stringify(optionData));
        setLoading(true);
        await GetData();
        await fetchPlaces(currentPage);
        setLoading(false);
      }
    };

    loadData();
  }, [location.state]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!gridContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = gridContainerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 50 && !isFetching) {
        setIsFetching(true);
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    if (totItems <= (places?.data || []).length) return;

    const gridContainer = gridContainerRef.current;

    if (gridContainer) {
      gridContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridContainer) {
        gridContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [editMode, gridContainerRef.current, isFetching, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchPlaces(currentPage);
    }
  }, [currentPage]);

  const moveCard = useCallback(
    (idx, direction) => {
      const newItems = [...myData.data];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];
      setMyData(prevData => {
        const updatedData = { ...prevData, data: newItems };
        sessionStorage.setItem('myData', JSON.stringify(updatedData));
        return updatedData;
      });
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

  const repeatRoutesSubTitle = data =>
    data.map((location, index) => (
      <MyCardControls
        key={`repeatRoutesSubTitle-${location.contentid}-${index}`}
        width="100%"
        image={location.firstimage}
        image2={location.firstimage2}
        title={location.title}
        overview={location.overview}
        idx={index}
        totalItems={data.length}
        moveCardUp={() => moveCard(index, 'up')}
        moveCardDown={() => moveCard(index, 'down')}
        removeCard={() => removeCard(index)}
        showIcons={editMode}
      />
    ));

  const handleSaveCourse = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      sessionStorage.setItem('myData', JSON.stringify(myData));
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }

    try {
      const response = await axios.post('/api/springboot/route/locations', myData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        sessionStorage.removeItem('myData');
        sessionStorage.removeItem('optionData');
        sessionStorage.removeItem('places');
        navigate(`/createpost`, { state: { id: response.data } });
      } else {
        alert('코스 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('코스를 저장하는 중 오류가 발생했습니다.');
    }
  };

  const retryRecommendation = async () => {
    setParams({ ...params, rec: params.rec + 1 });
    setLoading(true);
    try {
      const data = await fetchData('/api/flask/route/locations/');
      setMyData(data);
      sessionStorage.setItem('myData', JSON.stringify(data));
    } catch (error) {
      alert('새로운 추천을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const renderEditMode = (page = 1) => {
    const handleSearch = async () => {
      setIsFetching(true);
      const data = await fetchData('/api/flask/route/locations/sort/', {
        params: {
          ...params,
          query: searchQuery,
          page: page,
        },
      });
      setTotItems(data.total_items);
      setPlaces(prevPlaces => ({
        query: searchQuery,
        data: data.data,
      }));

      sessionStorage.setItem(
        'places',
        JSON.stringify({
          query: searchQuery,
          data: data.data,
        })
      );
      setIsFetching(false);
    };

    return (
      editMode && (
        <div className="custom_editcontrol radius_border">
          <Box sx={{ p: 1 }}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <FormControl sx={{ width: '95%' }}>
                <Input
                  id="input-with-icon-adornment"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  endAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={handleSearch} // 검색 버튼 클릭 시 검색 요청
                      />
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

            <Grid container ref={gridContainerRef} style={{ maxHeight: '560px' }}>
              {places.data.map((place, index) => (
                <Grid item xs={12} key={`container-${place.contentid}-${index}`}>
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
            {isFetching && <div>로딩중...</div>}
          </Box>
        </div>
      )
    );
  };
  return (
    <div style={{ textAlign: '-webkit-center', marginBottom: '2em' }}>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
                  height: '620px',
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
                  width="fit"
                  name="route"
                  control={control}
                  color="rosePink"
                  value="일정 편집하기"
                  onClick={() => setEditMode(!editMode)}
                />
              </Box>
            </AnimatedGridItem>

            {/* 지도는 항상 표시 */}
            <AnimatedGridItem
              item
              style={{ paddingTop: 0, marginTop: '24px' }}
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={7}
              xxl={7}
            >
              <KakaoMap name="location" control={control} center={myData.data} editModeData={renderEditMode()} />
            </AnimatedGridItem>

            <AnimatedGridItem item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'left' }}>
                  <MyButton
                    width="10%"
                    name="dlwjs"
                    control={control}
                    color="sunsetOrange"
                    value="이전"
                    onClick={() => navigate(-1)}
                  />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <MyButton
                    width="fit"
                    name="route"
                    control={control}
                    color="rosePink"
                    value="코스 저장하기"
                    onClick={handleSaveCourse}
                  />
                  <MyButton
                    width="fit"
                    name="route"
                    control={control}
                    color="sunsetOrange"
                    value="다시 추천 받기"
                    onClick={retryRecommendation}
                    sx={{ marginLeft: '1em' }} // Optional: to add spacing between the buttons
                  />
                </Box>
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
