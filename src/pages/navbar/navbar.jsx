import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Button, Dropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import defaultProfileImage from '../../assets/images/defaultProfile.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(['댓글이 달렸습니다.']);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const hideButtonPages = ['/', '/region', '/extra', '/concept', '/routeCreator'];
  const shouldHideButton = hideButtonPages.includes(location.pathname);
  const hidePostPages = ['/postlist'];
  const shouldHidePost = hidePostPages.includes(location.pathname);

  const GetData = async () => {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const profilePicture = localStorage.getItem('profilePicture');
    if (token) {
      setUsername(name || '사용자');
      setProfilePicture(profilePicture === null ? profilePicture : defaultProfileImage);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('profilePicture');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div
      className="navbar"
      style={{ backgroundColor: '#fff', padding: '10px 0', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="h-100 w-100 d-flex align-items-center justify-content-between">
        <img
          src={logo}
          alt="Logo"
          style={{ width: 'auto', height: '50px', marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />

        <div className="d-flex align-items-center" style={{ marginRight: '10px' }}>
          {isLoggedIn && !shouldHidePost && (
            <Box
              sx={{ cursor: 'pointer', marginRight: '20px', fontWeight: 'bold' }}
              onClick={() => navigate('/postlist')}
            >
              게시물 보러가기
            </Box>
          )}
          {!shouldHideButton && (
            <Box
              sx={{ cursor: 'pointer', marginRight: '20px', fontWeight: 'bold' }}
              onClick={() => navigate('/region')}
            >
              AI 코스 추천
            </Box>
          )}

          {isLoggedIn ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-2" style={{ textAlign: '-webkit-center' }}>
                <Dropdown.ItemText>
                  <div className="d-flex align-items-center" style={{ justifyContent: 'center' }}>
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
                    <span>{username}</span>
                  </div>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => navigate('/myCourse')}>내 활동</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/profile')}>계정 설정</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              className="fw-bold btn-lg rounded-pill btn-light"
              style={{ border: '1px solid black', padding: '5px 20px' }}
              onClick={() => navigate('/login')}
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
