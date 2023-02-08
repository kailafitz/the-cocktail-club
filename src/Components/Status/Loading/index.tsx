import React from "react";
import ReactLoading from "react-loading";

export const Loading = (props: { color: string }) => {
  return (
    <ReactLoading type="bubbles" color={props.color} className="loading" />
  );
};
