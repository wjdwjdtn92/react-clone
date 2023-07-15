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
    const currentKey = hooks.currentHook;
    hooks.currentHook += 1;

    if (
      hooks.data[currentKey] === undefined ||
      hooks.data[currentKey].type !== 'memo'
    ) {
      hooks.data[currentKey] = { type: 'memo', value: getValue(), deps };
    } else {
      const oldDeps = hooks.data[currentKey].deps;
      const hasDepsChanged = deps.some(
        (dep, index) => !Object.is(dep, oldDeps[index]),
      );

      if (hasDepsChanged) {
        hooks.data[currentKey] = { type: 'memo', value: getValue(), deps };
      }
    }

    return hooks.data[currentKey].value;
  };

  const useCallback = <T>(callback: T, deps: any[]): T =>
    useMemo(() => callback, deps);

  const createElement = (vDom: VDomType | string): HTMLElement | Text => {
    if (vDom === undefined) {
      return undefined;
    }

    if (typeof vDom === 'string') {
      return document.createTextNode(vDom);
    }

    if (typeof vDom.type === 'function') {
      return createElement(vDom.type(vDom.props));
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

    const updateElement = (oldVDom: VDomType, newVDom: VDomType) => {
      // 함수형 컴포넌트와 일반 vdom 타입 경우
      if (typeof oldVDom.type !== typeof newVDom.type) {
        // Todo: 요소 삭제후 createElement 후에 요소 변경하기
      }

      // 일반 vdom인 경우
      if (
        typeof oldVDom === 'object' &&
        typeof newVDom === 'object' &&
        oldVDom.type !== newVDom.type
      ) {
        // Todo: 요소 삭제후 createElement 후에 요소 변경하기
      }

      if (
        typeof oldVDom.type === 'function' &&
        typeof newVDom.type === 'function'
      ) {
        // Todo: Props 비교후 다른경우 createElement 후에 요소 변경하기
      } else {
        // Todo: Props 비교후 다른경우 변경된 props만 업데이트
      }

      // Todo: children 반복
    };

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
    useCallback,
  };
}

export default React();
