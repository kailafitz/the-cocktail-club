import { styled } from "@mui/material/styles";

export const GradientBackground = styled(`div`)(
  () => `
  background: linear-gradient(to bottom, rgba(000, 000, 000, 1), rgba(255, 255, 255, 0.2));
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100vw;
  height: 100%;
`
);
