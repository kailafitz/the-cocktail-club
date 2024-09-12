import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { scrollToResults } from "../../../Helper";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ISearchCocktailInput } from "../../../Interfaces";

const SearchBar = (props: ISearchCocktailInput) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [input, setInput] = useState<string>("");
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const getDropdownOptions = async () => {
    let arr: string[] = [];
    if (props.searchMethod === "ingredient") {
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
    } else if (props.searchMethod === "name") {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
      );
      for (let i = 0; i < res.data.drinks.length; i++) {
        arr.push(res.data.drinks[i].strDrink);
      }
    }
    setDropdownOptions(arr);
  };

  useEffect(() => {
    getDropdownOptions();
    if (input === "") {
      setDropdownOptions([]);
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
      <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={4} mb={5}>
        <Button
          variant="primaryDark"
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
          placeholder={`Search by ${props.searchMethod}…`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          inputProps={{ "aria-label": "search" }}
          value={input}
          ref={anchorRef}
          sx={{
            width: { xs: "100%", sm: "90%" },
          }}
        ></InputBase>
      </Stack>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{
          transform: "translate3d(510.5px, 51.5px, 0px)",
          "z-index": 8,
        }}
        placeholder={undefined}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
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
                  {dropdownOptions.length > 0 ? (
                    dropdownOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        onClick={(e) => {
                          setInput(option);
                          setSearchParams({
                            method: props.searchMethod,
                            value: option,
                          });
                          scrollToResults();
                          handleClose(e);
                        }}
                      >
                        {option}
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

export default SearchBar;
