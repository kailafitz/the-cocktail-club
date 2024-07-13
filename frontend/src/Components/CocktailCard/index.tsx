import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { StyledNameTypography, StyledCardContent } from "./styles";
import PropTypes from "prop-types";
import { ICocktailCard } from "../../Interfaces";
import DeleteCocktail from "../DeleteCocktail";
import Button from "@mui/material/Button";

const CocktailCard = (props: ICocktailCard) => {
  return (
    <Grid xs={12} sm={5} md={4}>
      <Card sx={{ position: "relative", minHeight: "348px" }} elevation={0}>
        <CardMedia
          component="img"
          height="100%"
          image={props.image}
          alt={props.name}
        />
        <StyledCardContent sx={{ p: 3 }}>
          <StyledNameTypography gutterBottom variant="h5" component="div">
            {props.name}
          </StyledNameTypography>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {props.category}
          </Typography>
          <CardActions sx={{ p: 0, mt: 3, position: "relative" }}>
            <Button
              variant="primaryDark"
              endIcon={<ArrowForwardIcon />}
              href={`/search/cocktail/${props.id}/${props.db}/details`}
            >
              View
            </Button>
            {props.db === "custom" && <DeleteCocktail cocktailId={props.id} />}
          </CardActions>
        </StyledCardContent>
      </Card>
    </Grid>
  );
};

CocktailCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  db: PropTypes.string.isRequired,
};

export default CocktailCard;
