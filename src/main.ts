import React from './lib/react';
import { initRoute } from './lib/router';
import './main.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RecordPage from './pages/RecordPage';

function main() {
  const root = document.getElementById('root');

  const route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      React.render(root, HomePage);
      return;
    }

    if (pathname === '/record') {
      React.render(root, RecordPage);
      return;
    }

    React.render(root, NotFoundPage);
  };

  initRoute(route);
  route();
}

main();
