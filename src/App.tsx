import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { ViewMode } from './types';

export const App: React.FC = () => {
  // 1. Quản lý Theme (Dark/Light mode) với localStorage theo yêu cầu F=6
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('pet_theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pet_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pet_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 2. Quản lý Danh sách Yêu thích (Favorites) với localStorage theo yêu cầu F=6
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pet_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pet_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Không thể lưu favorites vào localStorage', e);
    }
  }, [favorites]);

  const handleToggleFavorite = (petId: string) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  // 3. Quản lý Tab hiển thị (Tất cả / Yêu thích)
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          favoritesCount={favorites.length}
          currentTab={viewMode}
          onSelectTab={setViewMode}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ListPage
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  viewMode={viewMode}
                  onSetViewMode={setViewMode}
                />
              }
            />
            <Route
              path="/item/:id"
              element={
                <DetailPage
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
