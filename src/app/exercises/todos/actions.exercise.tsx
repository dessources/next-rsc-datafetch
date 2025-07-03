'use server'
import {addTodo as addTodoDao, updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)

  //🐶 Pense à utiliser cette action dans `todos-view`
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error(error)
    throw error
  }
  revalidatePath('/exercises/todos')
}

export const updateTodo = async (todo: Todo, reg: string) => {
  if (!new RegExp(reg).test(todo.title))
    throw new Error("Le titre de la tache n'est pas valide")
  console.log('update todo action', todo)

  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    revalidatePath('/exercises/todos')
  }
}
