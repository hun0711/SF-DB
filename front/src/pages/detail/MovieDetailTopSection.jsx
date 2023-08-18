import React from 'react';

const MovieDetailTopSection = ({ imageUrl, movieDetail }) => {
  const topSectionStyle = {
    width: '1500px',
    height: '500px', // 고정된 높이
    overflow: 'hidden',
    position: 'relative',
  };

  const imageStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 이미지의 크기를 조절하여 화면에 맞춤
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%', // 높이 조정
    padding: '20px',
    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column', // 수직으로 정렬
    justifyContent: 'space-between', // 상하 공간 분배
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column', // 수직으로 정렬
    marginLeft: '40px', 
  };

  const titleStyle = {
    marginBottom: '5px', // 간격 조절
    marginLeft: '30px', 
    fontSize: '50px',
  };

  const titleOrgStyle = {
    fontSize: '15px',
    marginLeft: '40px', 
  };
  
  const yearNationStyle = {
    fontSize: '20px',
    marginTop: '10px'
  };

  return (
    <div style={topSectionStyle}>
      <img src={imageUrl} alt="Movie Stills" style={imageStyle} />
      <div style={overlayStyle}>
        <div>
          <h1 style={titleStyle}>{movieDetail.title}</h1>
          <span style={titleOrgStyle}>{movieDetail.titleOrg}</span>
          <div style={infoStyle}>
            <span style={yearNationStyle}>{movieDetail.prodYear}  ·  {movieDetail.nation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailTopSection;
