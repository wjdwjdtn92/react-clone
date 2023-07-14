import React from '../../../lib/react';
import { TodoType, VDomType } from '../../../types';

interface TodoInputProps extends TodoType {}

function TodoItem({ text, created }: TodoInputProps): VDomType {
  function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  const displayDateTtext = React.useMemo(() => formatTime(created), [created]);

  return {
    type: 'li',
    props: { class: 'flex' },
    children: [
      {
        type: 'p',
        children: [String(text)],
      },
      {
        type: 'p',
        children: [String(displayDateTtext)],
      },
    ],
  };
}

export default TodoItem;
