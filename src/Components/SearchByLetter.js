import React from "react";
import LetterButton from "./LetterButton";
import axios from "axios";
import { Container } from "@mui/system";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)(() => ({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    paddingBottom: "5rem"
}));

export const SearchByLetter = (props) => {
    let letters = [];

    for (let i = 65; i < 91; i++) {
        let letter = String.fromCharCode(i);
        letters.push(letter);
    }

    const getData = async (letter) => {
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        let drinks = res !== null ? res.data.drinks : [];
        props.searchByLetter(drinks);
    }

    return (
        <StyledContainer>
            {letters.map((letter, index) => <LetterButton key={index} letter={letter} onClick={() => getData(letter)} />)}
        </StyledContainer>
    )
}
