import React from "react";
import { useTheme } from "@mui/material/styles";
import ReactLoading from "react-loading";
import { ILoading } from "../../../Interfaces";
import PropTypes from "prop-types";

const Loading: React.FC<ILoading> = (props: ILoading) => {
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

Loading.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]).isRequired as PropTypes.Validator<
    "light" | "dark"
  >,
};

export default Loading;
