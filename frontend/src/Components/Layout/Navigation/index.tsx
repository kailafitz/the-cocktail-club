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
import Logo from "../../Logo";
import Container from "@mui/material/Container";

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

  return (
    <>
      <Container sx={{ position: "relative" }}>
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
            pt: 3,
            pl: 2,
          }}
        >
          <Hamburger toggled={open} toggle={setOpen} size={25} />
        </StyledIconButton>
        {/* Logo */}
        <StyledAppBar elevation={0}>
          <Link
            noWrap
            sx={{
              ml: "85px",
              display: "block",
              hover: {
                cursor: "pointer",
              },
            }}
            href="/"
            underline="none"
          >
            <Logo />
          </Link>
        </StyledAppBar>
      </Container>
      {/* Menu */}
      <Box
        sx={{
          bgcolor: "common.black",
          zIndex: 7,
          transform: open
            ? "none"
            : { xs: "translateY(-410px)", md: "translateY(-120px)" },
          transition: "transform .6s ease-in-out",
        }}
      >
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            minHeight: "98px",
            justifyContent: "center",
            pb: { xs: 5, md: 0 },
          }}
        >
          <Container sx={{ position: "relative" }}>
            <Toolbar
              sx={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                pt: { xs: "4rem", md: 0 },
              }}
            >
              <List
                sx={{
                  display: "flex",
                  width: { xs: "100%", md: "fit-content" },
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  ml: { xs: 0, md: 5 },
                  a: {
                    mb: { xs: 3, md: 0 },
                    "&:not(:last-child):after": {
                      content: { xs: "''", md: "'|'" },
                      mx: { xs: 0, md: 1 },
                      opacity: 0.3,
                    },
                  },
                }}
              >
                {!isAuth &&
                  standardRoutes.map((link, i) => {
                    return (
                      <Link
                        component={NavLink}
                        key={i}
                        to={link.href}
                        sx={{
                          color: "common.black",
                        }}
                        onClick={() => setOpen(false)}
                        aria-label={`Link to ${link.text} page`}
                        fontSize={{ xs: "1.5rem", md: "inherit" }}
                      >
                        {link.text}
                      </Link>
                    );
                  })}
                {/* status !== "error" */}
                {isAuth &&
                  authRoutes.map((link, i) => {
                    return (
                      <Link
                        component={NavLink}
                        key={i}
                        to={link.href}
                        sx={{ color: "common.black" }}
                        onClick={() => setOpen(false)}
                        aria-label={`Link to ${link.text} page`}
                        fontSize={{ xs: "1.5rem", md: "inherit" }}
                      >
                        {link.text}
                      </Link>
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
                  spacing={2}
                >
                  <Button
                    variant="primaryLight"
                    href={"/login"}
                    sx={{
                      fontSize: { xs: "1.5rem", md: "revert" },
                    }}
                    onClick={() => setOpen(false)}
                    aria-label="Link to Login page"
                  >
                    Login
                  </Button>
                  <Button
                    variant="primaryLight"
                    href="/sign-up"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "revert" },
                    }}
                    onClick={() => setOpen(false)}
                    aria-label="Link to Sign up page"
                  >
                    Sign up
                  </Button>
                </Stack>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Navigation;
