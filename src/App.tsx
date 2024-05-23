import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import { DrinkDetails } from "./Pages/DrinkDetails";
import { Home } from "./Pages/Home";
import { Search } from "./Pages/Search";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "./Components/Layout/Navigation";
import { Footer } from "./Components/Layout/Footer";
import About from "./Pages/About";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="drink/:id/details" element={<DrinkDetails />} />
          <Route path="search" element={<Search />} />
        </Routes>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
