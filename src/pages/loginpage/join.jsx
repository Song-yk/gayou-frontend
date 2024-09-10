import React, {useState} from 'react';
import './join.css';

function join() {
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [password, setPassword] = useState('');


  // 이메일 형식을 검사하는 정규표현식
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };


    // 입력된 이메일 값이 변경될 때 호출되는 함수
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
  
      // 이메일 형식이 맞지 않으면 오류 메시지 설정
      if (!validateEmail(value)) {
        setEmailErrorMessage('이메일 형식으로 입력해주세요');
      } else {
        setEmailErrorMessage(''); // 형식이 맞으면 오류 메시지 제거
      }
    };

    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setPassword(value);
  
      // 비밀번호 형식이 맞지 않으면 오류 메시지 설정
      if (!validatePassword(value)) {
        setPasswordErrorMessage('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이어야 합니다.');
      } else {
        setPasswordErrorMessage(''); // 형식이 맞으면 오류 메시지 제거
      }
    };
  

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <p>회원가입을 위한 정보를 입력해주세요.</p>
      
      <form>
        <div className="input-group">
          <input
            type="email"
            value={email}
            placeholder="이메일 주소를 입력해주세요."
            onChange= {handleEmailChange}
            className="input-field"
          />
          <button
            type="button"
            className="verify-button"
            disabled = {!emailErrorMessage}
          >
            인증
          </button>

          {emailErrorMessage && <p style={{ color: 'red' }}>{emailErrorMessage}</p>}

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
            value ={password}
            onChange={handlePasswordChange}
            placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            className="input-field"
          />
        </div>
        {passwordErrorMessage && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}

        <button type="button" className="submit-button" disabled={!passwordErrorMessage}>다음</button>
      </form>
    </div>
  );
}

export default join;
