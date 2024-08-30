import React from 'react';
import './join.css';

function join() {
  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <p>회원가입을 위한 정보를 입력해주세요.</p>
      
      <form>
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            className="input-field"
          />
          <button
            type="button"
            className="verify-button"
          >
            인증
          </button>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="input-field"
          />
          <span className="timer"></span>
          <button
            type="button"
            className="verify-button"
          >
            확인
          </button>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임"
            className="input-field"
          />
          <button
            type="button"
            className="verify-button"
          >
            확인
          </button>
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            className="input-field"
          />
        </div>
        
        <button type="button" className="submit-button">다음</button>
      </form>
    </div>
  );
}

export default join;
