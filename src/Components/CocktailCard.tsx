import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";

const StyledNameTypography = styled(Typography)(
  () => `
  text-transform: capitalize;
  margin-bottom: 0;
  line-height: 1;
`
) as typeof Typography;

const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
    width: 25%;
    transition: all .5s linear;
    border-radius: 0;
    background: ${theme.palette.primary.dark};

  &:hover {
    width: 100%;
    background: ${theme.palette.primary.dark};
    border-radius: 0;

    p {
        width: unset;
        height: unset;
        overflow: hidden;
        opacity: 1;
        display: inline;
    }
  }

  svg {
    color: #fff;
  }

  p {
    width: 0;
    height: 0;
    opacity: 0;
    display: none;
    overflow: hidden;
    color: #fff;
    transition: all .35s ease-in-out;
  }
`
) as typeof IconButton;

const StyledCardContent = styled(CardContent)(
  () => `
    position: absolute;
    bottom: 0;
    background: #00000050;
    width: 100%;
    backdrop-filter: blur(2.5px);
    color: white;
  `
) as typeof CardContent;

interface CocktailCardProps {
  src: string;
  name?: string;
  id: string;
  category?: string;
}

export const CocktailCard = (props: CocktailCardProps) => {
  return (
    <Grid xs={12} sm={5} md={4}>
      <Card sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="100%"
          image={props.src}
          alt={props.name}
        />
        <StyledCardContent sx={{ p: 2 }}>
          <StyledNameTypography gutterBottom variant="h5" component="div">
            {props.name}
          </StyledNameTypography>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {props.category}
          </Typography>
          <CardActions sx={{ p: 0, mt: 3 }}>
            <StyledIconButton
              aria-label="arrow"
              href={`drink/${props.id}/details`}
            >
              <Typography variant="body2">View Details </Typography>{" "}
              <ArrowForwardIcon />
            </StyledIconButton>
          </CardActions>
        </StyledCardContent>
      </Card>
    </Grid>
  );
};
