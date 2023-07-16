import { TodoType, VDomType } from '../../types';
import React from '../../lib/react';
import TodoInput from '../../components/Todos/TodoInput';
import TodoList from '../../components/Todos/TodoList/indes';
import Header from '../../components/share/Header';

function RecordPage(): VDomType {
  const [todos, setTodos] = React.useState<Array<TodoType>>([]);

  const handleSubmit = (text: string) => {
    todos.push({ id: String(todos.length), text, created: new Date() });
    setTodos([...todos]);
  };

  const handleRemove = React.useCallback((id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }, []);

  return {
    type: 'div',
    props: {
      class: 'w-full h-full flex mx-auto mt-[200px] flex-col items-center',
    },
    children: [
      Header(),
      TodoInput({ onSubmit: handleSubmit }),
      TodoList({ todos, onRemove: handleRemove }),
    ],
  };
}

export default RecordPage;
