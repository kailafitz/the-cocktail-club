import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import { ViewHeightContainer } from "../Components/ViewHeightContainer";
import { Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DrinkInterface } from "../Interfaces";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import goldDivider from "../Media/gold_divider.png";

const StyledCocktailBackground = styled(`div`)(
  () => `
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  filter: blur(4px);
`
);

const StyledHeading = styled(Typography)(
  () => `
  color: white;
`
);

const StyledHeading2 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  text-align: center;
`
);

const GoldDivider = styled("img")(
  () => `
    width: 65%;
    margin: 1rem auto;
`
);

const FlexboxRow = styled("div")(
  () => `
  display: flex;
  flex-direction: row;
  overflow: hidden;
  `
);

const FlexboxColumn = styled("div")(
  () => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  `
);

export const Home = () => {
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
          }}
        >
          {data.map((drink: DrinkInterface) => {
            return (
              <React.Fragment key={drink.idDrink}>
                <FlexboxRow>
                  <FlexboxColumn>
                    <StyledCocktailBackground
                      sx={{
                        backgroundImage: `linear-gradient(to right, #151514, #ffffff00), url(${drink.strDrinkThumb})`,
                      }}
                    />
                    <GoldDivider
                      src={goldDivider}
                      alt="Gold Divider"
                      style={{ transform: "scaleY(-1)" }}
                    />
                    <StyledHeading2 variant="h3">
                      Welcome to the Club
                    </StyledHeading2>
                    <StyledHeading2>
                      Curating the careful craft of cocktails since 1898
                    </StyledHeading2>
                    <GoldDivider src={goldDivider} alt="Gold Divider" />
                    <Typography
                      variant="h6"
                      sx={{ color: "white", textAlign: "center", mt: 5 }}
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
                        sx={{ color: "white" }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </StyledHeading>
                    <StyledHeading
                      variant="h1"
                      sx={{ textTransform: "capitalize", wordBreak: "break" }}
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
      <ViewHeightContainer vh>
        <Loading color="white" />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer vh>
        <Error message="Something went wrong!" />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer vh>
      <Loading color="white" />
    </ViewHeightContainer>
  );
};
