import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Loading } from "../../Components/Status/Loading";
import { Error } from "../../Components/Status/Error";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import { Box, Typography } from "@mui/material";
import { DrinkInterface } from "../../Interfaces";
import { useTheme } from "@mui/material/styles";
import {
  ImageContainer,
  FlexboxColumn,
  FlexboxRow,
  StyledIconButton,
} from "./styles";
import { wait } from "@testing-library/user-event/dist/utils";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { AnimatedButton } from "../../Components/AnimatedButton";

const dailyDrinks = [
  "12130",
  "12756",
  "11149",
  "13024",
  "13847",
  "178350",
  "15743",
  "12162",
  "16985",
  "12107",
  "178354",
  "11602",
  "17252",
];

export const Home: React.FC = () => {
  const theme = useTheme();

  const randomInt = (max: number, min: number) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return randomNumber;
  };

  const { data, status } = useQuery(
    ["drinkDetails"],
    () =>
      wait(1000).then(() =>
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
      refetchInterval: 240000000,
    }
  );

  if (status === "success") {
    return (
      <>
        <ViewHeightContainer>
          {data.map((drink: DrinkInterface) => {
            return (
              <React.Fragment key={drink.idDrink}>
                <FlexboxRow>
                  <FlexboxColumn
                    className="onLoadAnimation"
                    sx={{ padding: 0 }}
                  >
                    <Box sx={{ padding: 3 }}>
                      <Typography
                        variant="h1"
                        color="primary"
                        align="left"
                        sx={{
                          fontSize: { xs: "3rem", md: "4rem" },
                        }}
                      >
                        Indulge in the mastery
                      </Typography>
                      <Typography
                        variant="h2"
                        color="primary"
                        align="left"
                        mb={1}
                        sx={{
                          fontSize: { xs: "1.2rem" },
                        }}
                      >
                        Curating the careful craft of cocktails since 1898
                      </Typography>
                      <Typography
                        variant="body1"
                        color="white"
                        align="left"
                        mb={2}
                      >
                        Search our extensive range of luxury cocktails
                      </Typography>
                      <AnimatedButton
                        href="/search"
                        label="Search"
                        sx={{
                          display: "block",
                          fontSize: "1rem",
                          width: { xs: "100%", md: "25%" },
                        }}
                      />
                    </Box>
                  </FlexboxColumn>
                  <FlexboxColumn sx={{ padding: 3 }}>
                    <ImageContainer>
                      <img src={drink.strDrinkThumb} alt="Drink of the Day" />
                    </ImageContainer>
                    <Typography
                      variant="h4"
                      color="white"
                      // noWrap
                      sx={{
                        textTransform: "capitalize",
                        marginTop: { xs: "-5rem", md: "-7rem" },
                        fontSize: { xs: "2.5rem", lg: "4rem" },
                      }}
                    >
                      {drink.strDrink}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                      Start your mixology journey
                      <StyledIconButton
                        aria-label="view-details"
                        href={`drink/${drink.idDrink}/details`}
                      >
                        <ArrowForward />
                      </StyledIconButton>
                    </Typography>
                  </FlexboxColumn>
                </FlexboxRow>
              </React.Fragment>
            );
          })}
        </ViewHeightContainer>
      </>
    );
  }

  if (status === "loading") {
    return (
      <ViewHeightContainer vh center>
        <Loading color={`${theme.palette.common.white}`} />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer vh center>
        <Error
          message="Apologies but something has gone wrong. Please check back later or report this to our support team at support@thecocktailclub.com. We apologise for this inconvenience and hope to back up shortly!"
          color={`${theme.palette.common.white}`}
        />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer vh center>
      <Loading color={`${theme.palette.common.white}`} />
    </ViewHeightContainer>
  );
};
