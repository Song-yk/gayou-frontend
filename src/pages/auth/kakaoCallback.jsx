import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const kakaoLogin = async () => {
    const response = await axios.post('/api/springboot/auth/kakao/callback', { code: code });
    const token = response.data.token;
    localStorage.setItem('token', token);

    const redirectPath = searchParams.get('redirect') || '/';
    navigate(redirectPath);
  };

  useEffect(() => {
    kakaoLogin();
  }, []);
}
