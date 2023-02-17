import React, { useEffect } from "react";
import LetterButton from "./LetterButton";
import axios from "axios";
import { StyledContainer } from "./styles";
import { DrinkInterface } from "../../../Interfaces";

interface SearchByLetterProps {
  searchByLetter: (data: DrinkInterface[]) => void;
}

export const SearchByLetter = (props: SearchByLetterProps) => {
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
    props.searchByLetter(drinks);
  };

  return (
    <StyledContainer>
      {letters.map((letter, index) => (
        <LetterButton
          key={index}
          letter={letter}
          onClick={() => getData(letter)}
        />
      ))}
    </StyledContainer>
  );
};
