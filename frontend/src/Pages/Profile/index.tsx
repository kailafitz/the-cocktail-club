import React from "react";
import { useQuery } from "react-query";
import Typography from "@mui/material/Typography";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Loading from "../../Components/Status/Loading";
import EditBio from "../../Components/EditBio";
import Error from "../../Components/Status/Error";
import { api } from "../../axios";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CocktailCard from "../../Components/CocktailCard";
import { ICocktailCard } from "../../Interfaces";
import CreateCocktailForm from "../../Components/CreateCocktailForm";

const Profile = () => {
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
      >
        {/* Profile Card */}
        <Stack
          direction="column"
          alignItems="center"
          spacing={3}
          sx={{
            width: { xs: "-webkit-fill-available", md: "330px" },
            // maxWidth: "330px",
            margin: "0 auto",
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
        {/* Latest creations */}
        <Stack
          direction="column"
          // justifyContent="space-between"
          sx={{
            width: "-webkit-fill-available",
            border: 2,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
          p={3}
        >
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="body1">Latest Creations</Typography>
            <Button variant="primaryDark" href="/my-cocktails">
              View all
            </Button>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={
              data.cocktails.length > 3 ? "space-between" : "space-evenly"
            }
            spacing={3}
            flexGrow={1}
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
            {data.cocktails.length === 0 && (
              <Stack
                direction="column"
                justifyContent="center"
                spacing={3}
                alignItems="center"
              >
                <Typography variant="body1">No cocktails created.</Typography>
                <CreateCocktailForm />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </ViewHeightContainer>
  );
};

export default Profile;
