"use client"
import { FormEvent } from 'react'
import { redirect } from 'next/navigation'


export default function LoginPage() {


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    await fetch('../api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      console.log("response from FETCH", response)
      if (response.ok) {
        console.log("redirecting")
        redirect('/app')
      } else {
        console.log("not redirecting")
        // Handle errors
      }
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}