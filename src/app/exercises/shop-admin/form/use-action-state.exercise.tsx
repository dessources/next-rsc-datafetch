'use client'
import {startTransition, useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React from 'react'
import {CategoriesEnum, Product} from '@/lib/type'

import {onSubmitAction} from '../actions'
import {toast} from 'sonner'
import {FormSchemaType, formSchema} from '../schema'

export default function ProductForm({product}: {product?: Product}) {
  const [state, formAction] = useActionState(onSubmitAction, {success: true})
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 0,
      category: product?.category ?? CategoriesEnum.default,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    },
  })

  React.useEffect(() => {
    form.reset({
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category: product?.category ?? CategoriesEnum.default,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
  }, [form, product]) //

  const categories = Object.keys(CategoriesEnum).filter((key) =>
    Number.isNaN(Number(key))
  )

  async function handleSubmitAction(values: FormSchemaType) {
    // ⛏️ Supprime tout ce code et remplace le par un appel à `formAction(formData)`

    const formData = new FormData()
    console.log(values)
    const entries = Object.entries(values).forEach(
      ([key, value]: [string, any]) => formData.append(key, value)
    )

    startTransition(() => formAction(formData))
  }

  // 🐶 Tu vas devoir maintenant gérer les erreurs retournées par le server action
  // 🐶 Si le `state.success` est vrai, affiche un `toast` `Product saved`
  // 🐶 Si non, pour chaque erreur dans `state.errors`, utilise `form.setError`
  // pour afficher les erreurs dans le formulaire
  // 🐶 Utilise `state.message` pour afficher un `toast` d'erreur
  // 🐶 Pense à reset le formulaire en cas de succès
  React.useEffect(() => {
    const success = state.success // Remplace true par `state.success`
    if (success) {
      toast.success(state.message)
      form.reset()
    } else {
      for (const error of state?.errors ?? []) {
        form.setError(error.field, {type: 'manual', message: error.message})
      }
      // 🐶 Affiche un `toast` d'erreur
      toast.error(state.message ?? 'Error')
    }
    // 🐶 N'oublie pas les dépendances
  }, [form, state])

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(handleSubmitAction)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product title</FormLabel>
              <FormControl>
                <Input placeholder="ex : Iphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="199" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Buttons />
        </div>
      </form>
    </Form>
  )
}
const Buttons = () => {
  return (
    <>
      <Button size="sm" type="submit">
        Save
      </Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}
