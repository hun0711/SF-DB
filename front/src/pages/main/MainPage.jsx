import React from 'react'
import MainLayout from './MainLayout'
import HeaderBar from '../../components/HeaderBar'
import Footer from '../../components/Footer'

const MainPage = () => {
  return (
    <>
    <HeaderBar/>

    <div style={{marginTop:'100px'}}>
    <MainLayout/>
    </div>

    <Footer/>
    </>
  )
}

export default MainPage