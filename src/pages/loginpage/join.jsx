import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Box } from '@mui/material';
import MyInput from '../../components/common/MyInput';
import MyButton from '../../components/common/MyButton';

function Join() {
  const [showAuthNumberField, setShowAuthNumberField] = useState(false);
  const [timer, setTimer] = useState(300);
  const [remainingTime, setRemainingTime] = useState(timer);
  const [sentAuthNumber, setSentAuthNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    username: '',
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    birthday: '',
  };

  const { handleSubmit, control, trigger, getValues } = useForm({
    defaultValues: defaultValues,
  });

  const submission = data => {
    if (!isVerified) {
      setError('authenticationNumber', {
        type: 'manual',
        message: '이메일 인증이 완료되지 않았습니다.',
      });
      return;
    }
    try {
      const birthday = data.birthday;
      const year = birthday.substring(0, 2); // YY
      const month = birthday.substring(2, 4); // MM
      const day = birthday.substring(4, 6); // DD

      // 현재 연도를 기준으로 YY를 YYYY로 변환
      const currentYear = new Date().getFullYear();
      const fullYear = year <= String(currentYear).substring(2) ? `20${year}` : `19${year}`;

      // 변환된 날짜를 YYYY-MM-DD 00:00:00.000000 형식으로 만들기
      const formattedBirthday = `${fullYear}-${month}-${day}`;

      const hashedPassword = CryptoJS.SHA256(data.password).toString();
      // 변환된 birthday를 포함하여 데이터 전송
      const submissionData = {
        ...data,
        birthday: formattedBirthday,
        password: hashedPassword,
      };
      axios
        .post('/api/springboot/auth/register', submissionData)
        .then(res => {
          if (res.status === 200) {
            navigate('/login');
          }
        })
        .catch(error => {
          alert('회원 가입에 실패 하셨습니다.');
        });
    } catch (error) {
      alert('회원 가입에 실패 하셨습니다.');
    } finally {
      console.log();
    }
  };

  const sendVerificationEmail = async () => {
    const isEmailValid = await trigger('email');
    if (isEmailValid) {
      setShowAuthNumberField(true);
      setRemainingTime(300);
      try {
        const response = await axios.post('/api/springboot/email/join', {
          email: getValues('email'),
        });
        console.log(response.data);
        setSentAuthNumber(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const verifyAuthNumber = () => {
    const userEnteredNumber = getValues('authenticationNumber');
    console.log(userEnteredNumber);
    console.log(sentAuthNumber);
    if (parseInt(userEnteredNumber) === parseInt(sentAuthNumber)) {
      setIsVerified(true);
      alert('인증번호가 성공적으로 확인되었습니다.');
    } else {
      setIsVerified(false);
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 타이머 시작.
    const timer = setInterval(() => {
      // 남은 시간이 0보다 크면 1초씩 감소시킴.
      if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1);
      } else {
        // 남은 시간이 0이 되면 타이머 정지.
        clearInterval(timer);
      }
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머 정지
    return () => clearInterval(timer);
  }, [remainingTime]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleResendClick = () => {
    setRemainingTime(timer);
  };

  return (
    <Box>
      <h3>회원 가입</h3>
      <p>회원가입을 위한 정보를 입력해주세요.</p>
      <form onSubmit={handleSubmit(submission)}>
        <Box>
          <MyInput
            type="text"
            label="아이디"
            name="username"
            control={control}
            rules={{
              required: '아이디는 필수 항목입니다.',
              minLength: {
                value: 3,
                message: '아이디는 최소 3자 이상이어야 합니다.',
              },
              pattern: {
                value: /^[A-Za-z0-9]{3,15}$/,
                message: '아이디는 3~15자리의 알파벳과 숫자만 허용됩니다.',
              },
            }}
          />
        </Box>
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

        <Box>
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
            label="전화번호"
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
            label="생년월일"
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

        <MyButton
          name=""
          color="sunsetOrange"
          control={control}
          value="가입하기"
          borderRadius="5px"
          margin="0px"
          width="100%"
          onClick={handleSubmit(submission)}
        />
      </form>
    </Box>
  );
}

export default Join;
