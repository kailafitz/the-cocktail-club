import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import ScrollTop from "../../Components/ScrollToTop";
import CocktailSearchUrl from "../../Components/CocktailSearch";
import SearchResults from "../../Components/CocktailSearch/SearchResults";

export const Search = () => {
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
