"use client"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


export default function LoginPage() {
  const router = useRouter();

  


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('../api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const resp = await response.json();

    if (response.ok) {
      //set a cookie that the homepage will verify with Cookies.get("accessToken")
      console.log(resp.token)
      Cookies.set("accessToken", resp.token);
      
      //router.push("/app")
    } else {
      alert(resp.message)
      // Handle errors
    }


  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}