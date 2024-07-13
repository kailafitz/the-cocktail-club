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
import Button from "@mui/material/Button";

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
    href: "/profile",
    text: "My Profile",
  },
  {
    href: "/my-cocktails",
    text: "My Cocktails",
  },
  {
    href: "/search",
    text: "Search",
  },
];

const Navigation = () => {
  const { isAuth } = useAuthentication();
  const [open, setOpen] = useState(false);

  console.log(open);

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
              {!isAuth &&
                standardRoutes.map((link, i) => {
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
                        aria-label={`Link to ${link.text} page`}
                      >
                        {link.text}
                      </Link>
                    </React.Fragment>
                  );
                })}
              {/* status !== "error" */}
              {isAuth &&
                authRoutes.map((link, i) => {
                  return (
                    <React.Fragment key={link.text}>
                      <Link
                        component={NavLink}
                        key={i}
                        to={link.href}
                        sx={{ color: "common.black" }}
                        onClick={() => setOpen(false)}
                        aria-label={`Link to ${link.text} page`}
                      >
                        {link.text}
                      </Link>
                    </React.Fragment>
                  );
                })}
            </List>
            {/* status !== "error" */}
            {isAuth ? (
              <Logout onClick={setOpen} />
            ) : (
              <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                  color: "common.black",
                }}
              >
                <Button
                  variant="primary"
                  href={"/login"}
                  sx={{
                    color: "common.black",
                  }}
                  onClick={() => setOpen(false)}
                  aria-label="Link to Login page"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  href="/sign-up"
                  sx={{
                    color: "common.black",
                  }}
                  onClick={() => setOpen(false)}
                  aria-label="Link to Sign up page"
                >
                  Sign up
                </Button>
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
