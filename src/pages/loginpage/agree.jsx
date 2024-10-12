import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/common/MyButton';
import './agree.css';

function Agree() {
  const navigate = useNavigate();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [showTermsDetails, setShowTermsDetails] = useState(false);

  const ageRef = useRef(null);
  const privacyRef = useRef(null);
  const termsRef = useRef(null);

  const { control } = useForm({});

  useEffect(() => {
    setIsAllChecked(isAgeChecked && isPrivacyChecked && isTermsChecked);
  }, [isAgeChecked, isPrivacyChecked, isTermsChecked]);

  const joinGogo = event => {
    event.preventDefault();

    navigate('/join');
  };

  return (
    <div>
      <h3 className="title">
        이대로<span className="highlight">가유</span> 회원약관 동의
      </h3>

      <form onSubmit={joinGogo}>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isAgeChecked}
            onChange={() => setIsAgeChecked(!isAgeChecked)}
            ref={ageRef} // Attach ref to the checkbox
            required
          />
          본인은 만 14세 이상입니다. &nbsp;
          <span style={{ color: '#007bff' }}>(필수)</span>
        </label>

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isPrivacyChecked}
            onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
            ref={privacyRef} // Attach ref to the checkbox
            required
          />
          개인정보 수집에 동의합니다. &nbsp;
          <span style={{ color: '#007bff' }}>(필수)</span>
          <div
            className="view-link"
            onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            보기
          </div>
        </label>
        {showPrivacyDetails && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
            <p>
              <strong>개인정보 수집</strong>
            </p>
            <p>목적: 개인정보, 회원자격 유지 · 관리</p>
            <p>항목: 이름, 아이디, 이메일, 닉네임, 비밀번호</p>
            <p>보유기간: 회원탈퇴 시 즉시 파기</p>
          </div>
        )}

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={() => setIsTermsChecked(!isTermsChecked)}
            ref={termsRef} // Attach ref to the checkbox
            required
          />
          이용약관에 동의합니다. &nbsp;
          <span style={{ color: '#007bff' }}>(필수)</span>
          <div
            className="view-link"
            onClick={() => setShowTermsDetails(!showTermsDetails)}
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            보기
          </div>
        </label>
        {showTermsDetails && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid black' }}>
            <p>여기에 이용약관 세부 내용이 들어갑니다.</p>
          </div>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <MyButton
            name="prev"
            color="sunsetOrange"
            control={control}
            value="이전"
            borderRadius="5px"
            margin="0px"
            width="10%"
            onClick={() => {
              navigate(-1);
            }}
          />
          <MyButton
            type="submit"
            name="prev"
            color="sunsetOrange"
            control={control}
            value="다음"
            borderRadius="5px"
            margin="0px"
            width="10%"
          />
        </Box>
      </form>
    </div>
  );
}

export default Agree;
