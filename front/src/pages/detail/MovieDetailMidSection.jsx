      import React from 'react';
      import { IconButton, Typography } from '@mui/material';
      import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
      import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
      import EditIcon from '@mui/icons-material/Edit';
      import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
      import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

      const MovieDetailMidSection = ({ movieDetail, posterUrl , ottInfo }) => {
        const movieSeq = movieDetail.movieSeq;

        const truncatedAwards = movieDetail.awards1 && movieDetail.awards1.length > 200
        ? `${movieDetail.awards1.substring(0, 200)}...`
        : movieDetail.awards1;
    

        const ottPlatforms = Object.keys(ottInfo).filter(
          (platform) => platform !== "movieSeq" && platform !== "title" && ottInfo[platform]
        );
        
      const ottLinks = {
      netflix: "https://www.netflix.com/",
      watcha: "https://www.watcha.com/",
      wavve: "https://www.wavve.com/",
      tving: "https://www.tving.com",
      disneyplus: "https://disneyplus.com",
      appletv: "https://www.apple.com/kr/apple-tv-plus/"
    };


/*  Style  */
        const midSection1Style = {
          width: '1525px',
          height: '750px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        };


        const contentContainer = {
          marginTop:'600px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '90%',
        };

        const contentStyle = {
          display: 'flex',
          maxHeight:'650px',
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
          width: '650px',
          marginTop : '40px',
        };

        const ottUnderline = {
          width: '1000px',
          borderBottom: '1px solid black',
          opacity:'10%',
          marginBottom: '40px',
        };

        const ottLogoStyle = {
          width: '80px',
          height: '80px',
          borderRadius: '50%', 
          objectFit: 'cover', 
          backgroundColor : '#000000',
          border: '3px solid white', 
          marginBottom:'40px',
          marginRight: '20px',
          cursor: 'pointer',
        };

        const plotTextStyle = {
          maxWidth: '1000px',
          fontSize: '13px',
          opacity: '80%',
          marginTop : '5px'
        };


                
        const midSection2Style = {
          width: '1525px',
          height: '750px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        };

        return (
          <div style={midSection1Style}>
            <div style={contentContainer}>
        
            {/* 포스터 div */}
              <div style={contentStyle}>
                <img src={posterUrl} alt={movieDetail.title} style={posterStyle} />
                <div style={{marginTop:'5px' , maxWidth:'300px' , maxHeight:'200px'}}>
                <Typography variant="h5" style={{ fontSize: '12px', marginTop: '10px', opacity: '60%' }}>{truncatedAwards}</Typography>
                </div>
              </div>
        
            {/* OTT 유무 & 보관함 추가 */}
              <div style={{ flex: 1 }}>
                <Typography variant='h6' style={{fontSize:'20px' , opacity:'85%'}}>감상 가능한 서비스</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
            
            
              <div style={ottInfoStyle}>
              {ottPlatforms.length === 0 ? (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '30px' , marginBottom:'30px'}}>
<IconButton>
<SentimentVeryDissatisfiedIcon style={{fontSize:'75px'}}/>
</IconButton>
             
                <Typography variant="h6" style={{ opacity: '60%' }}>... 감상 가능한 OTT 없음</Typography>
     </div>
              ) : (
                ottPlatforms.map((platform) => (
                  <a
                    key={platform}
                    href={ottLinks[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      key={platform}
                      src={`/images/logo/${platform}.png`}
                      alt={platform}
                      style={ottLogoStyle}
                    />
                  </a>
                ))
              )}
            </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '80px' }}>
                  <IconButton>
    <BookmarkAddIcon style={{fontSize:'60px'}}/>
  </IconButton>
  <Typography variant='subtitle2' style={{opacity:'60%'}}>보고싶어요</Typography>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '40px' }}>
                  <IconButton>
    <EditIcon style={{fontSize:'60px'}}/>
  </IconButton>
  <Typography variant='subtitle2' style={{opacity:'60%'}}>코멘트</Typography>
  </div>

                </div>



                  <div style={ottUnderline}/>
                <Typography variant="overline" style={plotTextStyle}>
                  {movieDetail.plotText}
                </Typography>
              </div>
            </div>
          </div>



        );
      };

      export default MovieDetailMidSection;
