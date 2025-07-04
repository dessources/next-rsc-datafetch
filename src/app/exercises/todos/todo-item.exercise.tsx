import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'
import {startTransition, useOptimistic} from 'react'

// 🐶 Crée 2 types `TodoOptimistic` et `OptimisticFields`
// `TodoOptimistic` Le type du State de l'optimistic hook (Todo + sending: boolean)
// `OptimisticFields` Le type des champs en entrée de la fonction de mise à jour de l'optimistic hook (`reducer`)
type TodoOptimistic = Todo & {
  sending?: boolean
}
type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  // 🐶 Utilise l'optimistic hook pour gérer l'état optimiste du `todo`
  // 🐶 Aide au typage : `useOptimistic<TypeDuState, TypeOptmisticValue>`
  const [optimisticTodo, UpdateOptimisticTodo] = useOptimistic<
    TodoOptimistic,
    OptimisticFields
  >(todo, (state, {isCompleted, sending}) => ({...state, isCompleted, sending}))

  const handleChange = async (isCompleted: boolean) => {
    startTransition(async () => {
      UpdateOptimisticTodo({sending: true, isCompleted})
      try {
        await updateTodoAction({
          ...todo,
          isCompleted,
        })
      } catch (error) {
        toast.error(`Failed to update todo.${error}`)
      } finally {
        UpdateOptimisticTodo({sending: false, isCompleted})
      }
    })
  }
  return (
    <>
      {/* 🐶 Remplace tous les `todo` par `optimisticTodo` */}
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          checked={optimisticTodo.isCompleted}
          id={`${optimisticTodo.id}`}
          // 🐶 Appelle `handleChange` dans `startTransition`
          onCheckedChange={(checked) => handleChange(checked as boolean)}
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,
            'animate-color-cycle': optimisticTodo.sending,
          })}
          htmlFor={`${optimisticTodo.id}`}
        >
          {optimisticTodo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': optimisticTodo.isCompleted,
          })}
        >
          {optimisticTodo.updadtedAt}
        </span>
      </div>
    </>
  )
}
