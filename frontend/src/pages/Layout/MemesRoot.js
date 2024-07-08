import React from 'react';
import { Outlet } from 'react-router-dom';

import MemesNavigation from '../../components/MemesNavigation';


function MemesRootLayout() {
  return (
    <>
      <MemesNavigation />
      <Outlet />
    </>
  );
}

export default MemesRootLayout;