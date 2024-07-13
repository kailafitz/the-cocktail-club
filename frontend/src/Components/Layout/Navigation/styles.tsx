import { styled } from "@mui/material/styles";
import { ListItem, Typography, AppBar, IconButton } from "@mui/material";

export const StyledAppBar = styled(AppBar)(
  () => `
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    z-index: 1;
    padding-top: 16px;
`
);

export const StyledIconButton = styled(IconButton)(
  () => `
    :hover {
      background-color: transparent;
    }
`
);

export const StyledNavLink = styled(ListItem)(
  ({ theme }) => `
    a {
        padding: ${theme.spacing(0, 1)};

        &:hover {
            background: none;
        }

        div span {
            color: ${theme.palette.common.black};
            font-weight: 500;
        }
    }
`
);

export const StyledTypography = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.common.black};
    margin: 0 0.5rem;
`
);
