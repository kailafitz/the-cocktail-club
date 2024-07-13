import React from "react";
import { Box, Link, Typography } from "@mui/material";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";

const images = [
  "https://images.unsplash.com/photo-1712025852300-489332162a38?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594401788682-bd51cc049fb0?q=80&w=2656&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594402009851-c13958f73e3f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1667927041742-b20353eb3f4d?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666307587360-4c7a074199cd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const About = () => {
  return (
    <>
      <ViewHeightContainer pt sx={{ pb: { xs: 10, sm: 0 } }}>
        <Typography
          variant="pageHeading"
          sx={{
            fontSize: { lg: "6rem" },
          }}
        >
          About The Cocktail Club
        </Typography>
        <Typography variant="body1">
          This web app is a passion project as like many others, I do love a
          cocktail. I've created a space specifically for the art of mixology by
          taking the online{" "}
          <Link href="https://www.thecocktaildb.com/api.php" target="_blank">
            CocktailDb API
          </Link>{" "}
          as an "official" library of cocktails and combined it with a cocktail
          database created by users.
          <br />
          This is a Node.js application with a React frontend. I'm using
          React-Query to fetch and post data. A PostgreSQL database to allow for
          user custom creations. Passport.js authentication is also utilised for
          users to sign up and start creating their own library of custom
          cocktails.
          <br />
          The data is not always of high quality from the CocktailDb API so
          there are caveats with formatting as you will see.
        </Typography>
      </ViewHeightContainer>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
        {images.map((src, i) => {
          return (
            <img
              key={i}
              src={src}
              className="about-image"
              alt={`about img ${i}`}
            />
          );
        })}
      </Box>
    </>
  );
};

export default About;
