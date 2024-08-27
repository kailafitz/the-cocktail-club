import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Lights from "../../Components/Lights";
import Box from "@mui/material/Box";

export const Home: React.FC = () => {
  return (
    <>
      <Box sx={{ minHeight: "100vh", position: "relative" }} mb={20}>
        <ViewHeightContainer
          pt
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Stack direction="column">
            <Typography
              variant="display"
              align="left"
              className="on-load-animation"
            >
              Master the Art
              <br className="break" /> of Mixology
            </Typography>
          </Stack>
          <div>
            <Typography variant="h2" align="left" mb={5}>
              Curating the careful craft of cocktails since 1898
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <img src="/laurel.png" alt="Award Icon" />
                <Typography variant="body2">
                  2024 Bartender Spirits awards
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <img src="/laurel.png" alt="Award Icon" />
                <Typography variant="body2">
                  2024 Bartender Spirits awards
                </Typography>
              </Stack>
            </Stack>
          </div>
        </ViewHeightContainer>
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            background: "url('/cocktail.png') no-repeat center / cover",
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "10%",
            zIndex: -1,
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                background:
                  "linear-gradient(0deg, rgba(21,21,20,1) 0%, rgba(21,21,20,0) 35%);",
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "100%",
                zIndex: 2,
              }}
            />
          </Box>
        </Box>
      </Box>
      <ViewHeightContainer>
        <Stack direction={{ xs: "column" }} mb={20}>
          <Box mb={5}>
            <Typography variant="h2" align="center" mb={2}>
              Search the World's Official Collection of Cocktails
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ width: { xs: "100%", md: "60%" }, mx: "auto" }}
            >
              Through our standardised process of cocktail creating and
              mixology, our experts have put together a certified and tested
              collection of all your favoroute classics and more. Whether you're
              looking to spice up your menu as a business owner or make yourself
              acquainted with the art as an enthusiast, we welcome you.
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "space-between" }}
            spacing={3}
          >
            {[0, 1, 2].map(() => {
              return (
                <Box
                  sx={{
                    maxWidth: { xs: "100%", md: "30%" },
                    position: "relative",
                    "& div:nth-of-type(1)": {
                      transition: "height .5s ease",
                    },
                    button: {
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition:
                        "opacity .5s ease .2s, transform .5s ease .2s",
                    },
                    ":hover": {
                      "& div:nth-of-type(1)": {
                        height: "100%",
                        transition: "height .5s ease",
                      },
                      button: {
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
                      display: { xs: "none", md: "block" },
                      background:
                        "linear-gradient(0deg, rgba(21,21,20,1) 0%, rgba(21,21,20,0) 80%);",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      height: "0%",
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
      <Lights />
    </>
  );
};
