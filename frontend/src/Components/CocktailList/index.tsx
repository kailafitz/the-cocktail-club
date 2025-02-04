import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { api } from "../../axios";
import { ICustomCocktailDownload } from "../../Interfaces";
import CocktailCard from "../CocktailCard";
import ViewHeightContainer from "../Layout/ViewHeightContainer";
import Error from "../Status/Error";
import Loading from "../Status/Loading";

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
    <ViewHeightContainer
      pt={data.length > 0 ? true : false}
      sx={{ pb: 10 }}
      center
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        id="results"
      >
        {data.length > 0 ? (
          data
            .sort(
              (a: ICustomCocktailDownload, b: ICustomCocktailDownload) =>
                b.id - a.id
            )
            .map((cocktail: ICustomCocktailDownload) => {
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
