import React from "react";
import { Typography } from "@mui/material";

interface ErrorProps {
    message: string,
}

export const Error = (props: ErrorProps) => {
    return (
        <>
            <Typography>Error!</Typography>
            <Typography>{props.message}</Typography>
        </>
    )
};
