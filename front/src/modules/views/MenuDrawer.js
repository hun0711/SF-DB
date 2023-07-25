// MenuDrawer.js

import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MenuDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", backgroundColor: "transparent" } }}
    >
      {/* Close button */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}
      >
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        {/* Add your menu items here */}
        <ListItem>
          <ListItemText primary="메뉴 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="메뉴 2" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default MenuDrawer;
