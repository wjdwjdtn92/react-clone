import React from '../../../lib/react';
import { TodoType, VDomType } from '../../../types';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todos: Array<TodoType>;
  onRemove: (id: string) => void;
}

function TodoList({ todos, onRemove }: TodoListProps): VDomType {
  const children = todos.map((todo) =>
    TodoItem({ id: todo.id, text: todo.text, created: todo.created, onRemove }),
  );

  return {
    type: 'ul',
    props: { class: 'flex flex-col gap-[16px]' },
    children,
  };
}

export default TodoList;
