import { format } from 'date-fns';
import React from '../../../lib/react';
import { TodoType, VDomType } from '../../../types';

interface TodoItemProps extends TodoType {}

function TodoItem({ text, created }: TodoItemProps): VDomType {
  const displayDateTtext = React.useMemo(
    () => format(created, 'HH:mm:ss'),
    [created],
  );

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
