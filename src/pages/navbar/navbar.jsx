import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import defaultProfileImage from '../../assets/images/defaultProfile.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(['댓글이 달렸습니다.']);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const hideButtonPages = ['/', '/region', '/extra', '/concept', '/routeCreator'];
  const shouldHideButton = hideButtonPages.includes(location.pathname);

  const GetData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/springboot/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setUsername(data.username || '사용자');
        setProfilePicture(data.profilePicture || defaultProfileImage);
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류 발생:', error);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    GetData();
    setIsLoggedIn(true);
    setUser(name || '사용자');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMyCourseClick = () => {
    navigate('/myCourse');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToRegion = () => {
    navigate('/region');
  };

  return (
    <div className="navbar">
      <div className="h-100 w-100 d-flex align-items-center justify-content-between">
        <img src={logo} alt="Logo" style={{ width: 'auto', height: '50px', marginLeft: '80px' }} onClick={goToHome} />

        <div className="d-flex align-items-center" style={{ marginRight: '80px' }}>
          {!shouldHideButton && (
            <>
              <Button
                className="fw-bold btn-lg m-4 btn-light rounded-pill"
                style={{ border: '1px solid black', backgroundColor: '#F7527a', color: 'white' }}
                onClick={goToRegion}
              >
                AI 코스 추천
              </Button>
              <div
                style={{
                  width: '3px',
                  height: '40px',
                  backgroundColor: '#908f91',
                }}
              />
            </>
          )}

          {isLoggedIn ? (
            <>
              <img
                src={profilePicture}
                alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '20px',
                }}
              />

              <Dropdown align="end" className="m-4">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                  <Dropdown.ItemText>
                    <div className="d-flex align-items-center">
                      <img
                        src={profilePicture}
                        alt="Profile"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          marginRight: '10px',
                        }}
                      />
                      <span>{user}</span>
                    </div>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleMyCourseClick}>나의 코스</Dropdown.Item>
                  <Dropdown.Item onClick={handleProfileClick}>계정 설정</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Button
              className="fw-bold btn-lg m-4 rounded-pill btn-light"
              style={{ border: '1px solid black' }}
              href="/login"
            >
              로그인 및 회원가입
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
