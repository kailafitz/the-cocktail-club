import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CocktailCard } from "../Components/CocktailCard";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import { ViewHeightContainer } from "../Components/ViewHeightContainer";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHeading = styled(Typography)(
    () => `
  transform: rotate(-18deg);
`,
);

export const Home = () => {
    const { data, status } = useQuery(["drinkDetails"], () =>
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`).then(res => res.data.drinks),
        {
            refetchOnWindowFocus: false
        }
    )

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('This will run every second!');
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    if (status === "success") {
        return (
            <>
                <ViewHeightContainer vh sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid container justifyContent="center">
                        <Grid xs={8} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <StyledHeading variant="h1">The Cocktail Club</StyledHeading>
                        </Grid>
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
                </ViewHeightContainer>
            </>
        );
    }

    if (status === "loading") {
        return <ViewHeightContainer vhr><Loading /></ViewHeightContainer>
    }

    if (status === "error") {
        return <ViewHeightContainer vh><Error /></ViewHeightContainer>
    }
}