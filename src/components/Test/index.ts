import { nodeType } from '../../types';
import Hello from '../Hello';

function Test(): nodeType {
  let isShow = false;

  const handleClick = () => {
    console.log('click');
  };

  const handleToggleShow = () => {
    isShow = !isShow;
  };

  return {
    type: 'div',
    children: [
      isShow ? Hello(handleClick) : null,
      Hello(handleClick),
      Hello(handleClick),
      {
        type: 'button',
        props: { onclick: handleToggleShow },
        children: ['버튼'],
      },
    ],
  };
}

export default Test;
