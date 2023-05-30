'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#11A37F] text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="logo"
        priority
      ></Image>
      <button
        type="button"
        className="animate-pulse text-3xl font-bold text-white hover:animate-none"
        onClick={() => signIn('google')}
      >
        Sign In to use ChatGPT
      </button>
    </div>
  )
}
export default Login
