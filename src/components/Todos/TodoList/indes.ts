import React from '../../../lib/react';
import { TodoType, VDomType } from '../../../types';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todos: Array<TodoType>;
}

function TodoList({ todos }: TodoListProps): VDomType {
  const children = todos.map((todo) =>
    TodoItem({ text: todo.text, created: todo.created }),
  );

  return {
    type: 'ul',
    props: { class: 'flex flex-col gap-[16px]' },
    children,
  };
}

export default TodoList;
