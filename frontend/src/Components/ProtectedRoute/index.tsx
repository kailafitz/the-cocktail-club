import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ViewHeightContainer from "../Layout/ViewHeightContainer";
import Loading from "../Status/Loading";
import { useAuthentication } from "../../Helper";
import { IProtectedRoute } from "../../Interfaces";
import PropTypes from "prop-types";

const ProtectedRoute: React.FC<IProtectedRoute> = (
  children: IProtectedRoute
) => {
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

ProtectedRoute.propTypes = {
  children: PropTypes.node as PropTypes.Validator<ReactNode>,
};

export default ProtectedRoute;
