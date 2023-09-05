import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  isActiveButton: boolean,
  lengthTodos: number,
  formSummit: (event: React.FormEvent) => void,
  todoTitle: string,
  setTodoTitle: (title: string) => void,
  patchTodos: (patch: object) => void,
  tempTodo: Todo | null,
}

// function checkButton(todos: Todo[]): boolean {
//   return todos.every(todo => todo.completed);
// }

function creatPatchTodo(key: string, value: string | boolean) {
  return { [key]: value };
}

export const Header: React.FC<Props> = ({
  isActiveButton,
  lengthTodos,
  formSummit,
  todoTitle,
  setTodoTitle,
  patchTodos,
  tempTodo,
}) => {
  const activeButton = useMemo(() => {
    return isActiveButton;
  }, [isActiveButton]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleAllCompleted = () => {
    patchTodos(creatPatchTodo('completed', !activeButton));
  };

  return (
    <header className="todoapp__header">
      {!!lengthTodos && (
        <button
          onClick={handleAllCompleted}
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: activeButton },
          )}
          aria-label="select-all"
        />
      )}

      <form onSubmit={formSummit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleChange}
          disabled={!!tempTodo}
        />
      </form>
    </header>
  );
};
