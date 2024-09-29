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
    email: '',
    password: '',
  };

  const { handleSubmit, control, setError } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
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
        email: data.email,
        password: hashedPassword,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      const redirectPath = searchParams.get('redirect') || '/';
      navigate(redirectPath);
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            setError('email', { type: 'manual', message: '이메일이 잘못되었습니다.' });
            setError('password', { type: 'manual', message: '비밀번호가 잘못되었습니다.' });
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
      }
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
        <MyInput
          place="이메일"
          control={control}
          name="email"
          rules={{
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: '유효한 이메일 주소를 입력해 주세요.',
            },
          }}
        />
        <MyInput
          place="비밀번호"
          type="password"
          name="password"
          control={control}
          rules={{ required: '비밀번호를 입력하세요.' }}
        />
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

      <Box sx={{ mt: 2 }}>
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
