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

  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: config.naverClientId,
      callbackUrl: config.naverRedirectUri,
      clientSecret: config.naverClientSecret,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: "50" },
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

        const res = await naverSocialLogin(naverLoginData)
        if(res === 1) {
          console.log("네이버 로그인 성공!");
          console.log("사용자 아이디:", id);
          console.log("사용자 닉네임:", nickname);
          console.log("사용자 이메일:", email);
          console.log("프로필 이미지 URL:", profile_image);
        }else{
          console.log("Naver 로그인 실패");
        }
        
      } else {
    
      }
    });
  };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    script.charset = "utf-8";
    script.onload = () => {
      initializeNaverLogin();
    } ,   
    
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
