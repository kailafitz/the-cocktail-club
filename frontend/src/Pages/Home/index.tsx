import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../Components/Status/Loading";
import Error from "../../Components/Status/Error";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { CocktailDbInterface } from "../../Interfaces";
import { wait } from "@testing-library/user-event/dist/utils";
import Button from "@mui/material/Button";

const dailyDrinks = [
  "12130",
  "12756",
  "11149",
  "13024",
  "13847",
  "178350",
  "15743",
  "12162",
  "16985",
  "12107",
  "178354",
  "11602",
  "17252",
];

export const Home: React.FC = () => {
  const randomInt = (max: number, min: number) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return randomNumber;
  };

  const { data, status } = useQuery(
    ["Feature Drink"],
    () =>
      wait(500).then(() =>
        axios
          .get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
              dailyDrinks[randomInt(0, dailyDrinks.length - 1)]
            }`
          )
          .then((res) => res.data.drinks)
      ),
    {
      refetchOnWindowFocus: false,
      // refetchInterval: 10000,
    }
  );

  if (status === "loading") {
    return (
      <ViewHeightContainer vh center>
        <Loading color="light" />
      </ViewHeightContainer>
    );
  }

  if (status === "error" || (status === "success" && data === null)) {
    return (
      <ViewHeightContainer vh center>
        <Error message="Apologies but something has gone wrong. Please check back later or report this to our support team at support@thecocktailclub.com. We apologise for this inconvenience and hope to back up shortly!" />
      </ViewHeightContainer>
    );
  }

  return (
    <>
      <Stack pt={10} flexGrow={1} direction="column">
        {data.map((drink: CocktailDbInterface) => {
          return (
            <React.Fragment key={drink.idDrink}>
              <Stack direction="column" justifyContent="center">
                <Typography
                  variant="h1"
                  align="left"
                  sx={{
                    fontSize: { xs: "3rem", md: "8rem" },
                  }}
                  className="onLoadAnimation"
                >
                  Indulge in the mastery
                </Typography>
              </Stack>
              <Stack direction="column" justifyContent="center" p={5}>
                <Typography
                  variant="body1"
                  align="left"
                  mb={1}
                  sx={
                    {
                      // fontSize: { xs: "1.2rem" },
                      // opacity: 0,
                    }
                  }
                >
                  Curating the careful craft of cocktails since 1898
                </Typography>
                <Typography
                  variant="body1"
                  color="white"
                  align="left"
                  mb={2}
                  // sx={{ opacity: 0 }}
                >
                  Search our extensive range of luxury cocktails
                </Typography>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                >
                  <Button
                    variant="primary"
                    href="/search"
                    sx={{
                      display: "block",
                      fontSize: "1rem",
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="primary"
                    href="/"
                    sx={{
                      display: "block",
                      fontSize: "1rem",
                    }}
                  >
                    Join a masterclass
                  </Button>
                </Stack>
              </Stack>
              {/* <FlexboxColumn sx={{ padding: 3 }}>
                    <ImageContainer>
                      <img src={drink.strDrinkThumb} alt="Drink of the Day" />
                    </ImageContainer>
                    <Button
                      // noWrap
                      sx={{
                        textTransform: "capitalize",
                        marginTop: { xs: "-5rem", md: "-7rem" },
                        fontSize: { xs: "2.5rem", lg: "4rem" },
                      }}
                      href={`drink/${drink.idDrink}/details`}
                    >
                      {drink.strDrink}
                    </Button>
                  </FlexboxColumn> */}
            </React.Fragment>
          );
        })}
      </Stack>
    </>
  );
};
