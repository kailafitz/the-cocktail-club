import { Typography } from "@mui/material";
import React from "react";

export const Error = (props) => {
    return (
        <>
            <Typography>Error!</Typography>
            <Typography>{props.message}</Typography>
        </>
    )
}
