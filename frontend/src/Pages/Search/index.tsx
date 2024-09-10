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
import { IApiCocktail } from "../../Interfaces";
import ScrollTop from "../../Components/ScrollToTop";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchByName from "../../Components/CocktailSearch/SearchByName";
import CocktailSearchUrl from "../../Components/CocktailSearch";

export const Search = () => {
  const [results, setResults] = useState<IApiCocktail[]>([]);

  return (
    <>
      <ViewHeightContainer>
        <CocktailSearchUrl />
        {/* <Select
          value={searchMethod}
          onChange={handleChange}
          sx={{ mb: 5 }}
          IconComponent={KeyboardArrowUpIcon}
        >
          <MenuItem value="name">Search By Name</MenuItem>
          <MenuItem value="ingredient">Search By Ingredient</MenuItem>
          <MenuItem value="letter">Search By Letter</MenuItem>
        </Select>
        {searchMethod === "ingredient" && (
          <SearchByIngredient searchBy={setResults} />
        )}
        {searchMethod === "name" && <SearchByName searchBy={setResults} />}
        {searchMethod === "letter" && <SearchByLetter searchBy={setResults} />} */}
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
              {results.map((drink: IApiCocktail, i: number) => {
                return (
                  <>
                    {drink.idDrink ? (
                      <Grid xs={12} sm={5} md={4}>
                        <CocktailCard
                          key={drink.idDrink}
                          id={drink.idDrink}
                          image_url={drink.strDrinkThumb}
                          name={drink.strDrink}
                          category={drink.strAlcoholic}
                          db="api"
                        />
                      </Grid>
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
            <Typography
              variant="body2"
              align="center"
              sx={{ display: { xs: "none", md: "block" } }}
            >
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
