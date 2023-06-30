import { NavLink, NavLinkProps } from "react-router-dom";
import React, { ReactNode } from "react";
import { StyledIconButton } from "./styles";
import { ButtonProps } from "@mui/material/Button";
import { Button } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  href?: string;
  label?: string;
  iconLabel?: ReactNode;
  sx?: Object;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  withActiveState?: boolean;
  // onClick?: (() => {}) | (() => void);
}

type NavLinkPropsMinusTo = Omit<NavLinkProps, "to">;

interface CustomLinkProps extends NavLinkPropsMinusTo {
  href?: string;
}

export const CustomLink = React.forwardRef<any, CustomLinkProps>(
  (props, ref) => {
    // console.log("props", props);
    console.log(props.href);
    return (
      <NavLink
        to={props.href ?? ""}
        ref={ref}
        className={({ isActive }) => `${isActive ? "active" : ""}`}
        {...props}
        role={undefined}
      />
    );
  }
);

// ButtonProps &
export const AnimatedButton = (props: CustomButtonProps) => {
  // const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
  //   return `${isActive ? "active" : ""}`;
  // };

  return (
    <>
      <StyledIconButton
        aria-label="arrow"
        sx={props.sx}
        href={props.withActiveState ? "" : props.href}
        to={props.withActiveState ? props.href : ""}
        // className={navLinkCssClasses}
        onClick={props.onClick}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        component={props.withActiveState ? NavLink : Button}
        // component={props.withActiveState ? CustomLink : Button}
      >
        {props.iconLabel} {props.label}
      </StyledIconButton>
    </>
  );
};
