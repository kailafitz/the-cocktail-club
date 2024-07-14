import React from "react";
import { useQuery } from "react-query";
import Typography from "@mui/material/Typography";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Loading from "../../Components/Status/Loading";
import { useNavigate } from "react-router-dom";
import EditBio from "../../Components/EditBio";
import Error from "../../Components/Status/Error";
import { api } from "../../axios";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CocktailCard from "../../Components/CocktailCard";
import { ICocktailCard } from "../../Interfaces";

const Profile = () => {
  const navigate = useNavigate();
  const { data, status } = useQuery(["Get Account Details"], () =>
    api
      .get("api/profile", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
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
        <Error message="Something went wrong!" />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer pt>
      <Typography variant="pageHeading">My Profile</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        spacing={3}
        // alignItems={{ md: "flex-start" }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={3}
          sx={{
            width: "330px",
            p: 3,
            border: 2,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
          justifyContent={{ md: "space-between" }}
        >
          <Box
            sx={{
              background: "url('/cocktail.webp') no-repeat center / cover",
              borderRadius: "500px",
              width: "150px",
              height: "150px",
            }}
          />
          <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
            {data.user.first_name} {data.user.last_name}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {data.user.bio}
          </Typography>
          <EditBio user={data.user} />
        </Stack>
        <Box
          sx={{
            width: "-webkit-fill-available",
            border: 2,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
          p={3}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">Latest Cocktail Creations</Typography>
            <Button variant="primaryDark" href="/my-cocktails">
              View all
            </Button>
          </Stack>
          <Stack
            direction={{ xs: "row" }}
            justifyContent="space-between"
            spacing={3}
          >
            {data.cocktails.map((c: ICocktailCard, i: number) => {
              return (
                <CocktailCard
                  key={i}
                  id={c.id.toString()}
                  image_url={c.image_url}
                  name={c.name}
                  category={c.category}
                  db="custom"
                />
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </ViewHeightContainer>
  );
};

export default Profile;
