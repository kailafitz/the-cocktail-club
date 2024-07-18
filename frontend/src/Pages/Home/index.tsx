import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../Components/Status/Loading";
import Error from "../../Components/Status/Error";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { wait } from "@testing-library/user-event/dist/utils";
import Button from "@mui/material/Button";
import Lights from "../../Components/Lights";
import Box from "@mui/material/Box";
import { IApiCocktail } from "../../Interfaces";
import { useTheme } from "@mui/material";

const dailyDrinks = [
  // "12130",
  // "12756",
  // "11149",
  "13024",
  // "13847",
  // "178350",
  // "15743",
  // "12162",
  // "16985",
  // "12107",
  // "178354",
  // "11602",
  // "17252",
];

export const Home: React.FC = () => {
  const theme = useTheme();
  const randomInt = (max: number, min: number) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return randomNumber;
  };

  const { data, status } = useQuery(
    ["Feature Drink"],
    () =>
      wait(500).then(() =>
        axios
          .get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
              dailyDrinks[randomInt(0, dailyDrinks.length - 1)]
            }`
          )
          .then((res) => res.data.drinks)
      ),
    {
      refetchOnWindowFocus: false,
      // refetchInterval: 10000,
    }
  );

  if (status === "loading") {
    return (
      <ViewHeightContainer vh center>
        <Loading color="light" />
      </ViewHeightContainer>
    );
  }

  if (status === "error" || (status === "success" && data === null)) {
    return (
      <ViewHeightContainer center>
        <Error message="Apologies but something has gone wrong. Please check back later or report this to our support team at support@thecocktailclub.com. We apologise for this inconvenience and hope to back up shortly!" />
      </ViewHeightContainer>
    );
  }

  return (
    <>
      <ViewHeightContainer
        pt
        sx={{
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Stack direction="column">
          <Typography
            variant="h1"
            align="left"
            sx={{
              fontSize: { xs: "4rem", md: "9rem" },
            }}
            className="on-load-animation"
          >
            Indulge in
            <br className="break" /> the mastery
          </Typography>
        </Stack>
        <Box className="on-load-animation-2" sx={{ opacity: 0 }}>
          <Typography variant="h4" align="left" mb={2}>
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
        </Box>
        <Stack
          className="on-load-animation-3"
          sx={{ opacity: 0 }}
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, sm: 5 }}
        >
          <Button
            variant="minimal"
            href="/search"
            endIcon={<ArrowForwardIcon />}
          >
            Find a cocktail
          </Button>
          <Button variant="minimal" href="/" endIcon={<ArrowForwardIcon />}>
            Join a masterclass
          </Button>
        </Stack>
        <Lights />
      </ViewHeightContainer>
      {data.map((drink: IApiCocktail) => {
        return (
          <React.Fragment key={drink.idDrink}>
            <Box
              sx={{
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                position: "absolute",
                display: { xs: "none", md: "block" },
                top: 0,
                right: 0,
                height: "100%",
                width: "10%",
                zIndex: -1,
              }}
            >
              <Box
                className="image on-load-image-animation"
                sx={{
                  height: "100%",
                  transform: "translateY(-1000px)",
                  // background: `url('/cocktail.webp') no-repeat center / cover, url('/cocktail.png') no-repeat center / cover`,
                }}
              />
            </Box>
            {/* <Button
                  // noWrap
                  sx={{
                    textTransform: "capitalize",
                    marginTop: { xs: "-5rem", md: "-7rem" },
                    fontSize: { xs: "2.5rem", lg: "4rem" },
                  }}
                  href={`drink/${drink.idDrink}/details`}
                >
                  {drink.strDrink}
                </Button> */}
          </React.Fragment>
        );
      })}
    </>
  );
};
