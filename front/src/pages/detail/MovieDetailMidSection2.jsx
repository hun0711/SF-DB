import React, { useEffect, useState } from 'react';
import { directorInfoDB } from '../../axios/main/movieLogic';

const MovieDetailMidSection2 = ({ movieDetail }) => {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    if (movieDetail && movieDetail.directorIds) {
      const fetchDirectorsInfo = async () => {
        const directorIds = movieDetail.directorIds.split(',');
        const directorPromises = directorIds.map(async (directorId) => {
          try {
            const res = await directorInfoDB(directorId);
            console.log(res);
            return res;
          } catch (error) {
            console.log('감독 정보 로드 실패 : ', error);
            return null;
          }
        });

        const directorsData = await Promise.all(directorPromises);
        setDirectors(directorsData.filter(director => director !== null));
      };

      fetchDirectorsInfo();
    }
  }, [movieDetail]);

  const creditInfoStyle = {};
  
  console.log(directors[0].directorNm);

  return (
    <>
      <div style={creditInfoStyle}>
        <h3>감독 정보</h3>
        {directors.map((director, index) => (
          <div key={index}>
            <p>이름: {director?.directorNm}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieDetailMidSection2;
