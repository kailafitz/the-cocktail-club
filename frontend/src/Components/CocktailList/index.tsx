import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Unstable_Grid2";
import { ICocktailCustom, ICocktailDownload } from "../../Interfaces";
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

  console.log(data);

  return (
    <ViewHeightContainer sx={{ py: 5 }} center>
      <Grid container spacing={6} justifyContent="center" id="results">
        {data.length > 0 ? (
          data
            .sort((a: ICocktailDownload, b: ICocktailDownload) => b.id - a.id)
            .map((cocktail: ICocktailDownload) => {
              return (
                <CocktailCard
                  key={cocktail.id}
                  id={cocktail.id.toString()}
                  name={cocktail.name}
                  category={cocktail.category}
                  image={cocktail.image_url}
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
