import CocktailCard from "../Components/CocktailCard";
import { render, screen } from "@testing-library/react";

describe("CocktailCard", () => {
  test("Check if name prop renders", () => {
    render(
      <CocktailCard
        id="testId"
        img="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview"
        name="testName"
        db="api"
      />
    );
    expect(screen.getByText("testName")).toBeDefined();
  });
});
