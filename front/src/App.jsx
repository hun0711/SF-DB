import React from 'react'
import MainPage from './pages/main/MainPage'
import RegisterPage from './pages/user/RegisterPage'
import LoginPage from './pages/user/LoginPage'
import { Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import { ThemeProvider } from '@mui/material'
import theme from './modules/components/Theme'

const App = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Routes>
      {/* 메인페이지 */}
      <Route path="/" exact={true} element={<MainPage />} />
      {/* 로그인페이지 */}
      <Route path="/login" exact={true} element={<LoginPage />} />
      {/* 회원가입페이지 */}
      <Route path="/register" exact={true} element={<RegisterPage />} />
      {/* 첫 시작 페이지*/}
      <Route path="/home" exact={true} element={<Home/>}/>
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App