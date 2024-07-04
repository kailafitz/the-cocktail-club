import React from "react";
import { useTheme } from "@mui/material/styles";
import ReactLoading from "react-loading";

const Loading = (props: { color: "light" | "dark" }) => {
  const theme = useTheme();
  return (
    <ReactLoading
      type="bubbles"
      color={
        props.color === "light"
          ? `${theme.palette.primary.main}`
          : `${theme.palette.common.black}`
      }
      className="loading"
    />
  );
};

export default Loading;
