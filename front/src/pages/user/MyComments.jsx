import * as React from 'react';
import Title from './Title';
import RateReviewIcon from '@mui/icons-material/RateReview';


export default function MyComments({ userInfo }) {

  /* Style */
  const myCommentsSectiontyle = {
    minWidth: '600px',
    maxWidth: '600px',
    minHeight: '150px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row'
  };

  return (
    <>
    <div style={{display:'flex'}}>
      <RateReviewIcon style={{marginLeft:'15px',marginRight:'5px' ,marginTop:'3px'}}/><Title>코멘트</Title>
    </div>

    <div style={myCommentsSectiontyle}>

    </div>
    </>
  );
}
