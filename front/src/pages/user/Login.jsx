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
  Link,
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


const Login = () => {
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
      console.log('로그인 결과:', res);
      if(res == 1){
        alert("로그인 성공!")
        navigate('/')
      }else{
        alert("입력 정보를 다시 확인해주세요.")
      }
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

{/* 아이디 입력 */}                  
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
    </Container>
  </ThemeProvider>
  )
}
export default Login