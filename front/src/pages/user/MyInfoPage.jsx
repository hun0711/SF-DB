import * as React from 'react';
import HeaderBar from '../../components/HeaderBar';
import Footer from '../../components/Footer';
import { Container, Grid, Paper } from '@mui/material';
import Chart from './Chart';
import Orders from './Orders';
import UserProfile from './UserProfile';


export default function MtInfoPage() {

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
                  <UserProfile />
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
           
              {/* 보관함 */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
    <Footer/> 
    </>
  );
}