import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { StyledContainer, StyledIcon } from "./styles";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Logo from "../../Logo";

export const Footer = () => {
  return (
    <StyledContainer>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        justifyContent="center"
        gap={{ xs: 3, md: 0 }}
      >
        <Logo className="footer-logo" />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          flexGrow="1"
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          sx={{ pt: { xs: 2, sm: 5 } }}
        >
          <Link href="#" textAlign={{ xs: "left", sm: "right", md: "unset" }}>
            Careers
          </Link>
          <Link href="#" textAlign={{ xs: "left", sm: "right", md: "unset" }}>
            Terms and Conditions
          </Link>
          <Link href="#" textAlign={{ xs: "left", sm: "right", md: "unset" }}>
            Privacy Policy
          </Link>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: "primary.main", opacity: 0.6, my: 5 }} />
      <div>
        <Stack direction="row" spacing={3} mb={3} justifyContent="center">
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
        </Stack>
        <Typography
          variant="copyright"
          mb={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            svg: {
              fontSize: "13px",
              marginRight: "5px",
            },
          }}
        >
          <CopyrightIcon /> All Rights Reserved.
        </Typography>
      </div>
    </StyledContainer>
  );
};
