import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Title from './Title';
import { getCookie } from '../../utils/getCookies';


export default function UserProfile() {

  const userName = getCookie('userName')
  const userProfileImage = getCookie('userProfileImage');

  return (
    <React.Fragment>
      <Title>내 프로필</Title>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px' }}>
          <img src={userProfileImage ? userProfileImage : 'images/astronaut.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div>
        <Typography variant="h6">{userName}</Typography>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <EditIcon style={{ fontSize: 15, marginRight: '5px' , marginBottom:'5px' }} />
          <Link color="primary" href="/editProfile" >
            프로필 편집
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
