import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Button, IconButton, Modal, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { changeUserNameDB } from '../../axios/user/editLogic';
import { serialize } from 'cookie';
import { useEffect } from 'react';
import { userInfoDB } from '../../axios/user/loginLogic';
import { getCookie } from '../../utils/getCookies';


export default function UserProfile({ userInfo }) {
  const userName = getCookie('userName')
  const userId = userInfo.userId
  const userProfileImage = userInfo.userProfileImage
  const [open, setOpen] = useState(false);
  const [userNameValue , setUserNameValue] = useState('')
  const [userProfileImageValue , setUserProfileImageValue] = useState('')
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [alertOn, setAlertOn] = useState(false);  
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    const getUserInfo = async() => {
    try {
      const res = await userInfoDB(userId)
      setUserNameValue(res[0].userName)
    } catch (error) {
     console.log('유저 정보 로드 실패 : ', error); 
    }
    }
    getUserInfo()
  },[userName])

  const handleEditProfile = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false); 
  const handleAlertClose = () => {
    setAlertOn(false)
  }


  /* 이름 변경 */
  const handleNameChange = async() => {
    const requestData = {
      userId : userId,
      newUserName : userNameValue
    }
  try {
    const res = await changeUserNameDB(requestData)
    if(res === 1){
      setIsNameChanged(false)
      document.cookie = serialize('userName', userNameValue , { path: '/' });
      setUserNameValue(userNameValue)
      enqueueSnackbar('이름이 변경되었습니다!', { variant: 'success' });
      setAlertOn(true);
    }else{
      console.log('이름 변경 실패');
    }
  } catch (error) {
    console.log('이름 변경 실패 : ', error);
    enqueueSnackbar('네트워크 오류 발생', { variant: 'error' });
    setAlertOn(true);
  }
}

/* Style */
  const modalStyle = {
    position: 'absolute', top: '50%',left: '50%',
    transform: 'translate(-50%, -50%)', width: 400, height: 300,
    bgcolor: 'background.paper', borderRadius: '10px', boxShadow: 24, p: 4,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  };

  return (
    <>
      <div style={{display:'flex'}}>
      <AccountCircleIcon style={{marginLeft:'15px',marginRight:'5px',marginTop:'2px'}}/><Title>프로필</Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:'15px' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px' }}>
          <img src={userProfileImage ? userProfileImage : '/images/astronaut.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div>
        <Typography variant="h6">{userName}</Typography>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handleEditProfile}>
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

        {/* 프로필 편집 모달창 */}
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={modalStyle}>
  <IconButton
          style={{ position: 'absolute', top: '25px', right: '20px' }}
          onClick={handleClose}
        >
          <CancelIcon />
        </IconButton>
    <Typography id="modal-modal-title" variant="h6" component="h2">
     프로필 편집
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* 이미지 변경 */}
    <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', marginBottom: '10px'}}>
          <img src={userProfileImage ? userProfileImage : '/images/astronaut.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <Button color="science" variant="contained" style={{ color: 'white',fontSize:'12px',marginBottom:'20px'}}>사진 편집</Button>

{/* 이름 변경 */}
<div style={{display:'flex', flexDirection:'column'}}>
  <div>
  <Typography variant='overline' style={{fontSize:'15px',marginRight:'5px'}}>· 이름 : </Typography>
  <TextField
  hiddenLabel
  id="changeUserName"
  defaultValue={userNameValue}
  variant="standard"
  onChange={(event) => {
  setUserNameValue(event.target.value)
  setIsNameChanged(event.target.value !== userNameValue);
  }}
/>
  <Button color="science" variant="text" disabled={!isNameChanged} style={{fontSize:'12px' , marginLeft:'15px' , marginBottom:'0px'}} onClick={handleNameChange}>변경하기</Button>
  </div>
</div>
</div>  
  </Box>
</Modal>
      
                      {/* 알림 창 */}
                      <Snackbar open={alertOn} autoHideDuration={3000} onClose={handleAlertClose}>
          </Snackbar>
      </div>
    </>
  );
}
