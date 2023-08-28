import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getYouTubeVideoByQuery } from '../../utils/youtubeApi'; 

const MovieDetailBtmSection2 = ({ movieDetail }) => {
  const title = movieDetail.title
  const prodYear = movieDetail.prodYear
  const [trailerId, setTrailerId] = useState(null);


  useEffect(() => {
    const searchMovieTrailer = async () => {
      try {
        const query = title + prodYear + '예고편';
        const searchResults = await getYouTubeVideoByQuery(query)
        if(searchResults && searchResults.items && searchResults.items.length > 0) {
          const topVideo = searchResults.items[0];
          setTrailerId(topVideo.id.videoId)
        }
      } catch (error) {
        console.log('영화 예고편 검색 실패 : ', error);
      } 
    }
    if (title !== undefined && prodYear !== undefined) {
      searchMovieTrailer()
    }
  },[title, prodYear]);

  //Youtube 동영상 뷰어
    const openYoutubePlayer = () => {
      if (trailerId) {
        window.open(`https://www.youtube.com/embed/${trailerId}`, '_blank');
      }
    };
    
  {/* Style */}
  const btmSection2Style = {
    marginLeft: '100px',
    marginTop: '30px',
    maxWidth: '1500px',
    minHeight: '800px',
    maxHeight: '1000px',
  } 
  
  const stillSectionStyle = {
    marginTop: '30px',
    marginLeft: '20px',
    maxWidth: '1500px',
    maxHeight: '500px'
  }

  const stillStyle = {
    display: 'flex',
    width: '500px',
    minWidth: '300px',
    maxWidth: '400px',
    height: '350px',
    minHeight: '350px',
    maxHeight: '350px',
    marginRight: '20px'
  }

  const videoStyle = {
    marginTop: '30px',
    marginLeft: '20px',
    width: '500px',
    minWidth: '300px',
    maxWidth: '400px',
    height: '350px',
    minHeight: '350px',
    maxHeight: '500px'
  } 
  return (
    <> 
    <div style={btmSection2Style}>
      {/* 갤러리 div */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" style={{ fontSize: '25px' }}>
          갤러리
        </Typography>
        </div>  
        <div style={stillSectionStyle}>
        </div>

{/* 동영상 div */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" style={{ fontSize: '25px' }}>
          동영상 
        </Typography>
        </div>
    
   <div style={videoStyle}>
   {/* 동영상 삽입 */}
   {trailerId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerId}`}
              allowFullScreen
              style={{ border: 'none', borderRadius: '5px' }} 
            ></iframe>
          )}
          <Typography variant='subtitle1' style={{marginTop:'10px' , fontSize:'15px'}}>메인 예고편</Typography>
   </div>

    </div>
    </>
  )
}

export default MovieDetailBtmSection2