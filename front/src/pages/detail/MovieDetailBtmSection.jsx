import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Grid, IconButton, Modal, Popover, Snackbar, TextareaAutosize, Typography } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { deleteMovieCommentDB, getMovieCommentDB, updateMovieCommentDB } from '../../axios/detail/contentsLogic';
import Slider from 'react-slick';
import { getCookie } from '../../utils/getCookies';
import { useSnackbar } from 'notistack';

const MovieDetailBtmSection = ({ movieDetail }) => {
  const movieId = movieDetail.movieId;
  const movieSeq = movieDetail.movieSeq;
  const userId = getCookie('userId')
  const [movieCommentList , setMovieCommentList] = useState([])
  const [open, setOpen] = React.useState(false);
  const [alertOn, setAlertOn] = React.useState(false);
  const [textLength, setTextLength] = React.useState(0);
  const [textValue, setTextValue] = React.useState('');
  const [spoilerActive, setSpoilerActive] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar(); 
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // 스포일러 코멘트 내용 보기 여부와 버튼 클릭 여부
  const [spoilerCommentVisible, setSpoilerCommentVisible] = useState(false);
  const [spoilerViewButtonClicked, setSpoilerViewButtonClicked] = useState(false);

  useEffect(() => {
    const getMovieComment = async () => {
      try {
        const res = await getMovieCommentDB(movieId, movieSeq);
        setMovieCommentList(res);
        console.log(res);
      } catch (error) {
        console.log("영화 코멘트 로드 실패 : ", error);
      }
    }
  
    if (movieId !== undefined && movieSeq !== undefined) {
      getMovieComment();
    }
  }, [movieId, movieSeq]);


  const handlePopoverOpen = (event) => {setAnchorEl(event.currentTarget);};
  const handlePopoverClose = () => {setAnchorEl(null);};
  const popoverOpen = Boolean(anchorEl);
  const handleOpen = (commentDetail) => {
    setTextValue(commentDetail);
    setTextLength(commentDetail.length); 
    setOpen(true);
  };
  const handleClose = () => setOpen(false); 


  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDialogOpen(false);
  };


  //코멘트 수정
  const handleUpdateComment = async() => {
    const commentData = {
      commentDetail : textValue,
      spolierStatus : spoilerActive,
      movieId : movieId,
      movieSeq : movieSeq,
      userId : userId
     }
     console.log(commentData);
     try {
       const res = await updateMovieCommentDB(commentData)
       console.log(res.data);
       if(res === 1){
         window.location.reload();
         enqueueSnackbar('코멘트를 수정했습니다!', { variant: 'success' });
         setAlertOn(true);
       }else{
         enqueueSnackbar('코멘트를 수정하지 못했습니다!', { variant: 'error' });
         setAlertOn(true);
       }
     } catch (error) {
       console.log('코멘트 수정 실패 :' , error);
       enqueueSnackbar('네트워크 오류!', { variant: 'error' });
         setAlertOn(true);
     }
   }

   //코멘트 삭제
  const handleCommentDelete = async() => {
    const commentData = {
      movieId : movieId,
      movieSeq : movieSeq,
      userId : userId,
     }
     console.log(commentData);
     try {
       const res = await deleteMovieCommentDB(commentData)
       console.log(res.data);
       if(res === 1){
         window.location.reload();
         enqueueSnackbar('코멘트를 삭제했습니다!', { variant: 'success' });
         setAlertOn(true);
       }else{
         enqueueSnackbar('코멘트를 삭제하지 못했습니다!', { variant: 'error' });
         setAlertOn(true);
       }
     } catch (error) {
       console.log('코멘트 삭제 실패 :' , error);
       enqueueSnackbar('네트워크 오류!', { variant: 'error' });
         setAlertOn(true);
     }
  }




  {/* Style */}
  const settings = {
    dots: true,
    arrows : true,
    infinite: false, 
    speed: 500,
    slidesToShow: movieCommentList.length,
    slidesToScroll: 4,
  };


  const btmSectionStyle = {
    marginLeft: '100px',
    marginTop: '30px',
    maxWidth: '1500px',
    minHeight: '450px',
    maxHeight: '1600px',
  } 

  const commentListStyle = {
    width :'1350px',
    height : '450px',
    marginTop : '30px'
  }

  const commentStyle ={
    width:'350px',
    height:'450px',
    marginRight : '10px',
    position: 'relative',
    
  }

  const modalStyle = {
    position: 'absolute', top: '50%',left: '50%',
    transform: 'translate(-50%, -50%)', width: 500, height: 400,
    bgcolor: 'background.paper', borderRadius: '10px', boxShadow: 24, p: 4,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
  };

  const commentField = {
    marginTop:'10px', width: 480, height: 320,border: 'none',
    textAlign: 'left', outline: 'none', fontSize: '15px' 
  }
   
  return (
    <>

<div style={btmSectionStyle}>

<div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" style={{ fontSize: '25px' }}>
          코멘트 
        </Typography>
        <Typography variant="h4" style={{ fontSize: '25px' , marginLeft:'10px', color:'#1976d2' }}>
          {movieCommentList.length}
        </Typography>
        </div>


        <div style={commentListStyle}>
          <Slider {...settings}>
            {movieCommentList.map((movieComment, index) => (
              <div key={index} style={commentStyle}>
                <Card sx={{ maxWidth: 350, minHeight: 300, mx: 2, border: 'none', marginRight:'10px', backgroundColor: '#f5f5f5' }}>
                  <CardContent style={{ border: 'none', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  
  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* 프로필 이미지 */}
    <div style={{ width: 35, height: 35, borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
      <img src={movieComment.userProfileImage ? movieComment.userProfileImage : 'images/astronaut.jpg'} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    {/* 사용자 이름 */}
    <Typography variant="subtitle2" sx={{ fontSize: 15 }}>
      {movieComment.userName}
    </Typography>
  </div>
  {/* 수정삭제 */}
  {userId === movieComment.userId && (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Typography variant='button' style={{ opacity: '50%' , cursor:'pointer'}} onClick={() => handleOpen(movieComment.commentDetail)}>수정</Typography>
      <Typography variant='button' style={{ opacity: '50%' , cursor:'pointer'}} onClick={handleDeleteClick}>삭제</Typography>
    </div>
  )}
</div>

                    <div style={{ width: '320px', borderBottom: '1px solid black', opacity: '10%', marginTop:'10px' ,marginBottom: '10px' }} />

   {/* 코멘트 내용 */}
   {movieComment.spoilerStatus && !spoilerViewButtonClicked && (
                      <div
                        style={{
                          display: 'flex',
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="button"
                          style={{
                            fontSize: '15px',
                            opacity:'50%',
                            marginTop:'10px',
                            marginBottom: '10px',
                            marginRight: '2px',
                          }}
                        >
                          스포일러가 포함된 코멘트입니다.
                        </Typography>
                        <Button
                          variant="text"
                          style={{ fontSize: '15px'}}
                          onClick={() => {
                            setSpoilerViewButtonClicked(true);
                          }}
                        >
                          보기
                        </Button>
                      </div>
                    )}
                    {spoilerViewButtonClicked ? (
                      <Typography variant="caption" style={{ fontSize: '15px' }}>
                        {movieComment.commentDetail}
                      </Typography>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>

{/* 코멘트 수정 창 */}
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
                {movieDetail.title}
              </Typography>
              <TextareaAutosize
        style={{ ...commentField, resize: 'none' }}
        minRows={10} 
        maxRows={20} 
        placeholder={`${movieDetail.title}에 대한 의견을 남겨주세요.`}
        value={textValue}
        onChange={(e) => {setTextLength(e.target.value.length); setTextValue(e.target.value)}}
      />
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="button" style={{ opacity: '60%' }}>
        {textLength}/1000
      </Typography>
      <IconButton onClick={() => setSpoilerActive(!spoilerActive)}    
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        <CampaignOutlinedIcon style={{ color: spoilerActive ? '#1976d2' : 'inherit' }}/>
          </IconButton>
      <div style={{marginLeft:'-300px'}}>
      <Button
        variant="contained"
        disabled={textLength === 0 || textLength > 1000}
        sx={{ backgroundColor: '#1976d2' }}
        onClick={handleUpdateComment}
        >
        저장하기
      </Button>
        </div>
    </div>


    <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ p: 2 }}>
            <Typography variant='caption'>스포일러가 포함된 코멘트라면 클릭해주세요!</Typography>
          </Box>
        </Popover>

            </Box>
          </Modal>

          {/* 삭제 확인 */}
          <Dialog
        open={dialogOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"코멘트를 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>취소</Button>
          <Button onClick={handleCommentDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>

                     {/* 알림 창 */}
                     <Snackbar open={alertOn} autoHideDuration={3000} onClose={handleClose}>
         </Snackbar>
        </div>
      </div>




    </>
  )
}

export default MovieDetailBtmSection