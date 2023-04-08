import React, { useState } from 'react'
import Head from 'next/head'
import TodoList from '../components/TodoList'

type Todo = {
  id: number
  text: string
  isCompleted: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState<string>('')

  const handleNewTodoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value)
  }

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newTodoText === '') return
    const newTodo: Todo = { id: Date.now(), text: newTodoText, isCompleted: false }
    setTodos([...todos, newTodo])
    setNewTodoText('')
  }

  const handleTodoEdit = (id: number, text: string) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    setTodos(updatedTodos)
  }

  const handleTodoDelete = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div className='container mx-auto'>
      <Head>
        <title>Next.js Todo App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='my-8'>
        <h1 className='text-3xl font-bold text-center'>TODO App</h1>

        <form className='flex my-4' onSubmit={handleNewTodoSubmit}>
          <input
            className='flex-grow mr-4 text-gray-700 bg-transparent outline-none'
            type='text'
            placeholder='Enter a new todo...'
            value={newTodoText}
            onChange={handleNewTodoTextChange}
          />
          <button
            className='px-3 py-1 text-sm text-white bg-blue-500 border rounded-md hover:bg-blue-600'
            type='submit'
          >
            Add
          </button>
        </form>

        {todos.length > 0 ? (
          <TodoList todos={todos} onEdit={handleTodoEdit} onDelete={handleTodoDelete} />
        ) : (
          <p className='text-center text-gray-400'>No todos yet. Add one now!</p>
        )}
      </main>
    </div>
  )
}
