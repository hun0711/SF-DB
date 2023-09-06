import { Avatar, Typography } from '@mui/material';
import React from 'react';

const MovieDetailMidSection2 = ({ movieDetail }) => {

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

  const avatarStyle = {
    marginTop: '5px',
    marginRight: '10px',
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



  const directors = movieDetail && movieDetail.directorNms ? movieDetail.directorNms.split(',') : [];
  const actors = movieDetail && movieDetail.actorNms ? movieDetail.actorNms.split(',') : [];
  console.log(actors);

  return (
    <>
      <div style={midSection2Style}>
        <Typography variant="h4" style={{ fontSize: '25px' }}>
          출연 / 제작
        </Typography>
      
        <div style={staffRoleStyle}>
          {directors.map((director, index) => (
            <div key={index} style={directorStyle}>
              <Avatar style={avatarStyle} />
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
      <Avatar style={avatarStyle} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , marginTop:'10px' }}>
       <Typography variant="subtitle2" style={{ fontSize: '16px' }}>
 {actor.trim()}
</Typography>
      </div>
  </div>
  ))}
  </div>
  {/* 배우 정보 */}

      </div>
    </>
  );
};

export default MovieDetailMidSection2;
