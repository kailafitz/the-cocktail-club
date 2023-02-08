import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
    transition: all .3s linear;
    border-radius: 0;
    background: ${theme.palette.dark?.main};
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: ${theme.palette.primary.dark} solid 2px;

    svg {
      color: ${theme.palette.dark.main};
    }

    &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.primary.dark};
    z-index: -2;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: ${theme.palette.dark.main};
    transition: all .3s;
    z-index: -1;
  }

  &:hover {
    border-radius: 0;
    color: ${theme.palette.primary.main};
    &:before {
      width: 100%;
    }

    svg {
      color: ${theme.palette.primary.dark};
    }
  }
`
) as typeof IconButton;

const StyledCardContent = styled(CardContent)(
  ({ theme }) => `
    position: absolute;
    bottom: 0;
    background: #00000050;
    width: 100%;
    backdrop-filter: blur(2.5px);
    color: white;

    &:last-child {
      padding: ${theme.spacing(2)};
    }
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
        <StyledCardContent sx={{ p: 3 }}>
          <StyledNameTypography gutterBottom variant="h5" component="div">
            {props.name}
          </StyledNameTypography>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {props.category}
          </Typography>
          <CardActions sx={{ p: 0, mt: 3, position: "relative" }}>
            <StyledIconButton
              aria-label="arrow"
              href={`drink/${props.id}/details`}
            >
              <ArrowForwardIcon />
            </StyledIconButton>
          </CardActions>
        </StyledCardContent>
      </Card>
    </Grid>
  );
};
