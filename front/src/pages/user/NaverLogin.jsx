import React, { useEffect, useState } from "react";
import config from "../../config";
import { serialize } from "cookie";
import { useNavigate } from "react-router";
import { naverSocialLogin } from "../../axios/user/loginLogic";

const NaverLogin = () => {
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
        const { id, name, email, birthday, profile_image } = naverLogin.user;

        const naverLoginData = {
          id,
          name,
          email,
          birthday,
          profile_image,
        };

        const res = await naverSocialLogin(naverLoginData);
        if (res === 1) {
          console.log("네이버 로그인 성공!");
          console.log("프로필 이미지 URL:", profile_image);

          userAccessToken();
          document.cookie = serialize("userId", id, { path: '/' });
          document.cookie = serialize("userName", name, { path: '/' });
          document.cookie = serialize("userEmail", email, { path: '/' });
          document.cookie = serialize("userBirth", birthday, { path: '/' });
          document.cookie = serialize("userImage", profile_image, { path: '/' });

          navigate('/main')
        } else {
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
    script.onload = () => initializeNaverLogin();
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="naverIdLogin" style={{ textAlign: "center" }}>
    </div>
  );
};

export default NaverLogin;
