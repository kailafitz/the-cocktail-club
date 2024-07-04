import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SearchByLetter from "../../Components/CocktailSearch/SearchByLetter";
import CocktailCard from "../../Components/CocktailCard";
import SearchByIngredient from "../../Components/CocktailSearch/SearchByIngredient";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Loading from "../../Components/Status/Loading";
import { CocktailDbInterface } from "../../Interfaces";
import ScrollTop from "../../Components/ScrollToTop";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchByName from "../../Components/CocktailSearch/SearchByName";

export const Search = () => {
  const [results, setResults] = useState<CocktailDbInterface[]>([]);
  const [searchMethod, setSearchMethod] = useState("ingredient");

  const handleChange = (event: SelectChangeEvent) => {
    setSearchMethod(event.target.value as string);
  };

  console.log("results", results);

  return (
    <>
      <ViewHeightContainer pt>
        <Select value={searchMethod} onChange={handleChange} sx={{ mb: 5 }}>
          <MenuItem value="name">Search By Name</MenuItem>
          <MenuItem value="ingredient">Search By Ingredient</MenuItem>
          <MenuItem value="letter">Search By Letter</MenuItem>
        </Select>
        {searchMethod === "ingredient" && (
          <SearchByIngredient searchByIngredient={setResults} />
        )}
        {searchMethod === "name" && <SearchByName searchByName={setResults} />}
        {searchMethod === "letter" && (
          <SearchByLetter searchByLetter={setResults} />
        )}
        <ScrollTop />

        <Stack
          direction="column"
          justifyContent="center"
          pb={4}
          flexGrow={1}
          id="results"
        >
          {results.length >= 1 ? (
            <Grid container spacing={6} justifyContent="center">
              {results.map((drink: CocktailDbInterface, i: number) => {
                return (
                  <>
                    {drink.idDrink ? (
                      <CocktailCard
                        key={drink.idDrink}
                        id={drink.idDrink}
                        img={drink.strDrinkThumb}
                        name={drink.strDrink}
                        category={drink.strAlcoholic}
                        db="api"
                      />
                    ) : (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={348}
                        height={348}
                      />
                    )}
                  </>
                );
              })}
            </Grid>
          ) : results.length < 1 ? (
            <Typography variant="body2" align="center">
              Nothing to see here. . . yet
            </Typography>
          ) : (
            <Loading color="light" />
          )}
        </Stack>
      </ViewHeightContainer>
    </>
  );
};
