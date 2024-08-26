import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const StyledNameTypography = styled(Typography)(
  () => `
  text-transform: capitalize;
  margin-bottom: 0;
  line-height: 1;
`
) as typeof Typography;

export const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
    width: 25%;
    transition: all .3s linear;
    border-radius: 0;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: ${theme.palette.primary.main} solid 2px;

    svg {
      color: ${theme.palette.common.black};
    }

    &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.primary.main};
    z-index: -2;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: ${theme.palette.common.black};
    transition: all .3s;
    z-index: -1;
  }

  &:hover {
    border-radius: 0;
    color: ${theme.palette.primary.main};
    &:before {
      width: 100%;
    }

    svg {
      color: ${theme.palette.primary.main};
    }
  }
`
) as typeof IconButton;

export const StyledCardContent = styled(CardContent)(
  ({ theme }) => `
    background: #00000050;
    backdrop-filter: blur(2.5px);
    color: ${theme.palette.common.white};
  `
) as typeof CardContent;
