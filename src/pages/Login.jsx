import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Button from '../components/Button'
import Input from '../components/Input'
export default function Login() {
  const [errors, setErrors] = useState({})
  const username = useRef();
  const password = useRef();
  const navi = useNavigate()

  function validation() {
    const usernameForm = username.current.value.trim();
    const passwordForm = password.current.value.trim();

    setErrors((prev)=>{
      const newError = {...prev};
      if(!usernameForm)
        newError.username ="username invalid";
      else {
        delete newError.username;
      }
      if(!passwordForm)
        newError.password="password invalid"
      else 
        delete newError.password
      return newError
      } 
    );
  }

  function handleFormClick(event) {
    event.preventDefault();
    // Mkaes it easy to retrieve all the data
    new FormData(event.target); 
  }

  function navRegister() {
    navi('/register')
  }
  return (
    <div className=" text-amber-50 flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-500">
      <div className="bg-white/5 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-white/20">
        <h1 className="text-2xl mb-4">Login Page</h1>

        <form className="flex flex-col gap-4 mb-4">
          <Input label="Username" ref={username} required />
          <Input label="Password" ref={password} type="password" required />
          <Button type="submit" onClick={handleFormClick}>Login</Button>
        </form>

        <p>Do not have an account ? </p>
        <Button type="button" onClick={()=>navRegister()}>Register</Button>
      </div>

    </div>

  )
}