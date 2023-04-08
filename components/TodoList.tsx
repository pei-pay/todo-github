import React from 'react'
import TodoItem from './TodoItem'

type Todo = {
  id: number
  text: string
  isCompleted: boolean
}

type Props = {
  todos: Todo[]
  onEdit: (id: number, text: string) => void
  onDelete: (id: number) => void
}

const TodoList = ({ todos, onEdit, onDelete }: Props) => {
  return (
    <div className='divide-y divide-gray-200'>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TodoList
