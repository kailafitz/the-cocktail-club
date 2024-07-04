import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Spin as Hamburger } from "hamburger-react";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import { StyledAppBar, StyledIconButton } from "./styles";
import { Link as NavLink } from "react-router-dom";
import Logout from "../../Logout";
import { useAuthentication } from "../../../Helper";
import LinkButton from "../../LinkButton";

const standardRoutes = [
  {
    href: "/",
    text: "Home",
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

const authRoutes = [
  {
    href: "/create-cocktail",
    text: "Create Cocktail",
  },
  {
    href: "/search",
    text: "Search",
  },
  {
    href: "/profile",
    text: "My Profile",
  },
  {
    href: "/my-cocktails",
    text: "My Cocktails",
  },
];

const Navigation = () => {
  const { isAuth, status } = useAuthentication();
  const [open, setOpen] = useState(false);

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
          bgcolor: "common.black",
          zIndex: 7,
          transform: open ? "none" : "translateY(-80px)",
          transition: "transform .6s ease-in-out",
        }}
      >
        <AppBar position="fixed" elevation={0}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 5,
                "a:not(:last-child):after": {
                  content: "'|'",
                  mx: 1,
                  opacity: 0.3,
                },
              }}
            >
              {standardRoutes.map((link, i) => {
                return (
                  <React.Fragment key={link.text}>
                    <Link
                      component={NavLink}
                      key={i}
                      to={link.href}
                      sx={{
                        color: "common.black",
                      }}
                      onClick={() => setOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </React.Fragment>
                );
              })}
              {status !== "error" &&
                authRoutes.map((link, i) => {
                  return (
                    <React.Fragment key={link.text}>
                      <Link
                        component={NavLink}
                        key={i}
                        to={link.href}
                        sx={{ color: "common.black" }}
                        onClick={() => setOpen(false)}
                      >
                        {link.text}
                      </Link>
                    </React.Fragment>
                  );
                })}
            </List>
            {isAuth ? (
              <Logout />
            ) : (
              <Stack direction={{ xs: "column", md: "row" }}>
                <LinkButton
                  label="Login"
                  path="/login"
                  styles={{ width: "fit-content" }}
                />
                <LinkButton
                  label="Sign up"
                  path="/sign-up"
                  styles={{ width: "fit-content" }}
                />
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <StyledAppBar elevation={0}>
        <Link
          variant="body1"
          noWrap
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
};

export default Navigation;
