import React, { useEffect, useState } from 'react'
import { gapi } from 'gapi-script';
import { Alert, AlertTitle } from '@mui/material';
import { googleSocialLogin } from '../../axios/user/loginLogic';
import config from '../../config';
import { serialize } from 'cookie';


const GoogleLogin = () => {
  const [loginAlert, setLoginAlert] = useState(null);


{/* 구글 sdk */}
useEffect(() => {
  const loadGoogleApiScript = async () => {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';

        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
      });
    } catch (error) {
      console.error('Google API 스크립트 로드 실패:', error);
    }
  };

  loadGoogleApiScript();
}, []);



 {/*  구글 로그인 처리 함수 */}
 const handleGoogleLogin = async () => {
  try {
    if (!gapi.auth2) {
      // 구글 API 스크립트 로드를 기다리기 위해 promise를 사용
      await new Promise((resolve) => {
        gapi.load('auth2', resolve);
      });
    }

    // 'gapi.auth2'가 초기화되지 않았다면 초기화
    if (!gapi.auth2.getAuthInstance()) {
      gapi.auth2.init({
        client_id: config.googleClientId,
        cookie_policy: 'single_host_origin',
      });
    }

    const auth2 = gapi.auth2.getAuthInstance();

    const googleUser = await auth2.signIn();
    // 구글 로그인 성공 시 처리
    const googleLoginData = {
      tokenId: googleUser.getAuthResponse().id_token,
      userId : googleUser.getBasicProfile().getEmail()
    };

    // 스프링 백엔드와 통신하여 처리
    const res = await googleSocialLogin(googleLoginData); // 스프링 백엔드의 구글 로그인 API 엔드포인트로 대체
    console.log('Google 로그인 결과:', res);

    if (res === 1) {
      document.cookie = serialize('userId', googleLoginData.userId, { path: '/' });
      document.cookie = serialize('tokenId', googleLoginData.tokenId, { path: '/'});
      console.log(document.cookie);
      setLoginAlert(
        <Alert severity="success" onClose={() => setLoginAlert(null)}>
          <AlertTitle>로그인 성공!</AlertTitle>
          <strong>메인페이지로 이동합니다</strong>
        </Alert>
      );
      setTimeout(() => {
        navigate('/main');
      }, 2000)
    } else {
      console.log('Google 로그인 실패');
      setLoginAlert(
        <Alert severity="warning" onClose={() => setLoginAlert(null)}>
          <AlertTitle>로그인 실패</AlertTitle>
          <strong>입력 정보를 다시 확인해주세요</strong>
        </Alert>
      );
    }
  } catch (error) {
    setLoginAlert(
      <Alert severity="error" onClose={() => setLoginAlert(null)}>
        <AlertTitle>에러 발생</AlertTitle>
      </Alert>
    );
    console.error('Google 로그인 에러:', error);
  }
};



  return (
    <>
        <div style={{ textAlign: 'center' }}>
          <img
          src="/images/logo/googlebtn2.png"
          alt="구글 로그인"
          style={{ width: '237px', height: '55px', cursor: 'pointer' }}
          onClick={handleGoogleLogin}
        />
            </div>
    </>
  )
}

export default GoogleLogin