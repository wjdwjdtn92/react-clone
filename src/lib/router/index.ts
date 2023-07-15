const ROUTER_CHAGE_EVENT = 'ROUTE_CHANGE';

function initRoute(onRouteChage: () => void) {
  window.addEventListener(ROUTER_CHAGE_EVENT, () => {
    onRouteChage();
  });
}

function routeChage(url: string, params: any) {
  // eslint-disable-next-line no-restricted-globals
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTER_CHAGE_EVENT, params));
}

export { initRoute, routeChage };
