import { nodeType } from '../../types';

function Hello(onclick: () => void): nodeType {
  return {
    type: 'div',
    children: [
      { type: 'input', props: {}, children: ['value'] },
      { type: 'button', props: { onclick }, children: ['버튼'] },
    ],
  };
}

export default Hello;
