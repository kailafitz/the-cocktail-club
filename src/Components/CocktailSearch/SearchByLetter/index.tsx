import React from "react";
import { useTheme } from "@mui/material";
import axios from "axios";
import { StyledContainer } from "./styles";
import { DrinkInterface } from "../../../Interfaces";
import { AnimatedButton } from "../../AnimatedButton";
import { scrollToResults } from "../../../Helper";

interface SearchByLetterProps {
  searchByLetter: (data: DrinkInterface[]) => void;
}

export const SearchByLetter = (props: SearchByLetterProps) => {
  const theme = useTheme();
  let letters: string[] = [];

  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    letters.push(letter);
  }

  const getData = async (letter: string) => {
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let drinks = res !== null ? res.data.drinks : [];
    let sortedDrinks = [];
    if (drinks && drinks.length > 1) {
      sortedDrinks = drinks.sort(function (
        a: DrinkInterface,
        b: DrinkInterface
      ) {
        if (a.strDrink < b.strDrink) {
          return -1;
        }
        if (a.strDrink > b.strDrink) {
          return 1;
        }
        return 0;
      });
    }
    props.searchByLetter(sortedDrinks);
  };

  return (
    <StyledContainer>
      {letters.map((letter, index) => (
        <AnimatedButton
          key={index}
          href={""}
          label={letter}
          onClick={() => {
            getData(letter);
            scrollToResults();
          }}
          withActiveState={true}
          sx={{
            width: "4rem",
            fontSize: "1rem",
            borderRadius: 0,
            minWidth: "fit-content",
            padding: {
              xs: `${theme.spacing(1.5, 1)}`,
              md: `${theme.spacing(2)}`,
            },
            margin: `${theme.spacing(1)}`,
            color: `${theme.palette.primary.contrastText}`,
          }}
        />
      ))}
    </StyledContainer>
  );
};
