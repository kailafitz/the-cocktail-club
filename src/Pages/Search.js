import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container } from "@mui/material";
import { SearchByLetter } from "../Components/SearchByLetter";
import { CocktailCard } from "../Components/CocktailCard";
import { SearchByIngredient } from "../Components/SearchByIngredient";
import { ViewHeightContainer } from "../Components/ViewHeightContainer";
import { Loading } from "../Components/Loading";

export const Search = () => {
    const [data, setData] = useState([]);

    if (data !== null) {
        return (
            <>
                <SearchByIngredient searchByIngredient={(data) => setData(data)} />
                <SearchByLetter searchByLetter={(data) => setData(data)} />
                <Container>
                    <Grid container spacing={3} justifyContent="center">
                        {data.map((drink) => {
                            let ingredients = [];
                            for (let key in drink) {
                                if (key.includes("strIngredient") && drink[key] !== null) {
                                    ingredients.push(drink[key]);
                                }
                            }

                            return (
                                <CocktailCard
                                    key={drink.idDrink}
                                    id={drink.idDrink}
                                    src={drink.strDrinkThumb}
                                    name={drink.strDrink}
                                    ingredients={ingredients}
                                />
                            )
                        })}
                    </Grid>
                </Container>
            </>
        );
    }
    else {
        return (
            <ViewHeightContainer vh><Loading /></ViewHeightContainer>
        )
    }
}
