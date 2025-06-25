// 🐶 importe le composant ModeToggle  '@/components/theme-toggle'
import Image from 'next/image'
import Link from 'next/link'
import {ModeToggle} from '@/components/theme-toggle'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Next Mastery&nbsp;
          <code className="font-mono font-bold">by Mike Codeur</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="flex items-center gap-2 p-2 lg:p-0"
            href="/dashboard"
          >
            By{' '}
            <Image
              src="/NEXT-MASTERY-dark.png"
              alt="Vercel Logo"
              className="hidden dark:block"
              width={40}
              height={24}
              priority
            />
            <Image
              src="/NEXT-MASTERY-light.png"
              alt="Vercel Logo"
              className="block dark:hidden"
              width={40}
              height={24}
              priority
            />
          </Link>
          <ModeToggle />
        </div>
      </div>

      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex flex-col items-center justify-center from-sky-200 from-white via-blue-200 to-transparent before:absolute before:inset-0 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:inset-0 after:-z-20 after:blur-2xl after:content-[''] dark:before:bg-gradient-to-br dark:before:from-transparent dark:before:to-blue-700 dark:before:opacity-10 dark:after:from-sky-900 dark:after:via-[#0141ff] dark:after:opacity-40 sm:before:w-[480px] sm:after:w-[240px] lg:before:h-[360px]">
        <p className="z-10 mt-4 bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text p-2 text-6xl leading-none text-transparent dark:from-gray-200 dark:to-gray-500">
          RSC Data Fetch
        </p>
        <Image
          className="relative z-10"
          src="/NEXT-MASTERY-light.png"
          alt="App Logo"
          width={400}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Go to App
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>

        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            BackOffice{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </Link>

        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            CGV{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </Link>

        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Final{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-balance text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </Link>
      </div>
    </main>
  )
}
