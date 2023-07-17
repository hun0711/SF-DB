import React from 'react'
import MainPage from './pages/main/MainPage'
import RegisterPage from './pages/user/RegisterPage'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <>
    <Routes>
      {/* 메인페이지 */}
      <Route path="/" exact={true} element={<MainPage />} />
      {/* 로그인페이지 */}

      {/* 회원가입페이지 */}
      <Route path="/register" exact={true} element={<RegisterPage />} />
    </Routes>
    </>
  )
}

export default App