import { VDomType } from '../../types';
import { HooksType } from './type';

function isEventProp(name: string, value: any) {
  return typeof value === 'function' && name.startsWith('on');
}

function React() {
  let rerender: (() => void) | undefined;
  let currentVNode: VDomType | string | undefined;
  const hooks: HooksType = {
    data: [],
    currentHook: 0,
  };

  const useState = <T>(initialValue: T): [T, (value: T) => void] => {
    const currentKey = hooks.currentHook;
    hooks.currentHook += 1;

    if (hooks.data[currentKey] === undefined) {
      hooks.data[currentKey] = { type: 'state', value: initialValue };
    }

    const setState = (newValue: T) => {
      if (hooks.data[currentKey].value === newValue) {
        return;
      }

      hooks.data[currentKey].value = newValue;
      rerender();
    };

    return [hooks.data[currentKey].value, setState];
  };

  const useRef = <T>(initialValue: T | null = null) => {
    const refObject = {
      current: initialValue,
    };

    return {
      get current() {
        return refObject.current;
      },
      set current(newValue) {
        refObject.current = newValue;
      },
    };
  };

  const useMemo = (getValue: (...args: any) => any, deps: any[]) => {
    const { currentHook } = hooks;
    hooks.currentHook += 1;

    if (
      hooks.data[currentHook] === undefined ||
      hooks.data[currentHook].type !== 'memo'
    ) {
      hooks.data[currentHook] = { type: 'memo', value: getValue(), deps };
    } else {
      const oldDeps = hooks.data[currentHook].deps;
      const hasDepsChanged = deps.some(
        (dep, index) => !Object.is(dep, oldDeps[index]),
      );

      if (hasDepsChanged) {
        hooks.data[currentHook] = { type: 'memo', value: getValue(), deps };
      }
    }

    return hooks.data[currentHook].value;
  };

  const createElement = (vDom: VDomType | string): HTMLElement | Text => {
    if (vDom === undefined) {
      return undefined;
    }

    if (typeof vDom === 'string') {
      return document.createTextNode(vDom);
    }

    const { type, props = {}, children = [] } = vDom;
    const $element = document.createElement(type);

    Object.keys(props).forEach((name) => {
      if (isEventProp(name, props[name])) {
        const eventType = name.toLowerCase().split('on')[1];
        $element.addEventListener(eventType, props[name]);
      } else if (name === 'ref') {
        props[name].current = $element;
      } else {
        $element.setAttribute(name, props[name]);
      }
    });

    children.map(createElement).forEach(($childElement) => {
      if ($childElement !== undefined) {
        $element.appendChild($childElement);
      }
    });

    return $element;
  };

  const render = ($root: HTMLElement, renderApp: () => VDomType | string) => {
    rerender = () => {
      hooks.currentHook = 0;
      const newVDom = renderApp();
      if (currentVNode) {
        $root.removeChild($root.firstChild!);
      }
      $root.appendChild(createElement(newVDom));
      currentVNode = newVDom;
    };

    hooks.data = [];
    rerender();
  };

  return {
    useState,
    render,
    useRef,
    useMemo,
    rerender,
  };
}

export default React();
