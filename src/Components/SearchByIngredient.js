import React, { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.75),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "60%",
    [theme.breakpoints.up("sm")]: {
        margin: "2rem auto",
        width: "50%",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const StyledButton = styled(Button)(() => ({
    padding: 0,
    width: "fit-content"
}));


export const SearchByIngredient = (props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const [input, setInput] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const getData = async () => {
        let arr = [];
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        for (let i = 0; i < res.data.drinks.length; i++) {
            if (res.data.drinks[i].strIngredient1.toLowerCase().includes(input.toLowerCase())) {
                arr.push(res.data.drinks[i].strIngredient1);
            }
        }
        setIngredients(arr);
    }

    const getDrinks = async (ingredient) => {
        const res = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        let drinks = res !== null ? res.data.drinks : [];
        props.searchByIngredient(drinks);
    }

    useEffect(() => {
        getData();
        if (input === "") {
            setIngredients([]);
        }
    }, [input])

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Search sx={{ position: "relative" }}>
                <StyledButton onClick={() => getData(input)}><SearchIcon /></StyledButton>
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
                        <Paper sx={{ overflow: "scroll", maxHeight: "50vh", height: "fit-content" }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="search"
                                    aria-labelledby="search"
                                >
                                    {ingredients !== null ? ingredients.map((ingredient, index) => <MenuItem key={index} onClick={() => getDrinks(ingredient)}>{ingredient}</MenuItem>) : <MenuItem>No results found</MenuItem>}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
