import React from 'react'
import HeaderBar from '../../components/HeaderBar'
import Footer from '../../components/Footer'
import MainTopSection from './MainTopSection'

const MainPage = () => {
  return (
    <>
    <HeaderBar/>

<div style={{marginTop:'150px'}}>
{/* TOP 카루셀 */}
<MainTopSection/>
</div>

{/* MID 카루셀 */}
{/* BTM 카루셀 */}


  {/*   <Footer/>  */}
    </>
  )
}

export default MainPage