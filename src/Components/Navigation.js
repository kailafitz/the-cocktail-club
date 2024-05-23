import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(
    ({ theme }) => `
//   background: ${theme.palette.transparent.main};
    background: #ffffff80;
    backdrop-filter: blur(3.5px);
`,
);

const StyledMenuDropdown = styled(Box)(({ theme }) => `
    width: 100%;
    background: ${theme.palette.primary.main};
`,
);

const StyledNavLink = styled(ListItem)(() => `
    a {
        padding:  0 10px;

        &:hover {
            background: none;
        }

        div span {
            color: #fff;
        }
    }
`,
);

const menuItems = [
    {
        "href": "/",
        "text": "Home"
    },
    {
        "href": "/search",
        "text": "Search"
    },
]

export default function Navigation() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledMenuDropdown sx={{ display: open ? "block" : "none", transition: "display 1s ease-in-out" }}>
                <List sx={{ display: "flex", alignItems: "center", paddingLeft: "2rem" }}>
                    {menuItems.map((link) => {
                        return (
                            <React.Fragment key={link.text}>
                                <StyledNavLink disablePadding sx={{ width: "fit-content" }}>
                                    <ListItemButton disableRipple component="a" href={link.href}>
                                        <ListItemText primary={link.text} />
                                    </ListItemButton>
                                </StyledNavLink>
                                <Typography>|</Typography>
                            </React.Fragment>
                        )
                    })}
                </List>
            </StyledMenuDropdown>
            <Box sx={{ flexGrow: 1 }}>
                <StyledAppBar position="sticky" elevation={0}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="primary"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(!open)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="body1"
                            noWrap
                            component="div"
                            color="primary"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            The Cocktail Club
                        </Typography>
                    </Toolbar>
                </StyledAppBar>
            </Box>
        </>
    );
}