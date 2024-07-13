import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Popper from "@mui/material/Popper";
import { CocktailDbInterface } from "../../../Interfaces";
import { scrollToResults } from "../../../Helper";
import Button from "@mui/material/Button";

interface SearchByNameProps {
  searchByName: (data: CocktailDbInterface[]) => void;
}

const SearchByName = (props: SearchByNameProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  // console.log(input, "input");
  // console.log(options, "options");

  const getOptions = async () => {
    let arr: string[] = [];
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    );
    for (let i = 0; i < res.data.drinks.length; i++) {
      arr.push(res.data.drinks[i].strDrink);
    }
    setOptions(arr);
  };

  const getDrinks = async (name: string) => {
    const res = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    let drinks = res !== null ? res.data.drinks : [];
    setInput(name);
    // console.log("drinks", drinks);
    props.searchByName(drinks);
  };

  useEffect(() => {
    getOptions();
    if (input === "") {
      setOptions([]);
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
            // getOptions();
          }}
        >
          Search
        </Button>
        <InputBase
          id="search"
          aria-controls={open ? "search" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            setOpen((prevOpen) => !prevOpen);
          }}
          placeholder="Search by name..."
          inputProps={{ "aria-label": "search" }}
          value={input}
          ref={anchorRef}
          sx={{ width: { xs: "85%", md: "90%" } }}
        />
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
                  {options !== null ? (
                    options.map((option, index) => (
                      <MenuItem
                        key={index}
                        onClick={(e) => {
                          getDrinks(option);
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

export default SearchByName;
