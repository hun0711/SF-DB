import { Typography } from '@mui/material'
import React from 'react'

const MovieDetailBtmSection = () => {
  const btmSectionStyle = {
    marginLeft: '100px',
    marginTop: '30px',
    maxWidth: '1500px',
    minHeight: '500px',
    maxHeight: '1500px',
  } 
   
  return (
    <>

    <div style={btmSectionStyle}>
      <Typography variant="h4" style={{ fontSize: '25px' }}>
          코멘트
        </Typography>
    </div>




    </>
  )
}

export default MovieDetailBtmSection