import { Routes, Route } from "react-router-dom";
import { CocktailDetails } from "./Pages/CocktailDetails";
import { Home } from "./Pages/Home";
import { Search } from "./Pages/Search";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "./Components/Layout/Navigation";
import { Footer } from "./Components/Layout/Footer";
import About from "./Pages/About";
import ContactUs from "./Pages/Contact Us";
import LoginUser from "./Pages/LoginUser";
import SignupUser from "./Pages/SignupUser";
import Profile from "./Pages/Profile";
import MyCocktails from "./Pages/MyCocktails";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignupUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-cocktails" element={<MyCocktails />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/search/cocktail/:id/:dbType/details"
            element={<CocktailDetails />}
          />
        </Route>
      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
