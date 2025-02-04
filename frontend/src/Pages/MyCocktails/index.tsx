import Typography from "@mui/material/Typography";
import React from "react";
import CocktailList from "../../Components/CocktailList";
import CreateCocktailForm from "../../Components/CreateCocktailForm";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";

const MyCocktails: React.FC = () => {
  return (
    <ViewHeightContainer>
      <Typography variant="pageHeading">My Cocktails</Typography>
      <CreateCocktailForm />
      <CocktailList />
    </ViewHeightContainer>
  );
};

export default MyCocktails;
