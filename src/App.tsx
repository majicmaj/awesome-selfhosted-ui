import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Layout } from './components/Layout';
import { DiscoverPage } from './pages/DiscoverPage';
import { CatalogPage } from './pages/CatalogPage';
import { NewPage } from './pages/NewPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DiscoverPage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="new" element={<NewPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
