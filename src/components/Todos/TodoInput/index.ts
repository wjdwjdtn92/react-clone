import React from '../../../lib/react';
import { VDomType } from '../../../types';

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

function TodoInput({ onSubmit }: TodoInputProps): VDomType {
  const todoInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = (event: any) => {
    event.preventDefault();

    const currnetValue = todoInputRef.current.value;

    onSubmit(currnetValue);
    todoInputRef.current.value = '';
  };

  return {
    type: 'form',
    props: { class: 'mt-[16px]' },
    children: [
      {
        type: 'input',
        props: {
          class: 'border-2 ',
          ref: todoInputRef,
          placeholder: '할일을 입력해주세요',
        },
      },
      {
        type: 'button',
        props: { onclick: handleButtonClick },
        children: ['추가'],
      },
    ],
  };
}

export default TodoInput;
