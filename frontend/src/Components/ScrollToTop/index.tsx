import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollTop: React.FC = () => {
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

export default ScrollTop;
