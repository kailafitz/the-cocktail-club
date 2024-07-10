import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import CocktailList from "../../Components/CocktailList";
import Typography from "@mui/material/Typography";
import CreateCocktailForm from "../../Components/CreateCocktailForm";
import GetImage from "../../Components/GetImage";

const MyCocktails = () => {
  return (
    <ViewHeightContainer pt>
      <Typography
        variant="pageHeading"
        sx={{
          fontSize: { lg: "6rem" },
        }}
      >
        My Cocktails
      </Typography>
      <CreateCocktailForm />
      <CocktailList />
      <GetImage />
    </ViewHeightContainer>
  );
};

export default MyCocktails;
