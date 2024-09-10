import React, { useEffect, useRef, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IApiCocktail } from "../../Interfaces";
import axios from "axios";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { scrollToResults } from "../../Helper";
import { useSearchParams } from "react-router-dom";
import { StyledContainer } from "./SearchByLetter/styles";

const CocktailSearchUrl = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  //   const urlSsearchParams = new URLSearchParams(searchParams);
  //   console.log("params: ", searchParams.get("method"));
  const [open, setOpen] = useState(false);
  const [searchMethod, setSearchMethod] = useState("ingredient");
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [input, setInput] = useState<string>("");
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);

  let letters: string[] = [];

  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    letters.push(letter);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSearchMethod(event.target.value as string);
    searchParams.set("method", event.target.value as string);
    setSearchParams(searchParams);
    // console.log("search params: ", searchParams);
  };

  const getDropdownOptions = async () => {
    let arr: string[] = [];
    if (searchMethod === "ingredient") {
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
    } else if (searchMethod === "name") {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
      );
      for (let i = 0; i < res.data.drinks.length; i++) {
        arr.push(res.data.drinks[i].strDrink);
      }
    } else if (searchMethod === "letter") {
      const res = await axios(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`
      );
      let drinks = res !== null ? res.data.drinks : [];
      if (drinks && drinks.length > 1) {
        arr = drinks.sort(function (a: IApiCocktail, b: IApiCocktail) {
          if (a.strDrink < b.strDrink) {
            return -1;
          }
          if (a.strDrink > b.strDrink) {
            return 1;
          }
          return 0;
        });
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

  //   console.log(dropdownOptions);
  //   console.log(open);

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
      {searchMethod === "ingredient" && (
        <>
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={4}
            mb={5}
          >
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
              placeholder={`Search by ${searchMethod}…`}
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
                      {dropdownOptions.length > 0 ? (
                        dropdownOptions.map((option, index) => (
                          <MenuItem
                            key={index}
                            onClick={(e) => {
                              setInput(option);
                              searchParams.set("ingredient", option);
                              setSearchParams(searchParams);
                              //   console.log(searchParams);
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
      )}
      {searchMethod === "name" && (
        <>
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={4}
            mb={5}
          >
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
              placeholder={`Search by ${searchMethod}…`}
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
                      {dropdownOptions !== null ? (
                        dropdownOptions.map((option, index) => (
                          <MenuItem
                            key={index}
                            onClick={(e) => {
                              setInput(option);
                              searchParams.set("name", option);
                              setSearchParams(searchParams);
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
      )}
      {searchMethod === "letter" && (
        <StyledContainer>
          {letters.map((letter, index) => (
            <Button
              variant="primaryDark"
              key={index}
              href={""}
              onClick={() => {
                setInput(letter);
                scrollToResults();
                setInput(letter);
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
      )}
    </>
  );
};

export default CocktailSearchUrl;
