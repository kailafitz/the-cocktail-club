import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Status/Loading";
import Error from "../../Components/Status/Error";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { StyledImage, StyledDivider } from "./styles";
import ArrowBack from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSearch } from "../../Helper";
import EditCocktail from "../../Components/EditCocktail";

export const CocktailDetails = () => {
  const navigate = useNavigate();
  const { id, dbType } = useParams() as {
    id: string;
    dbType: "custom" | "apidb";
  };
  const { data, status } = useSearch({
    id: id ?? "",
    dbType: dbType ?? "custom",
  });

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
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
        >
          Go back
        </Button>
        {data !== undefined && dbType === "custom" && (
          <EditCocktail cocktail={data} />
        )}
      </Stack>
      <Typography
        variant="h2"
        sx={{
          pt: 5,
          wordBreak: "break-word",
          textTransform: "capitalize",
          fontSize: { xs: "4rem", lg: "6rem" },
        }}
      >
        {data?.name}
      </Typography>
      <Typography variant="body2">{data?.createdBy}</Typography>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 5,
          mt: 1,
          textTransform: "capitalize",
        }}
      >
        {data?.category}
      </Typography>
      <Grid rowSpacing={{ xs: 2, md: 0 }} columnSpacing={{ md: 5 }} container>
        <Grid xs={12} md={3}>
          <Box
            sx={{
              // bgcolor: "primary.main",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="body1">Ingredients</Typography>
            <List dense={true}>
              {data?.ingredients.map((ingredient: string) => (
                <ListItem key={ingredient}>
                  <ListItemIcon>
                    <KeyboardArrowRightIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid xs={12} md={9}>
          <Box
            sx={{
              // bgcolor: "primary.main",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="body1">Instructions</Typography>
            <List dense={true}>
              {data?.instructions.map((instruction: string) => (
                <ListItem key={instruction}>
                  <ListItemIcon>
                    <KeyboardArrowRightIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
      <StyledDivider />
      <StyledImage src={data?.img} alt="drink image" />
    </ViewHeightContainer>
  );
};
