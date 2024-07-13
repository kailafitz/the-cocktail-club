import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { StyledContainer } from "./styles";
import { ICocktailDb, ISearchBy } from "../../../Interfaces";
import { scrollToResults } from "../../../Helper";
import PropTypes from "prop-types";

const SearchByLetter = (props: ISearchBy) => {
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
      sortedDrinks = drinks.sort(function (a: ICocktailDb, b: ICocktailDb) {
        if (a.strDrink < b.strDrink) {
          return -1;
        }
        if (a.strDrink > b.strDrink) {
          return 1;
        }
        return 0;
      });
    }
    props.searchBy(sortedDrinks);
  };

  return (
    <StyledContainer>
      {letters.map((letter, index) => (
        <Button
          variant="primary"
          key={index}
          href={""}
          onClick={() => {
            getData(letter);
            scrollToResults();
          }}
          sx={{
            width: "4rem",
            fontSize: "1rem",
            borderRadius: 0,
            minWidth: "fit-content",
            py: 1.5,
            px: 1,
            p: {
              md: 2,
            },
            m: 1,
            color: "primary.contrastText",
          }}
        >
          {letter}
        </Button>
      ))}
    </StyledContainer>
  );
};

SearchByLetter.propTypes = {
  searchBy: PropTypes.func,
};

export default SearchByLetter;
