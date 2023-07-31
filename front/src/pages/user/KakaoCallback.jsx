  import axios from 'axios';
  import React, { useState } from 'react'
  import config from '../../config';
import { kakaoSocialLogin } from '../../axios/user/loginLogic';
import { serialize } from 'cookie';
import { useNavigate } from 'react-router';
import { Alert, AlertTitle } from '@mui/material';

  const KakaoCallback = () => {
    const [loginAlert, setLoginAlert] = useState(null);
    const navigate = useNavigate();
  
    const kakaoRestAPIKey = config.kakaoClientId;
    const kakaoRedirectUri = config.kakaoRedirectUri;
  
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    
    if (code) {
      const grantType = 'authorization_code';
      const data = `grant_type=${grantType}&client_id=${kakaoRestAPIKey}&redirect_uri=${kakaoRedirectUri}&code=${code}`;
      axios
        .post('https://kauth.kakao.com/oauth/token', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        })
        .then((res) => {
          console.log(res);
          const { data } = res;
  const { access_token } = data;
  if(access_token) {
  console.log(`Bearer ${access_token}`);
  axios
      .post(
          "https://kapi.kakao.com/v2/user/me",
          {},
          {
            headers: {
              Authorization : `Bearer ${access_token}` ,
              "Content-type" : "application/x-www-form-urlencoded",
              },
          }
        )
        .then(async (res) => {
        console.log("카카오 유저 데이터  : ");
        console.log(res.data)
        const kakaoId = res.data.id // 카카오 회원번호
        const kakaoData = res.data.kakao_account // 카카오 회원 정보
        console.log(kakaoData);


        //서버에 id 전달
        const response = await kakaoSocialLogin(kakaoId)
        if(response === 1 ){
          console.log("카카오 로그인 성공");
          document.cookie = serialize('userId' , kakaoId , {path : '/'})
          navigate('/main')
          setLoginAlert(
            <Alert severity="success" onClose={() => setLoginAlert(null)}>
              <AlertTitle>로그인 성공!</AlertTitle>
            </Alert>
          );
        }
      });
      } else {
      console.log("access_token 없음");
  }
        })
        .catch((error) => {
          console.error('Error exchanging code for access token:', error);
        });
    }

    return (
      <>
      {loginAlert}
      </>
    )
  }

  export default KakaoCallback