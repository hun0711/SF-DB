import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { movieDetailDB } from '../../axios/main/movieLogic';
import { firebaseStorage } from '../../utils/firebase';
import MovieDetailTopSection from './MovieDetailTopSection';
import MovieDetailMidSection from './MovieDetailMidSection';
import MovieDetailBtmSection from './MovieDetailBtmSection';
import HeaderBar from '../../components/HeaderBar';
import Footer from '../../components/Footer';




const MovieDetailPage = () => {
  const location = useLocation();
  const movieInfo = location.pathname.split('/movieDetail/')[1];
  const [movieId, movieSeq] = movieInfo.match(/([A-Z])(\d+)/).slice(1);
  
  const [movieDetail , setMovieDetail] = useState([])
  const [imageUrl, setImageUrl] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null)

  useEffect(() => {
  const getMovieDetail = async () => {
    try {
      const res = await movieDetailDB(movieId , movieSeq)
      setMovieDetail(res[0])
    } catch (error) {
      console.log("영화 상세정보 로드 실패 : " , error);
    }
  }
    getMovieDetail()
  },[])


  const getImageUrl = async () => {
    const storageRef = firebaseStorage.ref(`${movieId}${movieSeq}.jpg`);
    try {
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (error) {
      console.log("이미지 URL 페칭 에러 : " , error);
      return null;
    }
   
  };

  const getPosterUrl = async () => {
    const storageRef = firebaseStorage.ref(`poster/${movieId}${movieSeq}.jpg`)
    try {
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (error) {
      console.log("포스터 URL 페칭 에러 : " , error);
      return null;
    }
  }

  useEffect(() => {
    getImageUrl()
      .then((url) => {
        if (url) {
          setImageUrl(url);
          console.log('Image URL:', url);
        }
      });
      getPosterUrl()
      .then((url) => {
        if (url) {
          setPosterUrl(url);
          console.log('Poster URL:', url);
        }
      });

  }, []);



  return (
    <>

<HeaderBar/>

  {/* Top Section */}
    <div style={{marginTop:'70px' , marginLeft:'-10px'}}>
    <MovieDetailTopSection movieDetail={movieDetail} imageUrl={imageUrl} />
    </div>
  
   {/* Mid Section */}
   <div>
    <MovieDetailMidSection movieDetail={movieDetail} posterUrl={posterUrl}/>
  </div>

 {/* Btm Section */}
 <div style={{marginTop:'100px'}}>
    <MovieDetailBtmSection/>
   </div>


<Footer/>
    </>
  )
}

export default MovieDetailPage