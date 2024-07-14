import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";

const About = () => {
  return (
    <>
      <ViewHeightContainer pt sx={{ pb: { xs: 10, sm: 0 } }}>
        <Typography variant="pageHeading">About The Cocktail Club</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={8}>
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1">
              This web app is a passion project as like many others, I do love a
              cocktail. I've created a space specifically for the art of
              mixology by taking the online{" "}
              <Link
                href="https://www.thecocktaildb.com/api.php"
                target="_blank"
              >
                CocktailDb API
              </Link>{" "}
              as an "official" library of cocktails and combined it with a
              cocktail database created by users.
              <br />
              <br />
              This is a Node.js application with a React frontend. I'm using
              React-Query to fetch and post data. Passport.js authentication is
              also utilised for users to sign up and start creating their own
              collection of custom cocktails which are saved to a PostgreSQL
              database.
              <br />
              The data is not always of high quality from the CocktailDb API so
              there are caveats with formatting as you will see.
            </Typography>
          </Box>
          <Box
            sx={{ width: "50%", height: "100%" }}
            className="on-load-image-animation"
          ></Box>
        </Stack>
      </ViewHeightContainer>
    </>
  );
};

export default About;
