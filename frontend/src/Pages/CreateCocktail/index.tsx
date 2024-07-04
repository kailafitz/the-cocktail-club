import React from "react";
import CreateCocktailForm from "../../Components/CreateCocktailForm";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";

const CreateCocktail = () => {
  return (
    <ViewHeightContainer pt>
      <Typography
        variant="pageHeading"
        sx={{
          fontSize: { lg: "6rem" },
        }}
      >
        Create Cocktail
      </Typography>
      <CreateCocktailForm />
    </ViewHeightContainer>
  );
};

export default CreateCocktail;
