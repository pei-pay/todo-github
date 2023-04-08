// components/TodoItem.tsx

import React, { useState } from 'react'

type Props = {
  id: number
  text: string
  isCompleted: boolean
  onEdit: (id: number, text: string) => void
  onDelete: (id: number) => void
}

const TodoItem = ({ id, text, isCompleted, onEdit, onDelete }: Props) => {
  const [editingText, setEditingText] = useState<string>(text)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditingText(text)
  }

  const handleEditSave = () => {
    onEdit(id, editingText)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value)
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 border-b border-gray-200'>
      {isEditing ? (
        <input
          className='flex-grow mr-4 text-gray-700 bg-transparent outline-none'
          type='text'
          value={editingText}
          onChange={handleTextChange}
        />
      ) : (
        <div
          className={`flex-grow mr-4 ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
          onClick={handleEdit}
        >
          {text}
        </div>
      )}
      <div className='flex-shrink-0'>
        {isEditing ? (
          <div className='flex items-center'>
            <button
              className='px-3 py-1 mr-2 text-sm text-gray-600 border rounded-md hover:bg-gray-100'
              onClick={handleEditCancel}
            >
              Cancel
            </button>
            <button
              className='px-3 py-1 text-sm text-white bg-blue-500 border rounded-md hover:bg-blue-600'
              onClick={handleEditSave}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className='px-3 py-1 text-sm text-white bg-red-500 border rounded-md hover:bg-red-600'
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoItem
