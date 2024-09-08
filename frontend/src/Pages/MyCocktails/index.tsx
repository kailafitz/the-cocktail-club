import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import CocktailList from "../../Components/CocktailList";
import Typography from "@mui/material/Typography";
import CreateCocktailForm from "../../Components/CreateCocktailForm";

const MyCocktails = () => {
  return (
    <ViewHeightContainer>
      <Typography variant="pageHeading">My Cocktails</Typography>
      <CreateCocktailForm />
      <CocktailList />
    </ViewHeightContainer>
  );
};

export default MyCocktails;
