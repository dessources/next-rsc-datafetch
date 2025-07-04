'use server'
import {
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'
import {Product} from '@/lib/type'
import {formSchema} from './schema'

type FormStateSimple = {error: boolean; message: string}
const formSchemaLight = formSchema.partial({id: true, createdAt: true})
// 🐶 Rappel : Avec `useActionState` l'action server doit avoir 2 paramètres (`state` et `FormData`)
export async function onSubmitAction(
  prevState: FormStateSimple,
  data: FormData
): Promise<FormStateSimple> {
  //simulate slow server
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('data', data)
  // 🐶 Valide les données avec `Zod`
  // 🤖
  const formData = Object.fromEntries(data)
  const parsed = formSchemaLight.safeParse(formData)

  // 🐶 Si les données ne sont pas valides (`if (!parsed.success)`), retourne un objet de type `FormStateSimple`
  // 🤖 Aide toi de `logZodError(data)` pour afficher les erreurs
  if (!parsed.success) {
    logZodError(data)
    return {error: true, message: 'Données invalides'}
  }

  // 🐶 Appelle la BDD dans un `try` `catch` avec :
  // 🤖 await persistProductDao(parsed.data)
  try {
    await persistProductDao(parsed.data as Product)
  } catch (error) {
    console.error(error)
  }

  return {error: false, message: 'Success'}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/exercises/shop-admin')
}
