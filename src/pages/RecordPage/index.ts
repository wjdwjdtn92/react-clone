import { VDomType } from '../../types';
import React from '../../lib/react';
import TodoInput from '../../components/Todos/TodoInput';
import TodoList from '../../components/Todos/TodoList/indes';
import Header from '../../components/shard/Header';

function RecordPage(): VDomType {
  const [todos, setTodos] = React.useState([]);
  const handleSubmit = (text: string) => {
    todos.push({ text, created: new Date() });
    setTodos([...todos]);
  };

  return {
    type: 'div',
    props: {
      class: 'w-full h-full flex mx-auto mt-[200px] flex-col items-center',
    },
    children: [
      Header(),
      TodoInput({ onSubmit: handleSubmit }),
      TodoList({ todos }),
    ],
  };
}

export default RecordPage;
