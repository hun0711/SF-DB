import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';



export default function Orders() {
  return (
    <React.Fragment>
      <Title>보관함</Title>
      <Link color="primary" href="/main" sx={{ mt: 3 }}>
        See more Movies
      </Link>
    </React.Fragment>
  );
}
