import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

const CocktailSearchUrl = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchMethod, setSearchMethod] = useState("ingredient");

  // let letters: string[] = [];

  // for (let i = 65; i < 91; i++) {
  //   let letter = String.fromCharCode(i);
  //   letters.push(letter);
  // }

  const handleChange = (event: SelectChangeEvent) => {
    setSearchMethod(event.target.value as string);
    setSearchParams({ method: event.target.value as string });
    searchParams.delete("value");
  };

  return (
    <>
      <Select
        value={searchMethod}
        onChange={(value) => {
          handleChange(value);
        }}
        sx={{ mb: 5 }}
        IconComponent={KeyboardArrowUpIcon}
      >
        <MenuItem value="name">Search By Name</MenuItem>
        <MenuItem value="ingredient">Search By Ingredient</MenuItem>
        <MenuItem value="letter">Search By Letter</MenuItem>
      </Select>
      <SearchBar searchMethod={searchMethod} />
      {/* {searchMethod === "letter" && (
        <StyledContainer>
          {letters.map((letter, index) => (
            <Button
              variant="primaryDark"
              key={index}
              href={""}
              onClick={() => {
                setInput(letter);
                scrollToResults();
                searchParams.set("letter", letter);
                setSearchParams(searchParams);
              }}
              sx={{
                width: { xs: "3rem", md: "4rem" },
                fontSize: "1rem",
                borderRadius: 0,
                minWidth: "fit-content",
                py: { xs: 1, md: 1.5 },
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
      )} */}
    </>
  );
};

export default CocktailSearchUrl;
