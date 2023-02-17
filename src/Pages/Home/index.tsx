import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Loading } from "../../Components/Status/Loading";
import { Error } from "../../Components/Status/Error";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import { IconButton, Typography } from "@mui/material";
import { DrinkInterface } from "../../Interfaces";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import {
  StyledContainer,
  StyledDarkBackground,
  StyledCocktailBackground,
  StyledCocktailImg,
  ActionSearchButton,
  FlexboxColumn,
  FlexboxRow,
} from "./styles";
// import goldDivider from "../Media/gold_divider.png";

export const Home = () => {
  const theme = useTheme();

  const { data, status } = useQuery(
    ["drinkDetails"],
    () =>
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then((res) => res.data.drinks),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (status === "success") {
    return (
      <>
        <StyledContainer>
          {data.map((drink: DrinkInterface) => {
            return (
              <React.Fragment key={drink.idDrink}>
                <StyledDarkBackground />
                <StyledCocktailBackground
                  sx={{
                    background: {
                      xs: `linear-gradient(to bottom, ${theme.palette.common.black}, #ffffff00) rgba(21, 21, 20, 0.3)`,
                      md: `linear-gradient(to right, ${theme.palette.common.black}, #ffffff00) rgba(21, 21, 20, 0.3)`,
                    },
                  }}
                >
                  <StyledCocktailImg
                    src={`${drink.strDrinkThumb}`}
                    alt="cocktail of the day image"
                  />
                </StyledCocktailBackground>
                <FlexboxRow>
                  <FlexboxColumn>
                    {/* <GoldDivider
                      src={goldDivider}
                      alt="Gold Divider"
                      style={{ transform: "scaleY(-1)" }}
                    /> */}
                    <Typography variant="h3" color="primary" align="center">
                      Welcome to the Club
                    </Typography>
                    <Typography color="primary" align="center">
                      Curating the careful craft of cocktails since 1898
                    </Typography>
                    {/* <GoldDivider src={goldDivider} alt="Gold Divider" /> */}
                    <Typography
                      variant="h6"
                      color="white"
                      align="center"
                      sx={{
                        mt: 5,
                      }}
                    >
                      Search our extensive range of luxury cocktails
                    </Typography>
                    <ActionSearchButton variant="outlined" href="/search">
                      Search
                    </ActionSearchButton>
                  </FlexboxColumn>
                  <FlexboxColumn>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      sx={{ fontFamily: "Work Sans" }}
                    >
                      How to make our cocktail of the day
                      <IconButton
                        aria-label="view-details"
                        href={`drink/${drink.idDrink}/details`}
                        sx={{ color: `${theme.palette.common.white}` }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      // noWrap
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {drink.strDrink}
                    </Typography>
                  </FlexboxColumn>
                </FlexboxRow>
              </React.Fragment>
            );
          })}
        </StyledContainer>
      </>
    );
  }

  if (status === "loading") {
    return (
      <ViewHeightContainer>
        <Loading color={`${theme.palette.common.white}`} />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer>
        <Error
          message="Something went wrong!"
          color={`${theme.palette.common.white}`}
        />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer>
      <Loading color={`${theme.palette.common.white}`} />
    </ViewHeightContainer>
  );
};
