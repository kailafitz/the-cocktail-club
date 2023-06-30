import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container, Typography } from "@mui/material";
import { SearchByLetter } from "../../Components/CocktailSearch/SearchByLetter";
import { CocktailCard } from "../../Components/CocktailCard";
import { SearchByIngredient } from "../../Components/CocktailSearch/SearchByIngredient";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import { Loading } from "../../Components/Status/Loading";
import { DrinkInterface } from "../../Interfaces";
import { useTheme } from "@mui/material/styles";
import { ScrollTop } from "../../Components/ScrollToTop";

export const Search = () => {
  const theme = useTheme();
  const [data, setData] = useState<DrinkInterface[]>([]);

  return (
    <>
      <SearchByIngredient searchByIngredient={setData} />
      <Typography
        variant="subtitle2"
        sx={{ textAlign: "center", color: `${theme.palette.common.white}` }}
      >
        or search by letter. . .
      </Typography>
      <SearchByLetter searchByLetter={setData} />
      <ScrollTop />
      {data.length >= 1 ? (
        <Container sx={{ flexGrow: 1, pb: 4 }} id="results">
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
      ) : data.length < 1 ? (
        <ViewHeightContainer sx={{ flexGrow: 1 }}>
          <Typography
            align="center"
            sx={{ color: `${theme.palette.common.white}` }}
          >
            Nothing to see here. . . yet
          </Typography>
        </ViewHeightContainer>
      ) : (
        <ViewHeightContainer vh sx={{ position: "absolute" }}>
          <Loading color={`${theme.palette.common.white}`} />
        </ViewHeightContainer>
      )}
    </>
  );
};
