import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Unstable_Grid2";
import { CocktailCustomInterface } from "../../Interfaces";
import CocktailCard from "../CocktailCard";
import ViewHeightContainer from "../Layout/ViewHeightContainer";
import Loading from "../Status/Loading";
import Error from "../Status/Error";
import { api } from "../../axios";
import Typography from "@mui/material/Typography";

const CocktailList = () => {
  const { data, status } = useQuery(
    ["Get All Cocktails"],
    () =>
      api
        .get("api/cocktails", {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("res", res);
          return res.data;
        }),
    {
      cacheTime: 0,
      refetchOnWindowFocus: true,
    }
  );

  if (status === "loading") {
    return (
      <ViewHeightContainer center>
        <Loading color="light" />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer center>
        <Error message="Soemthing has gone wrong!" />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer sx={{ pb: 4 }} center>
      <Grid container spacing={6} justifyContent="center" id="results">
        {data.length > 0 ? (
          data
            .sort(
              (a: CocktailCustomInterface, b: CocktailCustomInterface) =>
                b.id - a.id
            )
            .map((cocktail: CocktailCustomInterface, i: number) => {
              return (
                <CocktailCard
                  key={cocktail.id}
                  id={cocktail.id.toString()}
                  name={cocktail.name}
                  category={cocktail.category}
                  img={
                    "https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  db="custom"
                />
              );
            })
        ) : (
          <Typography variant="body2">No cocktails created yet.</Typography>
        )}
      </Grid>
    </ViewHeightContainer>
  );
};

export default CocktailList;
