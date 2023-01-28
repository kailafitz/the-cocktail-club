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
    transition: all .3s linear;
    border-radius: 0;
    background: ${theme.palette.dark.main};

  &:hover {
    // width: 50%;
    background: ${theme.palette.primary.dark};
    border-radius: 0;

    svg {
      color: ${theme.palette.dark.main};
    }
  }

  svg {
    color: ${theme.palette.primary.dark};
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
              <ArrowForwardIcon />
            </StyledIconButton>
          </CardActions>
        </StyledCardContent>
      </Card>
    </Grid>
  );
};
