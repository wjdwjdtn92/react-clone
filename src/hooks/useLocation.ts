import { routeChage } from '../lib/router';
import React from '../lib/react';

function useLoaction() {
  let currentPath = window.location.pathname;

  const navigate = (url: string, params?: any) => {
    if (currentPath !== url) {
      routeChage(url, params);
      currentPath = url;
    }
  };

  return {
    navigate,
    location: currentPath,
  };
}

export default useLoaction;
