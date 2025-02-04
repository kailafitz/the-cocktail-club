import React from "react";
import CocktailSearchUrl from "../../Components/CocktailSearch";
import SearchResults from "../../Components/CocktailSearch/SearchResults";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import ScrollTop from "../../Components/ScrollToTop";

export const Search: React.FC = () => {
  return (
    <>
      <ViewHeightContainer>
        <CocktailSearchUrl />
        <ScrollTop />
        <SearchResults />
      </ViewHeightContainer>
    </>
  );
};
