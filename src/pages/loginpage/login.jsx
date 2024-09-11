import React from 'react';
import './login.css';  // 스타일을 위한 CSS 파일
// import kakaoLogo from './assets/images/kakao.JPG';
// import googleLogo from './assets/images/google.WEBP';


function login() {
  return (
    <div className="login-container">
      <h1>
        이대로 <span className="highlight">가유</span>
      </h1>
      <p>아직 회원이 아니세요? <a href="/signup" className="signup-link">간편 회원가입</a></p>
      
      <form className="login-form">
        <input type="email" placeholder="이메일" className="input-field" required />
        <input type="password" placeholder="비밀번호" className="input-field" required />
        <button type="submit" className="login-button">로그인</button>
      </form>

      <div className="sns-login">
        <p>SNS 간편 로그인</p>
        <div className="sns-buttons">
          <button className="kakao-button">
            <img src="kakao-icon.png" alt="Kakao" />
          </button>
          <button className="google-button">
            <img src="google-icon.png" alt="Google" />
          </button>
        </div>
      </div>

      <a href="/forgot-password" className="forgot-password-link">비밀번호 찾기</a>
    </div>
  );
}

export default login;
