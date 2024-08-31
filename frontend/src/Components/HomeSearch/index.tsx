import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const HomeSearch = () => {
  return (
    <ViewHeightContainer>
      <Stack direction={{ xs: "column" }} mb={{ xs: 10, md: 20 }}>
        <Box mb={5}>
          <Typography variant="h2" align="center" mb={2}>
            Search the World's Official Collection of Cocktails
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ width: { xs: "100%", md: "60%" }, mx: "auto" }}
          >
            Through our standardised process of cocktail creating and mixology,
            our experts have put together a certified and tested collection of
            all your favoroute classics and more. Whether you're looking to
            spice up your menu as a business owner or make yourself acquainted
            with the art as an enthusiast, we welcome you.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          spacing={3}
        >
          {[0, 1, 2].map((div, i) => {
            return (
              <Box
                key={i}
                sx={{
                  maxWidth: { xs: "100%", md: "30%" },
                  position: "relative",
                  "& div:nth-of-type(1)": {
                    height: { xs: "100%", md: "0%" },
                    transition: "height .5s ease",
                  },
                  a: {
                    opacity: { xs: 1, md: 0 },
                    transform: {
                      xs: "translateY(0)",
                      md: "translateY(10px)",
                    },
                    transition: "opacity .5s ease .2s, transform .5s ease .2s",
                  },
                  ":hover": {
                    "& div:nth-of-type(1)": {
                      height: "100%",
                      transition: "height .5s ease",
                    },
                    a: {
                      opacity: 1,
                      transform: "translateY(0px)",
                      transition:
                        "opacity .5s ease .2s, transform .5s ease .2s",
                    },
                  },
                }}
              >
                <img
                  src="/cocktail.webp"
                  alt="cocktail"
                  width={400}
                  height="auto"
                  className="w-full"
                />
                <Box
                  sx={{
                    display: "block",
                    background:
                      "linear-gradient(0deg, rgba(21,21,20,1) 0%, rgba(21,21,20,0) 80%);",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    zIndex: 2,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    zIndex: 3,
                  }}
                >
                  <Button
                    variant="primaryDark"
                    href="/search"
                    sx={{
                      width: "fit-content",
                      mx: "auto",
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </ViewHeightContainer>
  );
};

export default HomeSearch;
