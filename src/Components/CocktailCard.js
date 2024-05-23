import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText';
import LiquorIcon from '@mui/icons-material/Liquor';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";

const CustomGrid = styled(Grid)(
    ({ theme }) => `
  background: ${theme.palette.neutral.main};
  padding: 0;
`,
);

const StyledIconButton = styled(IconButton)(
    ({ theme }) => `
    width: 25%;
    transition: all .5s linear;
    border-radius: 0;
    background: ${theme.palette.primary.main};

  &:hover {
    width: 100%;
    background: ${theme.palette.primary.main};
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
`,
);


export const CocktailCard = (props) => {
    // console.log(matrix);

    return (
        <CustomGrid component={Card} xs={8} sm={5} md={3} elevation={0}>
            <CardMedia
                component="img"
                height="200"
                image={props.src}
                alt={props.name}
            />
            <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <List dense={true}>
                    {props.ingredients.slice(0, 2).map((ingredient) =>
                        <ListItem key={ingredient}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                <LiquorIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={ingredient}
                            />
                        </ListItem>
                    )}
                </List>
                <CardActions>
                    <StyledIconButton aria-label="arrow" href={`drink/${props.id}/details`}>
                        <Typography variant="body2">View Details </Typography>
                        {" "}
                        <ArrowForwardIcon />
                    </StyledIconButton >
                    {/* <Button size="small" variant="text" color="primary" href={`drink/${props.id}/details`}>View more</Button> */}
                </CardActions>
            </CardContent>
        </CustomGrid>
    );
}