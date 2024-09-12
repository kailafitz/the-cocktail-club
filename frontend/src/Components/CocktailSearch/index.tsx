import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

const CocktailSearchUrl = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchMethod, setSearchMethod] = useState("ingredient");

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
    </>
  );
};

export default CocktailSearchUrl;
