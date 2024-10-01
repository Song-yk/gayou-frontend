import { useState } from 'react';
import './passwordchange.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handlePasswordChange = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    const curPW = CryptoJS.SHA256(currentPassword).toString();
    const newPW = CryptoJS.SHA256(newPassword).toString();

    const data = {
      password: curPW,
      newPassword: newPW,
    };

    try {
      const response = await axios.post('/api/springboot/auth/changePassword', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('비밀번호가 변경되었습니다.');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : '비밀번호 변경에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-change-container">
      <div className="pwchange-main-content">
        <form className="password-form" onSubmit={handlePasswordChange}>
          <div className="form-group">
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="input-field"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호"
              className="input-field"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className="input-field"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? '변경 중...' : '변경 완료'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
