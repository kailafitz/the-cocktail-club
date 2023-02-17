import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../../Components/Status/Loading";
import { Error } from "../../Components/Status/Error";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { StyledDetailsBox, StyledTypography } from "./styles";

export const DrinkDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const { data, status } = useQuery(
    ["drinkDetails", id],
    () =>
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.data.drinks[0]),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (status === "success" && !loaded) {
    let ingredients: string[] = [];
    let specCharsRegex = /\.()/;

    Promise.resolve()
      .then(() => {
        let drink = data;
        let instruc = [];
        for (let key in drink) {
          if (key.includes("strIngredient") && drink[key] !== null) {
            ingredients.push(drink[key]);
          }
          if (key === "strInstructions") {
            if (drink[key].includes(". ")) {
              instruc = drink[key].split(". ").slice(0, -1);
            } else if (drink[key] !== null) {
              instruc[0] = drink[key];
            }
          }
        }

        setIngredients(ingredients);
        return instruc;
      })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i] = res[i].replace(specCharsRegex, "").trim();
        }
        setLoaded(true);

        return res;
      })
      .then((res) => {
        setInstructions(res);
      });
  }

  if (status === "success" && loaded) {
    return (
      <Container sx={{ position: "relative", flexGrow: 1 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", textTransform: "inherit" }}
        >
          Go back
        </Button>
        <Grid rowSpacing={{ xs: 2, md: 0 }} container>
          <Grid xs={12} md={9}>
            <StyledTypography
              variant="h1"
              sx={{
                pt: 5,
                pr: 5,
                mt: 5,
                color: `${theme.palette.common.white}`,
                wordBreak: "break-all",
                textTransform: "capitalize",
              }}
            >
              {data.strDrink}
            </StyledTypography>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 5,
                mt: 1,
                color: `${theme.palette.common.white}`,
                textTransform: "capitalize",
              }}
            >
              {data.strAlcoholic}
            </Typography>
          </Grid>
          <Grid xs={12} md={3}>
            <StyledDetailsBox>
              <Typography variant="body1">Ingredients</Typography>
              <List dense={true}>
                {ingredients.map((ingredient) => (
                  <ListItem key={ingredient}>
                    <ListItemIcon>
                      <KeyboardArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </StyledDetailsBox>
          </Grid>
          <Grid xs={12} md={9}>
            <StyledDetailsBox>
              <Typography variant="body1">Instructions</Typography>
              <List dense={true}>
                {instructions.map((instruction) => (
                  <ListItem key={instruction}>
                    <ListItemIcon>
                      <KeyboardArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={instruction} />
                  </ListItem>
                ))}
              </List>
            </StyledDetailsBox>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (status === "loading") {
    return (
      <ViewHeightContainer>
        <Loading color={`${theme.palette.common.white}`} />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer>
        <Error
          message="Something went wrong!"
          color={`${theme.palette.common.white}`}
        />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer>
      <Error
        message="Something went wrong!"
        color={`${theme.palette.common.white}`}
      />
    </ViewHeightContainer>
  );
};
