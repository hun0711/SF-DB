import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { movieDetailDB } from '../../axios/main/movieLogic';
import firebase from 'firebase/compat/app'; // 이 부분을 수정
import 'firebase/compat/storage'; // 이 부분도 수정
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

  const firebaseConfig = {
    apiKey: "AIzaSyC2pRmeDsy_q0pjRI7LOneIXjSQHE_UMbA",
    authDomain: "sfdb-394203.firebaseapp.com",
    projectId: "sfdb-394203",
    storageBucket: "sfdb-394203.appspot.com",
    messagingSenderId: "266208771379",
    appId: "1:266208771379:web:8e6778a2435c486a2dd246",
    measurementId: "G-RYBHGGV295"
  };
  

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const getImageUrl = async () => {
    const storageRef = firebase.storage().ref(`${movieId}${movieSeq}.jpg`);
    const url = await storageRef.getDownloadURL();
    return url;
  };

  useEffect(() => {
    getImageUrl()
      .then((url) => {
        setImageUrl(url)
        console.log('Image URL:', url);
      })
      .catch((error) => {
        console.log('Error fetching image URL:', error);
      });
  }, []);



  return (
    <>

<HeaderBar/>

  {/* Top Section */}
    <div style={{marginTop:'70px'}}>
    <MovieDetailTopSection movieDetail={movieDetail} imageUrl={imageUrl} />
    </div>
  
   {/* Mid Section */}
   <div style={{marginTop:'100px'}}>
    <MovieDetailMidSection/>
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