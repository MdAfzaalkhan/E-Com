import React, { useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Drawers = () => {
  const [openDrawer, setOpenDrawer] = useState(false);


  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
            width: "30%",
          },
        }}
      >
        <List>
              <ListItemButton>
                <ListItemIcon sx={{ textAlign: "center" }}>
                  <ListItemText sx={{ color: "white" }}><Link to={"/"} style={{textDecoration:'none',color:"white"}}>Home</Link></ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={{ textAlign: "center" }}>
                  <Button variant="contained">Login</Button>
                </ListItemIcon>
              </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ color: "whitesmoke", marginLeft: "auto" }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
    </>
  );
};

export default Drawers;
