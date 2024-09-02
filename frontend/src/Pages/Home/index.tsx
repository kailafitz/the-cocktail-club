import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Lights from "../../Components/Lights";
import Box from "@mui/material/Box";
import HomeSearch from "../../Components/HomeSearch";

export const Home: React.FC = () => {
  return (
    <>
      <Box sx={{ minHeight: "100vh", position: "relative" }} mb={{ md: 20 }}>
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
            <Typography
              variant="h2"
              align="left"
              mb={5}
              className="on-load-animation delay-1"
            >
              Curating the careful craft of cocktails since 1898
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="on-load-animation delay-2"
              >
                <img src="/laurel.png" alt="Award Icon" />
                <Typography variant="body2">
                  2024 Bartender Spirits awards
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="on-load-animation delay-3"
              >
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
            zIndex: 5,
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
                zIndex: 1102,
              }}
            />
          </Box>
        </Box>
      </Box>
      <HomeSearch />
      <Lights />
    </>
  );
};
