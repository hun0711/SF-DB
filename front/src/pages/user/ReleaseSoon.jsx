import * as React from 'react';
import Title from './Title';
import TheatersIcon from '@mui/icons-material/Theaters';
import { useEffect } from 'react';
import { releaseSoonMovieDB } from '../../axios/main/movieLogic';
import { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { firebaseStorage } from '../../utils/firebase';
import { getYouTubeVideoByQuery } from '../../utils/youtubeApi';

export default function ReleaseSoon({ userInfo }) {
  const userId = userInfo.userId
  const [releaseSoonMovies , setReleaseSoonMovies] = useState([])
  const [posterUrls, setPosterUrls] = useState();
  const [trailerId, setTrailerId] = useState(null);
  const [alertOn, setAlertOn] = useState(false)
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
  const getReleaseSoonMovie = async() => {
    try {
      const res = await releaseSoonMovieDB()
      setReleaseSoonMovies(res[0])
    } catch (error) {
      console.log('개봉 예정 영화 로드 실패 : ', error);
    }
  }
  getReleaseSoonMovie()
  },[])

  useEffect(() => {
    const getPosterUrls = async () => {
        const storageRef = firebaseStorage.ref(`poster/${releaseSoonMovies.movieId}${releaseSoonMovies.movieSeq}.jpg`);
        try {
          const url = await storageRef.getDownloadURL();
          setPosterUrls(url);
        } catch (error) {
          console.log("포스터 URL 페칭 에러 : " , error);
          return null;
        }
    };
    getPosterUrls();
  }, [releaseSoonMovies]);

  useEffect(() => {
    const searchMovieTrailer = async () => {
      try {
        const query = releaseSoonMovies.title + releaseSoonMovies.prodYear + '예고편';
        console.log(query);
        const searchResults = await getYouTubeVideoByQuery(query)
        if(searchResults && searchResults.items && searchResults.items.length > 0) {
          const topVideo = searchResults.items[0];
          setTrailerId(topVideo.id.videoId)
        }
      } catch (error) {
        console.log('영화 예고편 검색 실패 : ', error);
      } 
    }
    if (releaseSoonMovies.title !== undefined && releaseSoonMovies.prodYear !== undefined) {
      searchMovieTrailer()
    }
  },[releaseSoonMovies.title, releaseSoonMovies.prodYear]);

 
  const handleReleaseNotice = () => {
    try {
      
    } catch (error) {
      
    }
  }



  /* Style */
  const releaseSoonSectiontyle = {
    minWidth: '600px',
    maxWidth: '650px',
    minHeight: '150px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  };

  const videoStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '20px',
    width: '400px',
    minWidth: '300px',
    maxWidth: '400px',
    height: '250px',
    minHeight: '250px',
    maxHeight: '250px'
  } 

  return (
    <>
    <div style={{display:'flex'}}>
      <TheatersIcon style={{marginLeft:'15px',marginRight:'5px' ,marginTop:'3px'}}/><Title>개봉 예정</Title>
    <div style={{ marginLeft: '15px' }}>
          <Button variant='contained' color='primary' style={{ fontSize: '10px' }} >
            알림 설정
          </Button>
      </div>
    </div>


    <div style={releaseSoonSectiontyle}>
    <Card sx={{ maxWidth: 250, height: 250, mx: 2, border: 'none', marginRight: '10px'}}>
        <img
                src={posterUrls}
                alt={releaseSoonMovies.title}
                style={{ width: '100%', height: '250px', borderRadius: '3px 3px 3px 3px'}}
              />
            </Card>

    
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
   </div>
    </div>
    </>
  );
}
