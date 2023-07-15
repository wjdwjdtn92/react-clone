import { format } from 'date-fns';
import React from '../../../lib/react';
import { TodoType, VDomType } from '../../../types';
import Button from '../../share/Button';

interface TodoItemProps extends TodoType {
  onRemove: (id: string) => void;
}

function TodoItem({ id, text, created, onRemove }: TodoItemProps): VDomType {
  const displayDateText = React.useMemo(
    () => format(created, 'HH:mm:ss'),
    [created],
  );

  return {
    type: 'li',
    props: { class: 'flex gap-[4px]', id },
    children: [
      {
        type: 'p',
        children: [String(text)],
      },
      {
        type: 'p',
        children: [String(displayDateText)],
      },
      Button({ onClick: () => onRemove(id), children: ['삭제'] }),
    ],
  };
}

export default TodoItem;
