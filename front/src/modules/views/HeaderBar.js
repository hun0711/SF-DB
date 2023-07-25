// HeaderBar.js

import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import MenuDrawer from "./MenuDrawer"; // Import the MenuDrawer component here

const rightLink = {
  fontSize: 18,
  color: "white",
  ml: 3,
  lineHeight: "1",
  padding: "8px 12px",
};

function HeaderBar() {
  const [isMenubarOpen, setIsMenubarOpen] = React.useState(false);

  const handleMenuIconClick = () => {
    setIsMenubarOpen(!isMenubarOpen);
  };

  const handleMenubarClose = () => {
    setIsMenubarOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Menu Icon and text aligned at the same height */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "white" }} onClick={handleMenuIconClick}>
              <MenuIcon />
              {"MENU"}
            </IconButton>
          </Box>

          {/* Logo and "SFDB" centered */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="/images/SF-DBW.png"
              alt="SF-DB logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 24 }}
            >
              {"SFDB"}
            </Link>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {/* Search Bar */}
            <Box>
              <SearchBar />
            </Box>

            {/* Login Link */}
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login"
              sx={rightLink}
            >
              {"로그인"}
            </Link>

            {/* Register Link */}
            <Link
              variant="h6"
              underline="none"
              href="/register"
              sx={{ ...rightLink, color: "science.main" }}
            >
              {"가입하기"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Use the MenuDrawer component here */}
      <MenuDrawer isOpen={isMenubarOpen} onClose={handleMenubarClose} />

      <Toolbar />
    </div>
  );
}

export default HeaderBar;
