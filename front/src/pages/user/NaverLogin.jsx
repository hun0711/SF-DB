import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { serialize } from "cookie";
import { Alert, AlertTitle } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router";
import { naverSocialLogin } from "../../axios/user/loginLogic";

const NaverLogin = () => {
  const [loginAlert, setLoginAlert] = useState(null);
  const navigate = useNavigate();

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    document.cookie = serialize("naverToken", token, { path: '/' });
   
  };

  
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: config.naverClientId,
      callbackUrl: config.naverRedirectUri,
      clientSecret: config.naverClientSecret,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: "46" },
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const { id, nickname, email, profile_image } = naverLogin.user;

        const naverLoginData = {
          id,
          nickname,
          email,
          profile_image,
        };

        const res = await naverSocialLogin(naverLoginData);
        if (res === 1) {
          console.log("네이버 로그인 성공!");
          console.log("사용자 아이디:", id);
          console.log("사용자 닉네임:", nickname);
          console.log("사용자 이메일:", email);
          console.log("프로필 이미지 URL:", profile_image);
          userAccessToken();
          document.cookie = serialize("userId", id, { path: '/' });
          navigate('/main')
          setLoginAlert(
            <Alert severity="success" onClose={() => setLoginAlert(null)}>
              <AlertTitle>로그인 성공!</AlertTitle>
            </Alert>
          );
        } else {
          console.log("Naver 로그인 실패");
          setLoginAlert(
            <Alert severity="warning" onClose={() => setLoginAlert(null)}>
              <AlertTitle>로그인 실패</AlertTitle>
              <strong>입력 정보를 다시 확인해주세요</strong>
            </Alert>
          );
        }
      } else {
      }
    });
  };



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    script.charset = "utf-8";
    script.onload = () => initializeNaverLogin();
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="naverIdLogin" style={{ textAlign: "center" }}>
      {loginAlert}
    </div>
  );
};

export default NaverLogin;
