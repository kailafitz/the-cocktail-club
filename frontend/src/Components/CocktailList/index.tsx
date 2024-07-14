import React from "react";
import { useQuery } from "react-query";
import { ICocktailDownload } from "../../Interfaces";
import CocktailCard from "../CocktailCard";
import ViewHeightContainer from "../Layout/ViewHeightContainer";
import Loading from "../Status/Loading";
import Error from "../Status/Error";
import { api } from "../../axios";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
    <ViewHeightContainer pt center>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{
          xs: "center",
          md: data.length < 3 ? "flex-start" : "space-between",
        }}
        id="results"
      >
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
                  image_url={cocktail.image_url}
                  db="custom"
                />
              );
            })
        ) : (
          <Typography variant="body1">No cocktails created yet.</Typography>
        )}
      </Stack>
    </ViewHeightContainer>
  );
};

export default CocktailList;
