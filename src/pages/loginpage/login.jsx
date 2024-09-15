import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Typography, Link, Box, Grid } from '@mui/material';
import MyInput from '../../components/common/MyInput';
import MyButton from '../../components/common/MyButton';
import kakaoLoginImg from '../../assets/images/kakao_login_medium_narrow.png';
import googleLoginImg from '../../assets/images/web_light_sq_SI@1x.png';

function Login() {
  const defaultValues = {
    username: '',
    password: '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    // 카카오 API 초기화
    const kakaoApiKey = import.meta.env.REACT_APP_KAKAO_API_KEY;

    if (kakaoApiKey && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log('카카오 로그인 성공:', authObj);
        // 카카오 로그인 성공 시 처리 로직 추가
      },
      fail: function (err) {
        console.error('카카오 로그인 실패:', err);
      },
    });
  };

  const onSubmit = async data => {
    try {
      const hashedPassword = CryptoJS.SHA256(data.password).toString();
      // 서버의 로그인 API 엔드포인트로 POST 요청을 보냅니다.
      const response = await axios.post('/api/springboot/auth/login', {
        username: data.username,
        password: hashedPassword,
      });

      // 로그인 성공 시 처리
      console.log('로그인 성공:', response.data);
      // 예를 들어, JWT 토큰을 로컬 스토리지에 저장할 수 있습니다.
      localStorage.setItem('token', response.data.token);

      // 로그인 후 리다이렉트
      window.location.href = '/'; // 원하는 페이지로 리다이렉트
    } catch (error) {
      console.error('로그인 실패:', error);
      // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        이대로 <span style={{ color: 'orange' }}>가유</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        아직 회원이 아니세요?{' '}
        <Link href="/signup" style={{ color: 'pink', textDecoration: 'none' }}>
          간편 회원가입
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
        <MyInput place="아이디 혹은 이메일" control={control} name="username" />
        <MyInput place="비밀번호" type="password" name="password" control={control} />
        <MyButton
          type="submit"
          control={control}
          name=""
          value="로그인"
          width="100%"
          color="roseBlush"
          borderColor="#ffd6d6"
          margin="0"
        />
      </form>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2">SNS 간편 로그인</Typography>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <img
              src={kakaoLoginImg}
              alt="카카오 로그인 버튼"
              width={'150'}
              style={{ cursor: 'pointer' }}
              onClick={handleKakaoLogin}
            />
          </Grid>
          <Grid item>
            <img src={googleLoginImg} alt="구글 로그인 버튼" width={'150'} />
          </Grid>
        </Grid>
      </Box>

      <Link
        href="/forgot-password"
        style={{
          display: 'block',
          marginTop: '10px',
          color: 'gray',
          textDecoration: 'none',
        }}
      >
        비밀번호 찾기
      </Link>
    </Box>
  );
}

export default Login;
