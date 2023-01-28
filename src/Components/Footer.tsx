import React from "react";
import { Container, IconButton } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(
  ({ theme }) => `
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${theme.spacing(4)}
`
);

const StyledIcon = styled(IconButton)(
  () => `
  color: white;
`
);

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
