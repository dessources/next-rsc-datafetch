import {getTodos} from '@/db/sgbd'
import Todos from './todos-view'

export const revalidate = 15
const Page = async () => {
  const todos = await getTodos()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Todo</h1>
      <Todos todos={todos ?? []} />
    </div>
  )
}

export default Page
