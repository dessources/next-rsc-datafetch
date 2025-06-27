// 🐶 Ajoute la directive `use server` pour spécifier que nous faisons des server actions
'use server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {addTodo as addTodoDao} from '@/db/sgbd'
import {AddTodo} from '@/lib/type'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)

  //🐶 Pense à utiliser cette action dans `todos-view`
  try {
    return await addTodoDao(todo)
  } catch (error) {
    console.error(error)
    throw error
  }
}
