import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(["댓글이 달렸습니다."]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');

    if (token) {
      setIsLoggedIn(true);
      setUser(userName || '사용자'); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('name'); 
    localStorage.removeItem('id');  
    setIsLoggedIn(false);              
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMyCourseClick = () => {
    navigate('/MyCourse');
  };

  const goToHome = () => {
    navigate(''); 
  };
  return (
    <div className="navbar">
      <div className="w-100 d-flex align-items-center justify-content-between">
        <img src={logo} alt="Logo" style={{ width: 'auto', height: '50px', marginLeft: '80px'}}
        onClick={goToHome} 
        />

        <div className="d-flex align-items-center" style={{ marginRight: '80px'}}>
          {isLoggedIn ? (
            <>
              {/* 알림 */}
              <Dropdown align="end" className="m-4">
                <Dropdown.Toggle as={Nav.Link} id="notification-dropdown">
                  <BellFill size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Dropdown.Item key={index}>
                        {notification}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>알림이 없습니다</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {/* 사용자 정보 */}
              <Dropdown align="end" className="m-4">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {user}
                </Dropdown.Toggle>

                <Dropdown.Menu>
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
