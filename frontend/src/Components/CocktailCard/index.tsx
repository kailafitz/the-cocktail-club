import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { StyledNameTypography, StyledCardContent } from "./styles";
import PropTypes from "prop-types";
import { ICocktailCard } from "../../Interfaces";
import DeleteCocktail from "../DeleteCocktail";
import Button from "@mui/material/Button";

const CocktailCard = (props: ICocktailCard) => {
  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "300px",
        width: { xs: "100%", md: "47%", lg: "30%" },
        minWidth: { md: "300px" },
        background: `url('cocktail.webp') no-repeat center / cover`,
        // background: `url('${props.image_url}') no-repeat center / cover`,
      }}
      elevation={0}
    >
      <StyledCardContent>
        <StyledNameTypography gutterBottom variant="h5" component="div">
          {props.name}
        </StyledNameTypography>
        <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
          {props.category}
        </Typography>
        <CardActions
          sx={{
            p: 0,
            mt: 3,
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
  );
};

CocktailCard.propTypes = {
  id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  db: PropTypes.string.isRequired,
};

export default CocktailCard;
