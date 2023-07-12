import { nodeType } from '../types';

const oldDomMap = new Map<Element, nodeType | string>();

function isEventProp(name: string, value: any) {
  return typeof value === 'function' && name.startsWith('on');
}

function setAttribute($element: Element, name: string, value: any) {
  if (isEventProp(name, value)) {
    const eventType = name.toLowerCase().split('on')[1];
    $element.addEventListener(eventType, value);
  } else {
    $element.setAttribute(name, value);
  }
}

function renderElement(node: nodeType | string | null) {
  if (node === null) {
    return null;
  }

  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const { type, props } = node;
  const { children } = node;

  const $element = document.createElement(type, props);

  if (props) {
    Object.keys(props).forEach((name) => {
      setAttribute($element, name, props[name]);
    });
  }

  children.map(renderElement).forEach(($childElement) => {
    if ($childElement) {
      $element.appendChild($childElement);
    }
  });

  return $element;
}

function updateElement(
  $dom: Node,
  newVdom: nodeType | string,
  oldVdom: nodeType | string = '',
) {
  if (!oldVdom) {
    $dom.appendChild(renderElement(newVdom));
    return;
  }

  if (!newVdom) {
    $dom.parentNode?.removeChild($dom);
    return;
  }

  if (typeof newVdom === 'string') {
    if (newVdom !== oldVdom) {
      // eslint-disable-next-line no-param-reassign
      $dom.textContent = newVdom as string;
    }
    return;
  }

  if (typeof oldVdom === 'string' || newVdom.type !== oldVdom.type) {
    ($dom as HTMLElement).replaceWith(renderElement(newVdom));
    return;
  }

  const maxChildLength = Math.max(
    newVdom.children.length,
    oldVdom.children.length,
  );

  for (let i = 0; i < maxChildLength; i += 1) {
    updateElement($dom.childNodes[i], newVdom.children[i], oldVdom.children[i]);
  }
}

function render($container: Element, newVdom: nodeType | string) {
  const oldDom = oldDomMap.get($container);
  updateElement($container, newVdom, oldDom);

  oldDomMap.set($container, newVdom);
}

export default render;
