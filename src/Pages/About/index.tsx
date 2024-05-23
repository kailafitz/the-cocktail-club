import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

type Props = {};

const images = [
  "https://images.unsplash.com/photo-1712025852300-489332162a38?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594401788682-bd51cc049fb0?q=80&w=2656&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594402009851-c13958f73e3f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1667927041742-b20353eb3f4d?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666307587360-4c7a074199cd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const About = (props: Props) => {
  return (
    <>
      <Container sx={{ flexGrow: 1, mb: 20 }}>
        <Box>
          <Typography
            variant="h2"
            color="primary"
            sx={{
              pt: 5,
              pr: 5,
              mt: 5,
              fontSize: { xs: "4rem", lg: "6rem" },
            }}
          >
            About The Cocktail Club
          </Typography>
          <Typography variant="h5" color="primary" mb={4}>
            Who Doesn't Love a Good Cocktail?
          </Typography>

          <Typography variant="body2" color="primary" mb={4}>
            Well I certainly do!
          </Typography>
          <Typography variant="body2" color="primary">
            This website is using the React-Query library to fetch data from the
            TheCocktailDB API found{" "}
            <Link href="https://www.thecocktaildb.com/api.php" target="_blank">
              here
            </Link>
            . Displaying certain information on the cocktails, such as the
            "instructions", has been a challenge regarding formatting. This has
            more to do with how the data was originally saved into the
            "database" so to speak but you will see that I have tried to capture
            the information as best as I can.
          </Typography>
        </Box>
      </Container>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
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
