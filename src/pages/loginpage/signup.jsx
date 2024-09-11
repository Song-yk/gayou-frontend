import React from 'react';
import './signup.css'; // CSS 파일을 가져옵니다.

import { useNavigate } from 'react-router-dom';


const signup = () => {
  const navigate = useNavigate();

  const goRegist = () => {
    navigate('/agree')

  }
  return (
    <div className="signup-container">
      <h1>
        이대로 <span className="highlight">가유</span>
      </h1>
      <p>
        이미 회원이신가요? <a href="/login" className="login-link">로그인하기</a>
      </p>

      <div className="signup-buttons">
        <button className="kakao-button">
          <img src="kakao-icon.png" alt="Kakao" />
          카카오로 3초만에 시작하기
        </button>
        <button className="email-button" onClick={goRegist}>
          <img src="email-icon.png" alt="Email" />
          이메일로 가입하기
        </button>
      </div>

      <p className="alternative-signup">다른 방식으로 가입하기</p>

      <button className="google-button">
        <img src="google-icon.png" alt="Google" />
      </button>
    </div>
    
  );
}

export default signup;
