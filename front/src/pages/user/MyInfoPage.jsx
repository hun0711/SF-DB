import * as React from 'react';
import HeaderBar from '../../components/HeaderBar';
import Footer from '../../components/Footer';
import { Container, Grid, Paper } from '@mui/material';
import UserProfile from './UserProfile';
import MovieArchive from './MovieArchive';
import MyComments from './MyComments';
import { getCookie } from '../../utils/getCookies';


export default function MyInfoPage() {
 
  const userName = getCookie('userName')
  const userProfileImage = getCookie('userProfileImage');
  const userInfo = {userName, userProfileImage}

  return (
    <>
      <HeaderBar/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 , marginTop: 15}}>
            <Grid container spacing={3}>
                 {/* 프로필 */}
                 <Grid item xs={12} md={4} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <UserProfile userInfo={userInfo}/>
                </Paper>
              </Grid>

              {/* 내 코멘트 */}
              <Grid item xs={12} md={8} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <MyComments userInfo={userInfo} />
                </Paper>
              </Grid>
           
              {/* 보관함 */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MovieArchive userInfo={userInfo}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>

    <div style={{marginTop:'100px'}}>
    <Footer/> 
    </div>
    </>
  );
}