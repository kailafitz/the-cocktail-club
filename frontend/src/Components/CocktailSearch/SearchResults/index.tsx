import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IApiCocktail } from "../../../Interfaces";
import CocktailCard from "../../CocktailCard";
import Loading from "../../Status/Loading";

const SearchResults: React.FC = () => {
  let [searchParams] = useSearchParams();
  const [results, setResults] = useState<IApiCocktail[]>([]);

  const data = async () => {
    if (
      searchParams.get("method") === null ||
      searchParams.get("method") === "ingredient"
    ) {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParams.get(
          "value"
        )}`
      );
      let drinks = res.data.drinks ?? [];
      setResults(drinks);
    } else if (searchParams.get("method") === "name") {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParams.get(
          "value"
        )}`
      );
      let drinks = res.data.drinks ?? [];
      setResults(drinks);
    } else if (searchParams.get("method") === "letter") {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParams.get(
          "value"
        )}`
      );
      let drinks = res.data.drinks ?? [];
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
    }
  };

  useEffect(() => {
    data();
  }, [searchParams]);

  return (
    <>
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
    </>
  );
};

export default SearchResults;
