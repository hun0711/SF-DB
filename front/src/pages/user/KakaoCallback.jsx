  import axios from 'axios';
  import React, { useState } from 'react'
  import config from '../../config';
import { kakaoSocialLogin } from '../../axios/user/loginLogic';
import { serialize } from 'cookie';
import { useNavigate } from 'react-router';

  const KakaoCallback = () => {
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
        const kakaoLoginData = res.data ;

        //서버에 로그인정보 전달
        const response = await kakaoSocialLogin(kakaoLoginData)
        if(response === 1 ){
          console.log("카카오 로그인 성공");
          /* document.cookie = serialize('userId' , kakaoId , {path : '/'}) */
          navigate('/main')
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
      </>
    )
  }

  export default KakaoCallback