import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import { ViewHeightContainer } from "../Components/ViewHeightContainer";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from "@mui/material/styles";

const StyledDetailsBox = styled(Box)(
    ({ theme }) => `
  background: ${theme.palette.primary.main};
  padding: ${theme.spacing(3)};
`,
);

export const DrinkDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    const { data, status } = useQuery(["drinkDetails", id], () =>
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.data.drinks[0]),
        {
            refetchOnWindowFocus: false
        }
    )

    if (status === "success" && !loaded) {
        let ingredients = [];
        Promise.resolve().then(() => {
            let drink = data;
            for (let key in drink) {
                if (key.includes("strIngredient") && drink[key] !== null) {
                    ingredients.push(drink[key]);
                }
            }
        }).then(() => {
            setIngredients(ingredients);
            setLoaded(true);
        });
    }

    if (status === "success" && loaded) {
        return (
            <>
                <Button onClick={() => navigate(-1)}>Go back</Button>
                <Container>
                    <Typography variant="h3">{data.strDrink}</Typography>
                    <Grid container>
                        <Grid xs={12} md={6}>
                            <StyledDetailsBox>
                                <Typography>{data.strAlcoholic}</Typography>
                                <Typography>{data.strCategory}</Typography>
                                <Typography>{data.strDrink}</Typography>
                            </StyledDetailsBox>
                        </Grid>
                        <Box>
                            {ingredients.map((ingredient) => <Typography key={ingredient}>{ingredient}</Typography>)}
                        </Box>
                    </Grid>
                </Container>
            </>
        )
    }

    if (status === "loading") {
        return <ViewHeightContainer vh><Loading /></ViewHeightContainer>
    }

    if (status === "error") {
        return <ViewHeightContainer vh><Error /></ViewHeightContainer>
    }
}
