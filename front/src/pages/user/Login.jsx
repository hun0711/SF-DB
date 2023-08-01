import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, FormControl, FormHelperText, Grid, Box, Typography, Container, Link, Snackbar, Alert} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { googleSocialLogin,userLoginDB } from '../../axios/user/loginLogic';
import { serialize } from 'cookie';
import config from '../../config';
import NaverLogin from './NaverLogin';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';
import { useSnackbar } from 'notistack';


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
  const [alertOn, setAlertOn] = useState(false);


  const { enqueueSnackbar } = useSnackbar(); 
  const handleClose = () => {
    setAlertOn(false)
  }

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
        document.cookie = serialize('userId', id, { path: '/' });
        console.log(document.cookie);
        navigate('/main');
        enqueueSnackbar('로그인에 성공했습니다!', { variant: 'success' });
        setAlertOn(true);
      } else {
        console.log('로그인 정보 재확인 필요');
      }
    } catch (error) {
      console.log(error);
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '280px', margin: 'auto' }}>
            {/*구글*/}
            <GoogleLogin />
            {/*네이버*/}
              <NaverLogin/>
            {/*카카오*/}
            <KakaoLogin/>
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
        <Snackbar open={alertOn} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            로그인에 성공했습니다!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
