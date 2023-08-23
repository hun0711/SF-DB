import React from 'react';
import { Alert, Box, Button, IconButton, Modal, Popover, Snackbar, TextareaAutosize, Typography } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { insertMovieCommentDB } from '../../axios/detail/contentsLogic';
import { getCookie } from '../../utils/getCookies';
import { useSnackbar } from 'notistack';

          const MovieDetailMidSection = ({ movieDetail, posterUrl , ottInfo }) => {
            const userId = getCookie('userId');
            const userName = getCookie('userName');
            const userProfileImage = getCookie('userProfileImage')

            const movieId = movieDetail.movieId;
            const movieSeq = movieDetail.movieSeq;
            const [open, setOpen] = React.useState(false);
            const [alertOn, setAlertOn] = React.useState(false);
            const [textLength, setTextLength] = React.useState(0);
            const [textValue, setTextValue] = React.useState('');
            const [spoilerActive, setSpoilerActive] = React.useState(false);
            const [anchorEl, setAnchorEl] = React.useState(null);
            const { enqueueSnackbar } = useSnackbar(); 

            const handlePopoverOpen = (event) => {setAnchorEl(event.currentTarget);};
            const handlePopoverClose = () => {setAnchorEl(null);};
            const popoverOpen = Boolean(anchorEl);
            const handleOpen = () => {
              if (userId) {
                setOpen(true);
              } else {
                setAlertOn(true);
                enqueueSnackbar('로그인 후 이용하실 수 있습니다.', { variant: 'error' });
              }
            };
            const handleClose = () => setOpen(false); 


            //코멘트 등록 함수
            const handleWriteComment = async() => {
              const commentData = {
               movieId : movieId,
               movieSeq : movieSeq,
               commentDetail : textValue,
               spolierStatus : spoilerActive,
               userId : userId,
               userName : userName,
               userProfileImage : userProfileImage 
              }
              console.log(commentData);
              try {
                const res = await insertMovieCommentDB(commentData)
                console.log(res.data);
                if(res === 1){
                  window.location.reload();
                  enqueueSnackbar('코멘트를 등록했습니다!', { variant: 'success' });
                  setAlertOn(true);
                }else{
                  enqueueSnackbar('코멘트를 등록하지 못했습니다!', { variant: 'error' });
                  setAlertOn(true);
                }
              } catch (error) {
                console.log('코멘트 등록 실패 :' , error);
                enqueueSnackbar('네트워크 오류!', { variant: 'error' });
                  setAlertOn(true);
              }
            }


       //보관함 추가(보고싶어요 함수)
       const handleAddtoArchive = async() => {
        if (userId) {

        }else{
          setAlertOn(true);
        }
       }

            const formattedKeywords = movieDetail.keywords
            ? movieDetail.keywords.split(',').map(keyword => `#${keyword.trim()}`).join(' ')
            : '';
        

            const ottPlatforms = Object.keys(ottInfo).filter(
              (platform) => platform !== "movieSeq" && platform !== "title" && ottInfo[platform]
            );
            
          const ottLinks = {
          netflix: "https://www.netflix.com/",
          watcha: "https://www.watcha.com/",
          wavve: "https://www.wavve.com/",
          tving: "https://www.tving.com",
          disneyplus: "https://disneyplus.com",
          appletv: "https://www.apple.com/kr/apple-tv-plus/"
        };



    /*  Style  */
            const midSection1Style = {
              width: '1525px', height: '750px', backgroundColor: '#f5f5f5', display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            };


            const contentContainer = {
              marginTop:'550px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              width: '90%',
            };

            const contentStyle = {
              display: 'flex', maxHeight:'650px', marginBottom : '650px',
              flexDirection: 'column', alignItems: 'flex-start',
            };

            const posterStyle = {
              width: '300px', height: '450px', objectFit: 'cover',
              marginRight: '50px',
            };
          
            const ottInfoStyle = {
              display: 'flex', alignItems: 'center',width: '650px',
              marginTop : '40px',
            };

            const ottUnderline = {
              width: '1000px', borderBottom: '1px solid black', opacity:'10%',
              marginBottom: '40px',
            };

            const ottLogoStyle = {
              width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', 
              backgroundColor : '#000000', border: '3px solid white', marginBottom:'40px', marginRight: '20px',
              cursor: 'pointer',
            };

            const plotTextStyle = {
              maxWidth: '1000px', fontSize: '13px', opacity: '80%',
              marginTop : '5px'
            };


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
              <div style={midSection1Style}>
                <div style={contentContainer}>
            
                {/* 포스터 div */}
                  <div style={contentStyle}>
                    <img src={posterUrl} alt={movieDetail.title} style={posterStyle} />
                    <div style={{marginTop:'20px' , maxWidth:'300px' , maxHeight:'300px' , textAlign:'center'}}>
                    <Typography variant="button" style={{ fontSize: '13px', marginTop: '30px', opacity: '60%' }}>{formattedKeywords}</Typography>
                    </div>
                  </div>
            
                {/* OTT 유무 & 보관함 추가 */}
                  <div style={{ flex: 1 }}>
                    <Typography variant='h6' style={{fontSize:'20px' , opacity:'85%'}}>감상 가능한 서비스</Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                
                
                  <div style={ottInfoStyle}>
                  {ottPlatforms.length === 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '30px' , marginBottom:'30px'}}>
    <IconButton>
    <SentimentVeryDissatisfiedIcon style={{fontSize:'75px'}}/>
    </IconButton>
                
                    <Typography variant="h6" style={{ opacity: '60%' }}>... 감상 가능한 OTT 없음</Typography>
        </div>
                  ) : (
                    ottPlatforms.map((platform) => (
                      <a
                        key={platform}
                        href={ottLinks[platform]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <img
                          key={platform}
                          src={`/images/logo/${platform}.png`}
                          alt={platform}
                          style={ottLogoStyle}
                        />
                      </a>
                    ))
                  )}
                </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '80px' }}>
                      <IconButton onClick={handleAddtoArchive}>
        <BookmarkAddIcon style={{fontSize:'60px'}}/>
      </IconButton>
      <Typography variant='subtitle2' style={{opacity:'60%'}}>보고싶어요</Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginLeft: '40px' }}>
                      <IconButton onClick={handleOpen}>
        <EditIcon style={{fontSize:'60px'}}/>
      </IconButton>
      <Typography variant='subtitle2' style={{opacity:'60%'}}>코멘트</Typography>
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
        onClick={handleWriteComment}
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
      </div>

                    </div>



                      <div style={ottUnderline}/>
                    <Typography variant="h6" style={plotTextStyle}>
                      {movieDetail.plotText}
                    </Typography>
                  </div>
                </div>
                  {/* 알림 창 */}
                  <Snackbar open={alertOn} autoHideDuration={3000} onClose={handleClose}>
         </Snackbar>
              </div>



            );
          };

          export default MovieDetailMidSection;
