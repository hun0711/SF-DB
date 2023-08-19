    import React, { useEffect, useState } from 'react';
    import { Typography } from '@mui/material';
    import { ottExistanceDB } from '../../axios/main/movieLogic';

    const MovieDetailMidSection = ({ movieDetail, posterUrl }) => {
      const movieSeq = movieDetail.movieSeq;
      console.log(movieSeq);
      const [ottInfo , setOttInfo] = useState({}) 
      
      /* OTT */
      useEffect(()=> {
      const getOttExistance = async () => {
      try {
        const res = await ottExistanceDB(movieSeq)
        setOttInfo(res[0])
        console.log(ottInfo);
      } catch (error) {
        console.log("OTT 정보 로드 실패 : ", error);
      }
      }
    getOttExistance()
      },[])

      const ottPlatforms = Object.keys(ottInfo).filter(
        (platform) => platform !== "movieSeq" && platform !== "title" && ottInfo[platform]
      );
      
    const ottLinks = {
    netflix: "https://www.netflix.com/",
    watcha: "https://www.watcha.com/",
    wavve: "https://www.wavve.com/",
    tving: "https://www.tving.com",
    disneyplus: "https://disneyplus.com"
  };


      const midSectionStyle = {
        width: '1525px',
        height: '1200px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

      const contentContainer = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '90%',
      };

      const contentStyle = {
        display: 'flex',
        marginBottom : '650px',
        flexDirection: 'column', 
        alignItems: 'flex-start',
      };

      const posterStyle = {
        width: '300px',
        height: '450px',
        objectFit: 'cover',
        marginRight: '50px',
      };
    
      const ottInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '1000px',
        marginTop : '30px',
      };

      const ottUnderline = {
        width: '1000px',
        borderBottom: '1px solid black',
        opacity:'10%',
        marginTop :' 10px',
        marginBottom: '50px',
      };

      
      const ottLogoStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%', 
        objectFit: 'cover', 
        backgroundColor : '#000000',
        border: '3px solid black', 
        marginBottom:'10px',
        marginRight: '20px',
        cursor: 'pointer',
      };
      

      const plotTextStyle = {
        fontSize: '13px',
        opacity: '80%',
        marginTop : '5px'
      };

      return (
        <div style={midSectionStyle}>

      
          <div style={contentContainer}>
      
          {/* 포스터 div */}
            <div style={contentStyle}>
              <img src={posterUrl} alt={movieDetail.title} style={posterStyle} />
            </div>
      
          {/* OTT 유무 & 줄거리 div */}
            <div style={{ flex: 1 }}>
              <Typography variant='h6' style={{fontSize:'20px' , opacity:'85%'}}>감상 가능한 서비스</Typography>
            <div style={ottInfoStyle}>
            {ottPlatforms.map((platform) => (
              <a
              key={platform}
              href={ottLinks[platform]}
              target="_blank" // Open link in a new tab
              rel="noopener noreferrer" // Security best practice
              style={{ textDecoration: 'none' }} // Remove default underline
            >
                <img
                  key={platform}
                  src={`/images/logo/${platform}.png`}
                  alt={platform}
                  style={ottLogoStyle}
                />
              </a>
              ))}
                </div>


       
                <div style={ottUnderline}/>


          

              <Typography variant="subtitle1" style={plotTextStyle}>
                {movieDetail.plotText}
              </Typography>
            </div>
          </div>
      
      
        </div>
      );
    };

    export default MovieDetailMidSection;
