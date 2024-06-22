// app.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <BrowserRouter>
      <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
      </Routes>
    </BrowserRouter>
  );
}
