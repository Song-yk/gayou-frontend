import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(["댓글이 달렸습니다."]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');

    if (token) {
      setIsLoggedIn(true);  // 로그인 상태
      setUser(userName || '사용자'); 
    } else {
      setIsLoggedIn(false); // 비로그인 상태
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('name'); 
    localStorage.removeItem('id');  
    setIsLoggedIn(false);              
  };

  return (
    <div className="navbar">
      <div className="container d-flex align-items-center justify-content-end">
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
                <Dropdown.Item href="#action/1">나의 코스</Dropdown.Item>
                <Dropdown.Item href="#action/2">계정 설정</Dropdown.Item>
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
  );
};

export default Navbar;