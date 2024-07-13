import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { ISearchBy } from "../../../Interfaces";
import { scrollToResults } from "../../../Helper";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const SearchByIngredient = (props: ISearchBy) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const getDropdownOptions = async () => {
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

  const getCocktails = async (ingredient: string) => {
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    let drinks = res !== null ? res.data.drinks : [];
    setInput(ingredient);
    props.searchBy(drinks);
  };

  useEffect(() => {
    getDropdownOptions();
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
      <Stack direction="row" spacing={4} mb={5}>
        <Button
          variant="primary"
          endIcon={<SearchIcon />}
          onClick={() => {
            scrollToResults();
            getDropdownOptions();
          }}
        >
          Search
        </Button>
        <InputBase
          id="search"
          aria-controls={open ? "search" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          placeholder="Search by ingredient…"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            setOpen((prevOpen) => !prevOpen);
          }}
          inputProps={{ "aria-label": "search" }}
          value={input}
          ref={anchorRef}
          sx={{ width: { xs: "85%", md: "90%" } }}
        ></InputBase>
      </Stack>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ transform: "translate3d(510.5px, 51.5px, 0px)", "z-index": 8 }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
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
                          getCocktails(ingredient);
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

SearchByIngredient.propTypes = {
  searchBy: PropTypes.func,
};

export default SearchByIngredient;
