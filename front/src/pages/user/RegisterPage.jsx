  import React, { useState } from 'react';
  import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
    Stack,
    IconButton,
  } from '@mui/material/';
  import SearchIcon from '@mui/icons-material/Search';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

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

  const RegisterPage = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    
    const [checked, setChecked] = useState(false);
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [nameError, setNameError] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [birthError, setBirthError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [registerError, setRegisterError] = useState('');
   

    /************************************************************************************************/
  /* 함수 정의 */
  
  //id 중복확인 기능
  const handleCheckDuplicateId = (id) => {
    // 중복 확인 로직 처리
    // ...
    
    // ID가 중복되지 않은 경우
    setIdError('');
  }
   
  
  // 생년월일 선택
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setBirthError('');
    };
  // Date 객체를 'yyyy-mm-dd' 형식의 문자열로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  // 동의 체크
    const handleAgree = (event) => {
      setChecked(event.target.checked);
    };
  
  

/************************************************************************************************/
/* 회원가입 데이터 요청 */
  
  {/* axios 요청*/}
  const regDataSend = async (data) => {
    try {
      const res = await regInsertDB(data);
      // 요청이 성공한 경우의 처리
      console.log(res.data); // 응답 데이터 출력 또는 처리
      navigate('/login'); //로그인 페이지로 이동
      

    } catch (error) {
      // 요청이 실패한 경우의 처리
      console.error(error); // 에러 메시지 출력 또는 처리
      setRegisterError('회원가입에 실패했습니다. 다시 확인해주세요.');
    }
  };


    {/* form 전송 */} 
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedDate) {
        setBirthError('생년월일을 선택해주세요.');
        return;
      }
      const data = new FormData(e.currentTarget);
    
      // 생년월일을 'yyyy-mm-dd' 형식으로 변환
    const formattedDate = selectedDate ? formatDate(selectedDate) : '';


      const regData = {
        id: data.get('id'),
        pw: data.get('pw'),
        rePw: data.get('rePw'),
        name: data.get('name'),
        birth: formattedDate, 
        email: data.get('email'),
      };
      console.log(regData);

      const { id,pw,rePw,name,birth,email } = regData;
      
    handleCheckDuplicateId(regData.id); // id 중복 확인 로직 호출

      //유효성 검사
      // ID
    const idRegex = /^[A-Za-z][A-Za-z0-9]{5,}$/;
    if (!idRegex.test(id)) 
      setIdError('영문자로 시작하고, 영문자와 숫자의 조합으로 6자리 이상이어야 합니다.');
      else setIdError('');

    // pw
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pwRegex.test(pw)) 
    setPwError('영문자, 숫자, 특수 문자의 조합으로 8자리 이상이어야 합니다.');
   else setPwError('');

    if (pw !== rePw) setPwError('비밀번호가 일치하지 않습니다.');
    else setPwError('');

  //이름
  const nameRegex = /^[a-zA-Z가-힣]+$/;
  if(!nameRegex.test(name)) 
  setNameError('이름은 한글 또는 영문으로 입력해주세요.')
  else setNameError('');

  //이메일
  const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
  else setEmailError('');
  
  //약관 동의
  if (!checked) alert('회원가입 약관에 동의해주세요.');

  if (
    idRegex.test(id) &&
    pwRegex.test(password) &&
    pw === rePw &&
    nameRegex.test(name) &&
    emailRegex.test(email) &&
    checked
  ) {
    regDataSend(regData);
  }
};



/************************************************************************************************/

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
              SF-DB 회원가입
            </Typography>
            <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                
                <Grid container spacing={2}>
{/* 아이디 입력 및 중복 확인 */}
                  <Grid item xs={12} sm={10}>
                    <TextField required fullWidth id="id" name="id" label="아이디" />
                  </Grid>
                <Grid item xs={12} sm={2}>
    <IconButton onClick={handleCheckDuplicateId}>
      <SearchIcon />
    </IconButton>
    {idError && <FormHelperTexts error>{idError}</FormHelperTexts>}
  </Grid>

{/* 비밀번호 입력 및 재확인 */}                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="pw"
                      name="pw"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      error={pwError !== ''}
                      helperText={pwError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="rePw"
                      name="rePw"
                      label="비밀번호 확인"
                      error={pwError !== ''}
                      helperText={pwError}
                    />
                  </Grid>
            

{/* 이름 및 생년월일 입력 */}
  <Grid item xs={12} sm={6}>
                    <TextField required autoFocus fullWidth id="name" name="name" label="이름"
                     error={nameError !== ''}
  helperText={nameError} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="생년월일"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} error={birthError !== ''} helperText={birthError}  />}
                      />
                    </LocalizationProvider>
                  </Grid>

{/* 이메일 입력 */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      error={emailError !== ''}
                      helperText={emailError}
                    />
                  </Grid>

{/* 약관 동의 */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox onChange={handleAgree} color="primary" />}
                      label="회원가입 약관에 동의합니다."
                    />
                  </Grid>
                </Grid>
             {/* 가입 요청 */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                  size="large"
                >
                  가입하기
                </Button>
              </FormControl>
              <FormHelperTexts>{registerError}</FormHelperTexts>
              </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };

  export default RegisterPage;
