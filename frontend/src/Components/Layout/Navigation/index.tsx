import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Logo from "../../Logo";
import NavigationMenu from "../../NavigationMenu";

const Navigation: React.FC = () => {
  return (
    <>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 4,
        }}
      >
        <Link
          noWrap
          sx={{
            hover: {
              cursor: "pointer",
            },
          }}
          href="/"
          underline="none"
        >
          <Logo className="nav-logo" />
        </Link>
        <NavigationMenu />
      </Container>
    </>
  );
};

export default Navigation;
