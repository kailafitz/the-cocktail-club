import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container, Typography } from "@mui/material";
import { SearchByLetter } from "../Components/SearchByLetter";
import { CocktailCard } from "../Components/CocktailCard";
import { SearchByIngredient } from "../Components/SearchByIngredient";
import { ViewHeightContainer } from "../Components/ViewHeightContainer";
import { Loading } from "../Components/Loading";
import { styled } from "@mui/material/styles";
import { DrinkInterface } from "../Interfaces";

const GradientBackground = styled(`div`)(
  () => `
  background: linear-gradient(to bottom, rgba(000, 000, 000, 1), rgba(255, 255, 255, 0.2));
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100vw;
  height: 100%;
`
);

export const Search = () => {
  const [data, setData] = useState<DrinkInterface[]>([]);

  return (
    <>
      <GradientBackground />
      <SearchByIngredient searchByIngredient={setData} />
      <Typography
        variant="subtitle2"
        sx={{ textAlign: "center", color: "white" }}
      >
        or search by letter. . .
      </Typography>
      <SearchByLetter searchByLetter={setData} />
      {data !== null ? (
        <Container sx={{ flexGrow: 1, pb: 4 }}>
          <Grid container spacing={6} justifyContent="center">
            {data.map((drink: DrinkInterface) => {
              return (
                <CocktailCard
                  key={drink.idDrink}
                  id={drink.idDrink}
                  src={drink.strDrinkThumb}
                  name={drink.strDrink}
                  category={drink.strAlcoholic}
                />
              );
            })}
          </Grid>
        </Container>
      ) : data === null ? (
        <ViewHeightContainer sx={{ flexGrow: 1 }}>
          <Typography align="center" sx={{ color: "white" }}>
            Nothing found
          </Typography>
        </ViewHeightContainer>
      ) : (
        <ViewHeightContainer vh sx={{ position: "absolute" }}>
          <Loading color="white" />
        </ViewHeightContainer>
      )}
    </>
  );
};
