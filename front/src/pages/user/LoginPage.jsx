import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { userLoginDB } from '../../axios/user/loginLogic';

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
width: 100%;
padding-left: 16px;
font-weight: 700 !important;
color: #d32f2f !important;
`;

const Boxs = styled(Box)`
padding-bottom: 40px !important;
`;


const LoginPage = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [id , setId] = useState('');
  const [pw , setPw] = useState('');

  console.log(id);
  console.log(pw);

  const handleLogin = async(e) => {
    e.preventDefault();
   
    try {
      const loginData = {
        userId : id,
        userPw : pw
      }
      const res = await userLoginDB(loginData)
      console.log('로그인 성공:', res);
      navigate('./')
    } catch (error) {
      alert('에러 발생')
      console.error('로그인 실패:', error);
    }
   
  }


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
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          SF-DB 로그인
        </Typography>
        <Boxs component="form" noValidate sx={{ mt: 3 }} onSubmit={handleLogin}>
          <FormControl component="fieldset" variant="standard">
            
            <Grid container spacing={2}>

{/* 아이디 입력 */}                  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  name="id"
                  label="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
                  onChange={(e) => setPw(e.target.value)}
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
          </FormControl>
          <FormHelperTexts></FormHelperTexts>
          </Boxs>
      </Box>
    </Container>
  </ThemeProvider>
  )
}
export default LoginPage