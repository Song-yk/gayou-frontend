import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Typography, Link, Box, Grid } from '@mui/material';
import MyInput from '../../components/common/MyInput';
import MyButton from '../../components/common/MyButton';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultValues = {
    username: '',
    password: '',
  };

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    // 카카오 API 초기화
    const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (kakaoApiKey && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_TARGET + '/auth/kakao/callback',
      scope: 'account_email',
    });
  };

  const onSubmit = async data => {
    try {
      const hashedPassword = CryptoJS.SHA256(data.password).toString();
      const response = await axios.post('/api/springboot/auth/login', {
        username: data.username,
        password: hashedPassword,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      const redirectPath = searchParams.get('redirect') || '/';
      navigate(redirectPath);
    } catch (error) {
      console.error('로그인 실패:', error);
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
        <Link href="/agree" style={{ color: 'pink', textDecoration: 'none' }}>
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
              src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
              alt="카카오 로그인 버튼"
              style={{ cursor: 'pointer' }}
              width="150"
              onClick={handleKakaoLogin}
            />
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
