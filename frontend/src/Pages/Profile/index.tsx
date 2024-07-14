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
import CocktailList from "../../Components/CocktailList";
import Button from "@mui/material/Button";

const Profile = () => {
  const navigate = useNavigate();
  const { data, status } = useQuery(["Get Account Details"], () =>
    api
      .get("api/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("res", res.data);
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
        spacing={7}
        alignItems={{ md: "flex-start" }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={3}
          sx={{
            width: "330px",
            p: 3,
            border: 1,
            borderColor: "primary.main",
            borderWidth: "2px",
            borderRadius: "16px",
          }}
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
            {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {data.bio}
          </Typography>
          <EditBio user={data} />
        </Stack>
        <Box sx={{ width: "-webkit-fill-available" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">My Cocktails</Typography>
            <Button variant="primaryDark" href="/my-cocktails">
              View all
            </Button>
          </Stack>
          <CocktailList />
        </Box>
      </Stack>
    </ViewHeightContainer>
  );
};

export default Profile;
