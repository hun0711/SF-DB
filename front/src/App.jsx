import React from 'react'
import RegisterPage from './pages/user/RegisterPage'
import LoginPage from './pages/user/LoginPage'
import { Route, Routes } from 'react-router'
import MainPage from './pages/main/MainPage'
import theme from './utils/Theme'
import { ThemeProvider } from '@mui/material'
import StartPage from './pages/start/StartPage'

const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Routes>
      {/* 첫 시작 페이지*/}
      <Route path="/" exact={true} element={<StartPage />} />
      {/* 메인페이지 */}
      <Route path="/main" exact={true} element={<MainPage />} />
      {/* 로그인페이지 */}
      <Route path="/login" exact={true} element={<LoginPage />} />
      {/* 회원가입페이지 */}
      <Route path="/register" exact={true} element={<RegisterPage />} />
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App