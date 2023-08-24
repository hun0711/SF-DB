import React,{ useEffect , useState } from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import { getUserArchiveDB } from '../../axios/detail/contentsLogic';

export default function MovieArchive({ userInfo }) {
  const userId = userInfo.userId
  const [userMovieArchive, setUserMovieArchive] = useState([])

  useEffect(()=>{
  const getUserArchive = async () => {
    try {
      const res = getUserArchiveDB(userId)
      setUserMovieArchive(res)
    } catch (error) {
      console.log('유저 보관함 로드 실패 : ',error);
    }
  }
  getUserArchive()
  },[])

  
  const archiveSectiontyle = {
    minWidth: '250px',
    maxWidth: '250px',
    maxHeight: '300px',
    minHeight: '300px',
  }

  return (
    <React.Fragment>
      <Title>보관함</Title>
      <div style={archiveSectiontyle}>

      </div>
      <Link color="primary" href="/main" sx={{ mt: 3 }}>
        See more Movies
      </Link>
    </React.Fragment>
  );
}
