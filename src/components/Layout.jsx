// src/components/Layout.jsx
import NavLinks from './NavLinks';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>  
    <Outlet /> {/* ここに各ページが差し込まれる */}
    <NavLinks />
    </>
  );
}