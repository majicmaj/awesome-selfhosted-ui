import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";
import { DiscoverPage } from "./pages/DiscoverPage";
import { CatalogPage } from "./pages/CatalogPage";
import { NewPage } from "./pages/NewPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DiscoverPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="new" element={<NewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
