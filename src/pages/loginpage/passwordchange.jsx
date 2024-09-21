import React, { useState } from 'react';
import './passwordchange.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordChange() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToChangeProfile = () => {
    navigate('/profile');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('id');
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const data = {
      id: userId,
      password: currentPassword,
      newPassword: newPassword,
    };

    axios.post('/api/springboot/auth/changePassword', data)
      .then(response => {
        alert("비밀번호가 변경되었습니다.");
      })
      .catch(error => {
        console.error('비밀번호 변경 중 오류 발생:', error);
        alert("비밀번호 변경에 실패했습니다.");
      });
  };

  return (
    <div className="password-change-container">
      <div className="sidebar">
        <h2>계정 설정</h2>
        <ul>
          <li onClick={goToChangeProfile}>프로필 설정</li>
          <li className="active">비밀번호 변경</li>
        </ul>
      </div>

      <div className="main-content">
        <form className="password-form" onSubmit={handlePasswordChange}>
          <div className="form-group">
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="input-field"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            변경 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
