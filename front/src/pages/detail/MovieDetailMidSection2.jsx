import React, { useEffect, useState } from 'react'
import { directorInfoDB } from '../../axios/main/movieLogic'

const MovieDetailMidSection2 = ({ movieDetail }) => {
  const [directors, setDirectors] = useState([])


  useEffect(() => {
    const getDirectorInfo = async (directorId) => {
      try {
        const res = await directorInfoDB(directorId)
        return res;
      } catch (error) {
        console.log('감독 정보 로드 실패 : ', error);
        return null;
      }
    }

    const fetchDirectorsInfo = async () => {
      const directorIds = movieDetail.directorId.split(','); // 여러 개의 directorId를 배열로 분리
      const directorsInfo = await Promise.all(directorIds.map(getDirectorInfo));
      setDirectors(directorsInfo.filter(info => info !== null));
      console.log(directors);
    }

    fetchDirectorsInfo();
  }, [movieDetail.directorId])




  return (
    <>
    
    </>
  )
}

export default MovieDetailMidSection2