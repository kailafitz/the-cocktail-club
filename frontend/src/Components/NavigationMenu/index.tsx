import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link as NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuthentication } from "../../Helper";
import Logout from "../Logout";
import Link from "@mui/material/Link";

const standardRoutes = [
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

const NavigationMenu = () => {
  const { isAuth } = useAuthentication();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: { xs: 140, sm: 200, md: 250 }, p: 3 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          width: { xs: "100%", md: "fit-content" },
          flexDirection: "column",
          mb: 4,
        }}
      >
        {!isAuth &&
          standardRoutes.map((link, i) => {
            return (
              <Link
                component={NavLink}
                key={i}
                to={link.href}
                onClick={() => setOpen(false)}
                aria-label={`Link to ${link.text} page`}
                fontSize={{ xs: "1rem", md: "inherit" }}
              >
                {link.text}
              </Link>
            );
          })}
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
                fontSize={{ xs: "1rem", md: "inherit" }}
              >
                {link.text}
              </Link>
            );
          })}
      </List>
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
              fontSize: { xs: "1", md: "revert" },
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
              fontSize: { xs: "1", md: "revert" },
            }}
            onClick={() => setOpen(false)}
            aria-label="Link to Sign up page"
          >
            Sign up
          </Button>
        </Stack>
      )}
    </Box>
  );

  return (
    <div>
      <Button
        id="menu button"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          transition: "color .6s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "50px",
          height: "20px",
          padding: 0,
          span: {
            transition: "background-color .5s ease",
            backgroundColor: open ? "dark.main" : "primary.main",
          },
          "span:nth-of-type(1)": {
            transform: "translateX(0px)",
            transition: "all .5s ease",
          },
          "span:nth-of-type(2)": {
            transform: "translateX(0px)",
            transition: "all .5s ease",
          },
          "span:nth-of-type(3)": {
            transform: "translateX(0px)",
            transition: "all .5s ease",
          },
          "&:hover": {
            cursor: "pointer",
            "span:nth-of-type(1)": {
              transform: "translateX(-10px)",
              transition: "all .5s ease",
            },
            "span:nth-of-type(2)": {
              transform: "translateX(10px)",
              transition: "all .5s ease",
            },
            "span:nth-of-type(3)": {
              transform: "translateX(-10px)",
              transition: "all .5s ease",
            },
          },
        }}
      >
        <span className="hamburger-span" />
        <span className="hamburger-span" />
        <span className="hamburger-span" />
      </Button>
      <Drawer id="menu" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default NavigationMenu;
