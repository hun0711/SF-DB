import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Title from './Title';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';


export default function UserProfile({ userInfo }) {
console.log(userInfo.userEmail);

  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
      <AccountCircleIcon style={{marginLeft:'15px',marginRight:'5px',marginTop:'2px'}}/><Title>프로필</Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px' }}>
          <img src={userInfo.userProfileImage ? userInfo.userProfileImage : 'images/astronaut.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div>
        <Typography variant="h6">{userInfo.userName}</Typography>
        </div>
        <div>
        <Typography variant="h6">{userInfo.userEmail}</Typography>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center'}}>
        <IconButton>
          <EditIcon style={{ fontSize: 15, marginRight: '5px' , marginBottom:'5px' }} />
          <Typography variant='button'>프로필 편집</Typography>
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
          <ExitToAppIcon style={{ fontSize: 15, marginRight: '5px' , marginBottom:'5px' }}/>
            <Typography variant='button'>회원 탈퇴</Typography>
          </IconButton>
        </div>
      </div>
    </React.Fragment>
  );
}
