'use client'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

import TodoItem from './todo-item'
import {toast} from 'sonner'
import {Todo} from '@/lib/type'
import React, {startTransition} from 'react'
import {useOptimistic} from 'react'
import {addTodo as AddTodoAction} from './actions'

interface TodosProps {
  todos: Todo[]
}

export default function Todos({todos}: TodosProps) {
  const [inputValue, setInputValue] = React.useState('')

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )

  const handleClick = async () => {
    if (inputValue === '') {
      toast.error('Please enter a todo.')
      return
    }
    const newTodo = {
      id: optimisticTodos.length + 1,
      title: inputValue,
      isCompleted: false,
      updadtedAt: new Date().toISOString(),
    }
    startTransition(async () => {
      addOptimisticTodo(newTodo)
      toast('Todo has been created.')
      try {
        await AddTodoAction(newTodo)
      } catch (error) {
        console.error('Error creating todo:', error)
        toast.error(`Failed to create todo.${error}`)
      }
    })
  }

  return (
    <div className="flex  flex-col text-left">
      <div className="flex h-14 items-center border-b p-4 ">
        <h1 className="text-lg font-bold">Todos</h1>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-4 p-4">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="New todo"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleClick}>Submit</Button>
        </div>
        <div className="grid gap-4">
          {optimisticTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}
