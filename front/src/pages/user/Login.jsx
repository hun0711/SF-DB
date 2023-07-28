import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, FormControl, FormHelperText, Grid, Box, Typography, Container, Link, Alert, AlertTitle, Snackbar } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { googleSocialLogin, naverSocialLogin, userLoginDB } from '../../axios/user/loginLogic';
import { serialize } from 'cookie';
import config from '../../config';
import { gapi } from 'gapi-script';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const Login = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loginAlert, setLoginAlert] = useState(null);


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
  

  {/* 사이트 자체 로그인 */}
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        userId: id,
        userPw: pw,
      };
      const res = await userLoginDB(loginData);
      console.log('로그인 결과:', res);
      if (res === 1) {
        setLoginAlert(
          <Alert severity="success" onClose={() => setLoginAlert(null)}>
            <AlertTitle>로그인 성공!</AlertTitle>
            <strong>메인페이지로 이동합니다</strong>
          </Alert>
        );
        document.cookie = serialize('userId', id, { path: '/' });
        console.log(document.cookie);
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      } else {
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
    }
  };

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

  {/* 네이버 로그인 */}
     const handleNaverLogin = async () => {
      try {
        // 네이버 아이디로 로그인 인스턴스 생성
        const naverLogin = new naver.LoginWithNaverId({
          clientId: config.naverClientId,
          callbackUrl: config.naverRedirectUri,
          isPopup: false,
          loginButton: { color: 'green', type: 3, height: 60 }, // 로그인 버튼 디자인 설정
        });

        // 초기화
        await naverLogin.init();

        // 로그인 상태 체크
        if (naverLogin.user) {
          // 사용자 정보
          const naverLoginData = {
           userId : naverLogin.user.id,
           userEmail : naverLogin.user.email,
           userName : naverLogin.user.nickname,
           userImage : naverLogin.user.profileImage
          }
          const res = await naverSocialLogin(naverLoginData);

          // 로그인 성공 여부에 따라 처리
          if (res.success) {
            console.log('로그인 성공');
            document.cookie = serialize('userId' , naverLoginData.userId , { path : '/'})
            document.cookie = serialize('userEmail' , naverLoginData.userEmail , { path : '/'})
            document.cookie = serialize('userName' , naverLoginData.userName , { path : '/'})
            document.cookie = serialize('userImage' , naverLoginData.userImage , { path : '/'})
            navigate('/main')
          } else {
            console.log('백엔드에서 로그인 처리 실패:', res.error);
          }
        } else {
          console.log('네이버 아이디로 로그인을 취소하였습니다.');
        }
      } catch (error) {
        console.error('네이버 아이디로 로그인 실패:', error);
      }
    };
  














  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <img
              src="/images/SF-DB.png"
              alt="SF-DB 로고"
              style={{ width: '180px', height: '180px' }}
            />
          </Box>
          <Typography variant="h5" gutterBottom marked="center" align="center" sx={{ fontWeight: 'bold' }}>
            회원 로그인
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/register" underline="always">
              아직 계정이 없으신가요?
            </Link>
          </Typography>
          <Boxs component="form" noValidate sx={{ mt: 3 }} onSubmit={handleLogin}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    name="id"
                    label="아이디"
                    value={id}
                    onChange={(e) => {
                      const value = e.target.value;
                      setId(value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="pw"
                    name="pw"
                    label="비밀번호"
                    value={pw}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPw(value);
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                size="large"
              >
                로그인
              </Button>

      {/* 소셜로그인 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', width: '280px', margin: 'auto' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/images/logo/google.png"
                alt="구글 로그인"
                style={{ width: '75px', height: '75px', cursor: 'pointer' }}
                onClick={handleGoogleLogin}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/images/logo/naver.png"
                alt="네이버 로그인"
                style={{ width: '70px', height: '70px', cursor: 'pointer' }}
                onClick={handleNaverLogin}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/images/logo/kakao.png"
                alt="카카오 로그인"
                style={{ width: '70px', height: '70px', cursor: 'pointer' }}
              />
            </div>
          </div>

              {/* 아이디 찾기와 비밀번호 찾기를 가로로 정렬 */}
              <Grid container justifyContent="center" spacing={2} sx={{ mt: 1 }}>
                <Grid item>
                  <Typography variant="body2">
                    <Link href="/findid" underline="always">
                      아이디 찾기
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <Link href="/findpw" underline="always">
                      비밀번호 찾기
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
            <FormHelperTexts></FormHelperTexts>
          </Boxs>
        </Box>
           <Snackbar
          open={loginAlert !== null}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={5000}
          onClose={() => setLoginAlert(null)}
        >
          {loginAlert}
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
