import React, { useState,useEffect  } from 'react';
import './agree.css';
import { useNavigate } from 'react-router-dom';

function agree() {
  
  const navigate = useNavigate();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);


  const joinGogo = () => {
    navigate('/join')
  }

  const handleIndividualCheck = () => {
    setIsAllChecked(isAgeChecked && isPrivacyChecked && isTermsChecked);
  };

  useEffect(() => {
    setIsAllChecked(isAgeChecked && isPrivacyChecked && isTermsChecked);
  }, [isAgeChecked, isPrivacyChecked, isTermsChecked]);

  return (
    <div className="terms-container">
      <h1 className="title">이대로 <span className="highlight">가유</span> 회원약관 동의</h1>
      
      <form>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isAgeChecked}
            onChange={() => {
              setIsAgeChecked(!isAgeChecked);
              handleIndividualCheck();
            }}
            required
          />
          본인은 만 14세 이상입니다. <span className="required">(필수)</span>
        </label>
        
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isPrivacyChecked}
            onChange={() => {
              setIsPrivacyChecked(!isPrivacyChecked);
              handleIndividualCheck();
            }}
            required
          />
          개인정보 수집에 동의합니다. <span className="required">(필수)</span> 
          <div className="view-link">보기</div>
          </label>
          {isPrivacyChecked &&(
          
        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
            <p><strong>개인정보 수집</strong></p>
            <p>목적: 개인정보, 회원자격 유지 · 관리</p>
            <p>항목: 이름, 아이디, 이메일, 닉네임, 비밀번호</p>
            <p>보유기간: 회원탈퇴 시 즉시 파기</p>
            </div>
            )
          }
        
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={() => {
              setIsTermsChecked(!isTermsChecked);
              handleIndividualCheck();
            }}
            required
          />
          이용약관에 동의합니다. <span className="required">(필수)</span>
          <div className="view-link">보기</div>
        </label>
        {isTermsChecked &&( 
        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
            <p>여기에 이용약관 세부 내용이 들어갑니다.</p>
            </div>
        )
        }

        <button type="submit" className="submit-button" onClick={joinGogo}  disabled = {!isAllChecked} >
          다음
        </button>
      </form>
    </div>
  );
}

export default agree;
