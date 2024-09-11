import React from 'react';
import './passwordchange.css';

function passwordchange() {
  return (
    <div className="password-change-container">
      <div className="sidebar">
        <h2>계정 설정</h2>
        <ul>
          <li>프로필 설정</li>
          <li className="active">비밀번호 변경</li>
        </ul>
      </div>

      <div className="main-content">
        <form className="password-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">변경 완료</button>
        </form>
      </div>
    </div>
  );
}

export default passwordchange;
