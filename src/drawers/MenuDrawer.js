/* eslint-disable default-case */
import { Box, Drawer, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { navItems } from "../constants";

const MenuDrawer = () => {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <MenuIcon
        fontSize="large"
        onClick={() => {
          setOpenMenuDrawer(true);
        }}
      />
      <Drawer
        variant="temporary"
        anchor="right"
        open={openMenuDrawer}
        onClose={() => {
          setOpenMenuDrawer(false);
        }}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          mt={1}
        ></Box>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            button
            onClick={() => {
              setOpenMenuDrawer(false);
              navigate(item.path);
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
