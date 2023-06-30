import { Box, Fade, IconButton, useScrollTrigger } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const ScrollTop = () => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#search");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 10 }}
      >
        <IconButton aria-label="scroll up" color="primary">
          <ArrowUpwardIcon />
        </IconButton>
      </Box>
    </Fade>
  );
};
