import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const CocktailSearchUrl: React.FC = () => {
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
