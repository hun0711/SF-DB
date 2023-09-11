import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { actorImageDB, directorImageDB } from '../../axios/main/movieLogic';


const MovieDetailMidSection2 = ({ movieDetail }) => {
  const directors = movieDetail && movieDetail.directorNms ? movieDetail.directorNms.split(',') : [];
  const actors = movieDetail && movieDetail.actorNms ? movieDetail.actorNms.split(',') : [];
  const [directorImageUrls, setDirectorImageUrls] = useState([])
  const [actorImageUrls, setActorImageUrls] = useState([])

 const getDirectorImages = async () => {
  console.log(directors);
  try {
    const res = await directorImageDB(directors)
    setDirectorImageUrls(res);
  } catch (error) {
    console.error('감독 이미지 가져오기 오류', error);
  }
};

const getActorImages = async () => {
  try {
    const res = await actorImageDB(actors)
    setActorImageUrls(res);
  } catch (error) {
    console.error('배우 이미지 가져오기 오류', error);
  }
};

useEffect(() => {
  getDirectorImages();
  getActorImages();
}, [movieDetail]); 





  {/* Style */}
  const midSection2Style = {
    marginLeft: '100px',
    marginTop: '50px',
    maxWidth: '1500px',
    minHeight: '300px',
    maxHeight: '900px',
    display: 'flex',
    flexDirection: 'column', // 세로로 정렬
  };

  const staffRoleStyle = {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
  };



  const directorStyle = {
    width : '220px',
    maxWidth: '400px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px'

  };

  const underlineStyle = {
    width : '1200px',
    borderBottom: '1px solid black',
    opacity: '10%',
    marginTop:'30px'
  };

  const actorSectionStyle = {
    maxWidth: '1800px',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap'
  }

  const actorStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '220px',
    marginRight: '30px',
    marginBottom:'30px'
  }

  return (
    <>
      <div style={midSection2Style}>
        <Typography variant="h4" style={{ fontSize: '25px' }}>
          출연 / 제작
        </Typography>
      
        <div style={staffRoleStyle}>
          {directors.map((director, index) => (
            <div key={index} style={directorStyle}>
               <div style={{ width: 35, height: 35, borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
        <img src={directorImageUrls[index] ? directorImageUrls[index] : '/images/astronaut.jpg'} alt="감독" style={{ width: '100%', height: '100%', objectFit: 'cover' ,    marginTop: '5px',
    marginRight: '10px',}} />
      </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" style={{ fontSize: '16px' }}>
                  {director.trim()}
                </Typography>
                <div style={{ marginTop: '5px' }}>
                  <Typography variant="button" style={{ opacity: '60%', fontSize: '15px' }}>
                    감독
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
          <div style={underlineStyle}/>
     
     {/* 배우 정보 */}
 <div style={actorSectionStyle}>
  {actors.map((actor,index) => (
    <div key={index} style={actorStyle}>
      <div style={{ width: 35, height: 35, borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
        <img src={actorImageUrls[index] ? actorImageUrls[index] : '/images/astronaut.jpg'} alt="감독" style={{ width: '100%', height: '100%', objectFit: 'cover' ,    marginTop: '5px',
    marginRight: '10px',}} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , marginTop:'10px' }}>
       <Typography variant="subtitle2" style={{ fontSize: '16px' }}>
 {actor.trim()}
</Typography>
      </div>
  </div>
  ))}
  </div>

      </div>
    </>
  );
};

export default MovieDetailMidSection2;
