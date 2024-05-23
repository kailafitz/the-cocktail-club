import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Spin as Hamburger } from "hamburger-react";
import { List, ListItemText, ListItemButton, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  StyledAppBar,
  StyledIconButton,
  StyledNavLink,
  StyledTypography,
} from "./styles";

const menuItems = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/search",
    text: "Search",
  },
  {
    href: "/about",
    text: "About",
  },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <StyledIconButton
        disableRipple
        size="large"
        edge="start"
        color={open ? "dark" : "primary"}
        aria-label="open drawer"
        sx={{
          position: "absolute",
          zIndex: 9,
          transition: "color .6s ease",
          p: 0,
          pt: 1,
          pl: 2,
        }}
      >
        <Hamburger toggled={open} toggle={setOpen} size={20} />
      </StyledIconButton>
      <Box
        sx={{
          background: theme.palette.primary.dark,
          zIndex: 7,
          transform: open ? "none" : "translateY(-80px)",
          transition: "transform .6s ease-in-out",
        }}
      >
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 5,
              }}
            >
              {menuItems.map((link) => {
                return (
                  <React.Fragment key={link.text}>
                    <StyledNavLink disablePadding sx={{ width: "fit-content" }}>
                      <ListItemButton
                        disableRipple
                        component="a"
                        href={link.href}
                      >
                        <ListItemText primary={link.text} />
                      </ListItemButton>
                    </StyledNavLink>
                    <StyledTypography>|</StyledTypography>
                  </React.Fragment>
                );
              })}
            </List>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          ml: 5,
        }}
      >
        <StyledAppBar position="relative" elevation={0}>
          <Toolbar>
            <Link
              variant="body1"
              noWrap
              color="primary"
              sx={{
                flexGrow: 1,
                hover: {
                  cursor: "pointer",
                },
              }}
              href="/"
              underline="none"
            >
              The Cocktail Club
            </Link>
          </Toolbar>
        </StyledAppBar>
      </Box>
    </>
  );
}
