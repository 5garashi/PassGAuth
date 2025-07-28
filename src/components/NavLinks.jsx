// src/components/NavLinks.jsx
import { Link } from 'react-router-dom';

export default function NavLinks() {
  return (
    <nav className="nav-links">
      <a href="https://www.5garashi.com" target="_blank" rel="noopener noreferrer">●5garashi.com home page </a>
       <a href="https://5garashi.mydns.jp/N/NasaApi/" target="_blank" rel="noopener noreferrer">●Nasa Photo page </a>
      <a href="https://5garashi.mydns.jp/N/MovieSearch/" target="_blank" rel="noopener noreferrer">●Movie Search page </a>
      <Link to="/">● Home</Link>

    </nav>
  );
}