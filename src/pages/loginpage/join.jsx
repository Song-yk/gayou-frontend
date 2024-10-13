import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Switch from '@mui/material/Switch';

import './profile.css';
import { Box } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import MyInput from '../../components/common/MyInput';
import MyButton from '../../components/common/MyButton';
import defaultProfileImage from '../../assets/images/defaultProfile.png';
function Join() {
  const [showAuthNumberField, setShowAuthNumberField] = useState(false);
  const [timer, setTimer] = useState(300);
  const [remainingTime, setRemainingTime] = useState(timer);
  const [sentAuthNumber, setSentAuthNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');
  const [isLocal, setIsLocal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const defaultValues = {
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    birthday: '',
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const { handleSubmit, control, trigger, getValues, setError, clearErrors } = useForm({
    defaultValues: defaultValues,
  });

  const submission = async data => {
    if (!isVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일이 인증되지 않았습니다.',
      });
      return;
    }

    try {
      const birthday = data.birthday;
      const year = birthday.substring(0, 2);
      const month = birthday.substring(2, 4);
      const day = birthday.substring(4, 6);

      const currentYear = new Date().getFullYear();
      const fullYear = year <= String(currentYear).substring(2) ? `20${year}` : `19${year}`;

      const formattedBirthday = `${fullYear}-${month}-${day}`;

      const hashedPassword = CryptoJS.SHA256(data.password).toString();

      const submissionData = {
        ...data,
        birthday: formattedBirthday,
        password: hashedPassword,
      };

      const res = await axios.post('/api/springboot/auth/register', submissionData);
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 409:
            alert('이미 존재하는 사용자입니다. 다른 이메일을 사용하세요.');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
    }
  };

  const sendVerificationEmail = async () => {
    const isEmailValid = await trigger('email');
    if (isEmailValid) {
      try {
        setShowAuthNumberField(true);
        setRemainingTime(300);
        const response = await axios.post('/api/springboot/email/join', {
          email: getValues('email'),
        });
        setSentAuthNumber(response.data);
        setIsEmailSent(true);
        clearErrors('email');
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          switch (statusCode) {
            case 429:
              setError('email', { type: 'manual', message: '인증 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.' });
              break;
            case 500:
              setError('email', { type: 'manual', message: error.response.data });
              break;
            default:
              setError('email', { type: 'manual', message: '이메일 전송 중 알 수 없는 오류가 발생했습니다.' });
          }
        } else {
          setError('email', { type: 'manual', message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.' });
        }
      }
    }
  };
  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const verifyAuthNumber = () => {
    const userEnteredNumber = getValues('authenticationNumber');
    if (parseInt(userEnteredNumber) === parseInt(sentAuthNumber)) {
      setIsVerified(true);
      alert('인증번호가 성공적으로 확인되었습니다.');
    } else {
      setIsVerified(false);
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    if (remainingTime > 0 && isEmailSent) {
      const timerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [remainingTime, isEmailSent]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Box>
      <h3>회원 가입</h3>
      <p>회원가입을 위한 정보를 입력해주세요.</p>
      <div className="profile-picture-section">
        <div className="profile-picture">
          <img src={profilePicture || defaultProfileImage} alt="Profile" className="profile-image" />
        </div>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-button"
          style={{ display: 'none' }}
        />
        <label
          htmlFor="fileInput"
          className="btn btn-lg btn-light"
          style={{ border: '1px solid black', marginLeft: '20px' }}
        >
          사진 업로드
        </label>
      </div>
      <form onSubmit={handleSubmit(submission)}>
        <Box>
          <Box>
            <MyInput
              type="text"
              label="이름"
              name="name"
              control={control}
              rules={{
                required: '이름은 필수 항목입니다.',
                minLength: {
                  value: 2,
                  message: '이름은 최소 2자 이상이어야 합니다.',
                },
              }}
            />
          </Box>
          <MyInput
            type="email"
            label="이메일"
            name="email"
            control={control}
            width="61%"
            rules={{
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: '유효한 이메일 주소를 입력해 주세요.',
              },
            }}
          />
          <MyButton
            className="verificationEmailBtn"
            width="fit-content"
            name="verificationEmailBtn"
            color="sunsetOrange"
            control={control}
            value="인증번호 받기"
            borderRadius="5px"
            onClick={sendVerificationEmail}
          />
        </Box>

        {showAuthNumberField && (
          <Box>
            <MyInput
              type="number"
              place="인증번호"
              name="authenticationNumber"
              control={control}
              width="63%"
              rules={{
                required: '인증번호는 필수 항목입니다.',
              }}
            />
            <span
              className="authentication-span"
              style={{
                marginLeft: '14px',
                color: 'red',
                verticalAlign: 'middle',
              }}
            >
              {formatTime(remainingTime)}
            </span>
            <MyButton
              className="authentication-btn"
              width="fit-content"
              name=""
              color="sunsetOrange"
              control={control}
              value="인증"
              borderRadius="5px"
              onClick={verifyAuthNumber}
            />
          </Box>
        )}
        <Box>
          <MyInput
            type="password"
            label="비밀번호"
            name="password"
            control={control}
            rules={{
              required: '비밀번호는 필수 항목입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이어야 합니다.',
              },
            }}
          />
        </Box>

        <Box>
          <MyInput
            type="password"
            label="비밀번호 확인"
            name="passwordChk"
            control={control}
            rules={{
              required: '비밀번호 확인은 필수 항목입니다.',
              validate: value => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
            }}
          />
        </Box>

        <Box>
          <MyInput
            type="text"
            label="* 전화번호"
            name="phoneNumber"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: '전화번호는 10~11자리 숫자만 입력 가능합니다.',
              },
            }}
          />
        </Box>

        <Box>
          <MyInput
            type="number"
            label="* 생년월일"
            place="생년월일 6자리"
            name="birthday"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]{6}$/,
                message: '생년월일은 6자리 입니다.',
              },
            }}
          />
        </Box>


        <div className="form-group gender-location" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="gender w-50">
            <label style={{ display: 'block', textAlign: 'left' }}>성별</label>
            <div className="gender-options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="male" style={{ width: '40px' }}>
                남성
              </label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                style={{ width: '10px' }}
                onChange={e => setGender(e.target.value)}
              />
              <label htmlFor="female" style={{ width: '40px', marginLeft: '0' }}>
                여성
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                style={{ width: '10px' }}
                onChange={e => setGender(e.target.value)}
              />
            </div>
          </div>

          <div className="location w-50">
            <div>
              <label>대전거주하세요?</label>
              <label className="switch">

                <Switch {...label} checked={isLocal} onChange={() => setIsLocal(!isLocal)} />
              </label>
              <span>{isLocal ? '예' : '아니요'}</span>
            </div>
          </div>
          <MyButton
            name=""
            color="sunsetOrange"
            control={control}
            value="가입하기"
            borderRadius="5px"
            margin="0px"
            width="50%"
            onClick={handleSubmit(submission)}
          />
        </div>
      </form>
    </Box>
  );
}

export default Join;
