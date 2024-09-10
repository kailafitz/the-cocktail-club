import React, { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CocktailCard from "../../Components/CocktailCard";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Loading from "../../Components/Status/Loading";
import { IApiCocktail } from "../../Interfaces";
import ScrollTop from "../../Components/ScrollToTop";
import CocktailSearchUrl from "../../Components/CocktailSearch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<IApiCocktail[]>([]);

  const data = async () => {
    if (searchParams.get("method") === null) {
      searchParams.get("ingredient");
      console.log("ingredient page", searchParams);
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParams.get(
          "ingredient"
        )}`
      );
      let drinks = res.data.drinks ?? [];
      setResults(drinks);
      // console.log(drinks);
    } else if (searchParams.get("method") === "name") {
      searchParams.get("name");
      console.log("name page", searchParams);
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParams.get(
          "name"
        )}`
      );
      let drinks = res.data.drinks ?? [];
      setResults(drinks);
    } else if (searchParams.get("method") === "letter") {
      searchParams.get("letter");
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParams.get(
          "letter"
        )}`
      );
      let drinks = res.data.drinks ?? [];
      let sortedDrinks = [];
      if (drinks && drinks.length > 1) {
        setResults(
          drinks.sort(function (a: IApiCocktail, b: IApiCocktail) {
            if (a.strDrink < b.strDrink) {
              return -1;
            }
            if (a.strDrink > b.strDrink) {
              return 1;
            }
            return 0;
          })
        );
      }
      console.log("letter page", searchParams);
    }
  };

  useEffect(() => {
    data();
  }, [searchParams]);
  // console.log(results);

  return (
    <>
      <ViewHeightContainer>
        <CocktailSearchUrl />
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
                  <Fragment key={`${drink.idDrink}_${i}`}>
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
                  </Fragment>
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
