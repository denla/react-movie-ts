import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import FavouritesPage from "./pages/FavouritesPage";
import { Header } from "./components/Header";
import { WatchProvider } from "./context/WatchContext";

function App() {
  return (
    <BrowserRouter>
      <WatchProvider>
        <Header />
        <Routes>
          <Route path="/film/:filmId" element={<FilmPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </WatchProvider>
    </BrowserRouter>
  );
}

export default App;
