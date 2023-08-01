import React from 'react'
import RegisterPage from './pages/user/RegisterPage'
import LoginPage from './pages/user/LoginPage'
import { Route, Routes } from 'react-router'
import MainPage from './pages/main/MainPage'
import theme from './utils/theme'
import { ThemeProvider } from '@mui/material'
import StartPage from './pages/start/StartPage'
import NaverLogin from './pages/user/NaverLogin'
import KakaoCallback from './pages/user/KakaoCallback'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
    <Routes>
      {/* 첫 시작 페이지*/}
      <Route path="/" exact={true} element={<StartPage />} />
      {/* 메인페이지 */}
      <Route path="/main" exact={true} element={<MainPage />} />
      {/* 로그인페이지 */}
      <Route path="/login" exact={true} element={<LoginPage />} />
      {/* 카카오 콜백 */}
      <Route path="/auth/kakao" exact={true} element={<KakaoCallback />} />
      {/* 회원가입페이지 */}
      <Route path="/register" exact={true} element={<RegisterPage />} />
    
    </Routes>
    </ThemeProvider>
    </SnackbarProvider>
    </>
  )
}

export default App