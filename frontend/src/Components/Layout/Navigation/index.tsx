import React from "react";
import Link from "@mui/material/Link";
import Logo from "../../Logo";
import Container from "@mui/material/Container";
import NavigationMenu from "../../NavigationMenu";

const Navigation = () => {
  return (
    <>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 4,
        }}
      >
        <Link
          noWrap
          sx={{
            hover: {
              cursor: "pointer",
            },
          }}
          href="/"
          underline="none"
        >
          <Logo className="nav-logo" />
        </Link>
        <NavigationMenu />
      </Container>
    </>
  );
};

export default Navigation;
