import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Lights from "../../Components/Lights";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

export const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <ViewHeightContainer
        pt
        sx={{ justifyContent: "center", flexDirection: "column" }}
      >
        <Stack direction="column">
          <Typography
            variant="h1"
            align="left"
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
            }}
            className="onLoadAnimation"
          >
            Master the Art
            <br className="break" /> of Mixology
          </Typography>
        </Stack>
        <div>
          <Typography variant="h2" align="left" mb={5}>
            Curating the careful craft of cocktails since 1898
          </Typography>
          <Stack direction="row" alignItems="center" spacing={4}>
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
        <Lights />
      </ViewHeightContainer>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          background: "url('/cocktail.png') no-repeat center / cover",
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "10%",
          zIndex: -1,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        }}
      />
    </>
  );
};
