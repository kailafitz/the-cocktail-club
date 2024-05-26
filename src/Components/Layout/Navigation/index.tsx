import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Spin as Hamburger } from "hamburger-react";
import { List, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StyledAppBar, StyledIconButton, StyledTypography } from "./styles";

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
  {
    href: "/contact-us",
    text: "Contact Us",
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
              {menuItems.map((link, i) => {
                return (
                  <React.Fragment key={link.text}>
                    <Link
                      key={i}
                      href={link.href}
                      sx={{ color: "black" }}
                      onClick={() => setOpen(false)}
                    >
                      {link.text}
                    </Link>
                    <StyledTypography>|</StyledTypography>
                  </React.Fragment>
                );
              })}
            </List>
          </Toolbar>
        </AppBar>
      </Box>
      <StyledAppBar elevation={0}>
        <Link
          variant="body1"
          noWrap
          color="primary"
          sx={{
            ml: "56px",
            display: "block",
            hover: {
              cursor: "pointer",
            },
          }}
          href="/"
          underline="none"
        >
          The Cocktail Club
        </Link>
      </StyledAppBar>
    </>
  );
}
