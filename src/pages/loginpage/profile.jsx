import React from 'react';
import './profile.css';

function profile() {
  return (
    <div className="account-settings-container">
      <div className="sidebar">
        <h2>계정 설정</h2>
        <ul>
          <li className="active">프로필 설정</li>
          <li>비밀번호 변경</li>
        </ul>
      </div>
      
      <div className="main-content">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <span>사용자</span>
          </div>
          <button className="upload-button">사진 업로드</button>
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              maxLength="16"
              value="최PM"
            />
            <small>한글 8자, 영문 및 숫자 16자까지 조합할 수 있어요.</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value="audrey_hui00@naver.com"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="introduction">소개</label>
            <textarea id="introduction" rows="4"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="phone">휴대폰 번호</label>
            <input
              type="text"
              id="phone"
              value="010-8699-2313"
              disabled
            />
            <button className="edit-button">변경</button>
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">생년월일</label>
            <input
              type="text"
              id="birthdate"
              value="2000-05-19"
              disabled
            />
          </div>

          <div className="form-group gender-location">
            <div className="gender">
              <label>성별</label>
              <div>
                <input type="radio" id="male" name="gender" value="male" checked />
                <label htmlFor="male">남성</label>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">여성</label>
              </div>
            </div>
            <div className="location">
              <label>지역</label>
              <input type="text" value="대전에 거주하시나요?" disabled />
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tag</label>
            <input
              type="text"
              id="tags"
              placeholder="원하는 연애 태그를 추가해보세요."
            />
          </div>

          <button type="submit" className="submit-button">변경 완료</button>
        </form>
      </div>
    </div>
  );
}

export default profile;
