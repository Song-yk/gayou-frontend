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
    const name = response.data.name;
    localStorage.setItem('name', name);

    const id = response.data.userId;
    localStorage.setItem('id', 1);

    const redirectPath = searchParams.get('redirect') || '/';
    navigate(redirectPath);
  };

  useEffect(() => {
    kakaoLogin();
  }, []);
}
