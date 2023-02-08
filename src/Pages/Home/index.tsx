import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Loading } from "../../Components/Status/Loading";
import { Error } from "../../Components/Status/Error";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import { Button, IconButton, Typography } from "@mui/material";
import { DrinkInterface } from "../../Interfaces";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import {
  StyledCocktailBackground,
  StyledHeading,
  StyledHeading2,
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
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            overflow: "hidden",
          }}
        >
          {data.map((drink: DrinkInterface) => {
            return (
              <React.Fragment key={drink.idDrink}>
                <FlexboxRow>
                  <FlexboxColumn>
                    <StyledCocktailBackground
                      sx={{
                        backgroundImage: `linear-gradient(to right, ${theme.palette.common.black}, #ffffff00), url(${drink.strDrinkThumb})`,
                      }}
                    />
                    {/* <GoldDivider
                      src={goldDivider}
                      alt="Gold Divider"
                      style={{ transform: "scaleY(-1)" }}
                    /> */}
                    <StyledHeading2 variant="h3">
                      Welcome to the Club
                    </StyledHeading2>
                    <StyledHeading2>
                      Curating the careful craft of cocktails since 1898
                    </StyledHeading2>
                    {/* <GoldDivider src={goldDivider} alt="Gold Divider" /> */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: `${theme.palette.common.white}`,
                        textAlign: "center",
                        mt: 5,
                      }}
                    >
                      Search our extensive range of luxury cocktails
                    </Typography>
                    <Button
                      variant="outlined"
                      href="/search"
                      sx={{
                        width: "50%",
                        textTransform: "none",
                        margin: "1rem auto",
                      }}
                    >
                      Search
                    </Button>
                  </FlexboxColumn>
                  <FlexboxColumn>
                    <StyledHeading
                      variant="subtitle1"
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
                    </StyledHeading>
                    <StyledHeading
                      variant="h1"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {drink.strDrink}
                    </StyledHeading>
                  </FlexboxColumn>
                </FlexboxRow>
              </React.Fragment>
            );
          })}
        </div>
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
