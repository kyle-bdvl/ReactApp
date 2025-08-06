import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../components/Button'
import Input from '../components/Input'
export default function Login() {
  const username = useRef();
  const password = useRef();
  const navi = useNavigate()

  function handleFormClick() {
    
  }

  function navRegister() {
    navi('/register')
  }
  return (
    <div className=" text-amber-50 flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-stone-500">
      <div className="bg-white/5 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-white/20">
        <h1 className="text-2xl mb-4">Login Page</h1>

        <form className="flex flex-col gap-4 mb-4">
          <Input label="Username" ref={username} required />
          <Input label="Password" ref={password} type="password" required />
          <Button type="submit" onClick={handleFormClick}>Login</Button>
        </form>

        <p>Do not have an account ? </p>
        <Button type="button" onClick={navRegister}>Register</Button>
      </div>

    </div>

  )
}