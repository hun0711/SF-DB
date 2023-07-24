import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const headerPropTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};


function Header(props) {
/***********************************************************************/
{/* 함수 정의 */}

  // 검색어를 상태로 관리
  const [searchQuery, setSearchQuery] = React.useState('');

  // 검색 기능
  const handleSearch = () => {
    // 여기서 searchQuery를 이용하여 검색 기능을 수행
    console.log('검색어:', searchQuery);
  };

  // InputBase의 onChange 이벤트로 검색어를 업데이트
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


/************************************************************************/

  const { sections } = props;

  return (
    <React.Fragment>
      {/* 최상위 툴바 */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          bgcolor: 'background.paper',
          height: '0px', // 높이 조정 가능
        }}
      >
        {/* 회원가입 버튼 */}
        <Button variant="outlined" size="small">
          로그인
        </Button>
      </Toolbar>


      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
      {/* Subscribe 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size="large">Subscribe</Button>
        </Box>

        {/* 로고 */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <img
            src="/images/SF-DB.png"
            alt="SF-DB 로고"
            style={{ width: '200px', height: '200px', marginRight: '10px' }}
          />
        </Box>

        {/* 검색 바 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = headerPropTypes;
export default Header;