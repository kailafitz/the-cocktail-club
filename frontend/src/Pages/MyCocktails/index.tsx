import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import CocktailList from "../../Components/CocktailList";
import Typography from "@mui/material/Typography";

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
      <CocktailList />
    </ViewHeightContainer>
  );
};

export default MyCocktails;
