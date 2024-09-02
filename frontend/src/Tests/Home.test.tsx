import { render, fireEvent } from "@testing-library/react";
import NavigationMenu from "../Components/NavigationMenu";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Home", () => {
  const queryClient = new QueryClient();
  it("renders the menu when the button is clicked", () => {
    // Render the component with QueryClient wrapper
    const { queryByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationMenu />
      </QueryClientProvider>
    );

    // Ensure the menu is not visible initially
    expect(queryByTestId("menu")).toBeNull();

    // Simulate clicking the button
    const button = queryByTestId("menu button");
    button && fireEvent.click(button);

    // Check that the menu is now rendered
    expect(queryByTestId("menu")).toBeDefined();
  });
});
