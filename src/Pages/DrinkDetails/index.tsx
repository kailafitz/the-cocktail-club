import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";
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
import { StyledImage, StyledDivider } from "./styles";
import { ArrowBack } from "@mui/icons-material";
import { AnimatedButton } from "../../Components/AnimatedButton";

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
        <AnimatedButton
          href={""}
          onClick={() => navigate(-1)}
          sx={{
            textTransform: "inherit",
            width: "fit-content",
            px: 2,
            mt: 3,
          }}
          label="go back"
          startIcon={<ArrowBack />}
        />
        <Typography
          variant="h2"
          sx={{
            pt: 5,
            pr: 5,
            mt: 5,
            color: `${theme.palette.common.white}`,
            wordBreak: "break-word",
            textTransform: "capitalize",
            fontSize: { xs: "4rem", lg: "6rem" },
          }}
        >
          {data.strDrink}
        </Typography>
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
        <Grid rowSpacing={{ xs: 2, md: 0 }} columnSpacing={{ md: 5 }} container>
          <Grid xs={12} md={3}>
            <Box
              sx={{
                background: (theme) => theme.palette.primary.main,
                padding: (theme) => theme.spacing(3),
                height: "100%",
              }}
            >
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
            </Box>
          </Grid>
          <Grid xs={12} md={9}>
            <Box
              sx={{
                background: (theme) => theme.palette.primary.main,
                padding: (theme) => theme.spacing(3),
                height: "100%",
              }}
            >
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
            </Box>
          </Grid>
        </Grid>
        <StyledDivider />
        <StyledImage src={data.strDrinkThumb} alt="drink image" />
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
