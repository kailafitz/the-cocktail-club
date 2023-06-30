import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useTheme } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { DrinkInterface } from "../../../Interfaces";
import { Search, StyledInputBase, StyledButton } from "./styles";
import { scrollToResults } from "../../../Helper";

interface SearchByIngredientsProps {
  searchByIngredient: (data: DrinkInterface[]) => void;
}

export const SearchByIngredient = (props: SearchByIngredientsProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();

  const [input, setInput] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const getData = async () => {
    let arr: string[] = [];
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
    );
    for (let i = 0; i < res.data.drinks.length; i++) {
      if (
        res.data.drinks[i].strIngredient1
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        arr.push(res.data.drinks[i].strIngredient1);
      }
    }
    setIngredients(arr);
  };

  const getDrinks = async (ingredient: string) => {
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    let drinks = res !== null ? res.data.drinks : [];
    setInput(ingredient);
    props.searchByIngredient(drinks);
  };

  useEffect(() => {
    getData();
    if (input === "") {
      setIngredients([]);
    }
  }, [input]);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Search id="search" sx={{ position: "relative" }}>
        <StyledButton
          onClick={() => {
            scrollToResults();
            getData();
          }}
          sx={{
            minWidth: "",
            width: { xs: "15%", md: "10%" },
            borderRadius: 0,
          }}
        >
          <SearchIcon sx={{ color: `${theme.palette.common.black}` }} />
        </StyledButton>
        <StyledInputBase
          id="search"
          aria-controls={open ? "search" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen((prevOpen) => !prevOpen);
          }}
          placeholder="Search by ingredient…"
          inputProps={{ "aria-label": "search" }}
          value={input}
          ref={anchorRef}
          sx={{ width: { xs: "85%", md: "90%" } }}
        />
      </Search>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ transform: "translate3d(510.5px, 51.5px, 0px)", "z-index": 8 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                overflow: "scroll",
                maxHeight: "50vh",
                height: "fit-content",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="search" aria-labelledby="search">
                  {ingredients !== null ? (
                    ingredients.map((ingredient, index) => (
                      <MenuItem
                        key={index}
                        onClick={(e) => {
                          getDrinks(ingredient);
                          scrollToResults();
                          handleClose(e);
                        }}
                      >
                        {ingredient}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No results found</MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
