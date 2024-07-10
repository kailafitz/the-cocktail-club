import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ViewHeightContainer from "../Layout/ViewHeightContainer";
import Loading from "../Status/Loading";
import { useAuthentication } from "../../Helper";

export const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { isAuth, status } = useAuthentication();
  // console.log("Protected route", status);

  if (status === "loading") {
    return (
      <ViewHeightContainer center>
        <Loading color="light" />
      </ViewHeightContainer>
    );
  }

  // if (status === "error") {
  //   return <Navigate to="/login" replace />;
  // }

  if (!isAuth || status === "error") {
    return <Navigate to="/login" replace />;
  }

  return children ? <>children</> : <Outlet />;
};
