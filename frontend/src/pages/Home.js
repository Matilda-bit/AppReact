import React from 'react';

import PageContent from '../components/PageContent';
import {
  Link
} from 'react-router-dom';

import HomeContent from '../components/HomeContent'


function HomePage() {
  return (
    <PageContent title="Spread Laughter with MemeByte!">
       <HomeContent />
    </PageContent> 
  );
}

export default HomePage;
