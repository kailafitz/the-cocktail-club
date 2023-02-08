import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { StyledContainer, StyledIcon } from "./styles";

export const Footer = () => {
  return (
    <StyledContainer>
      <StyledIcon>
        <FacebookOutlinedIcon />
      </StyledIcon>
      <StyledIcon>
        <InstagramIcon />
      </StyledIcon>
      <StyledIcon>
        <TwitterIcon />
      </StyledIcon>
      <StyledIcon>
        <PinterestIcon />
      </StyledIcon>
    </StyledContainer>
  );
};
