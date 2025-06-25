'use client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Post} from '@/lib/type'

import {useEffect, useState} from 'react'

// 🐶 Une erreur devrait apparaître, corrige la car nous sommes dans un composant client

const Page = () => {
  // 🐶 Crée un state pour les posts
  const [posts, setPosts] = useState<Post[]>([])

  // 🐶 Crée un effet pour récupérer les posts
  // 🤖 Utilise le code ci-dessous

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts')
        const data = await response.json()
        setPosts(data as Post[])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {/* 🐶 Affiche les posts */}
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}
export default Page
