import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../store/userData';
import { setAccessToken } from '../store/authToken';
import Button from '../components/Button'
import Input from '../components/Input'
export default function Login() {
  const [errors, setErrors] = useState({})
  const emailRef = useRef();
  const passwordRef = useRef();
  const navi = useNavigate();
  // this is the dispatch 
  const dispatch = useDispatch();

  function validation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailForm = emailRef.current.value.trim();
    const passwordForm = passwordRef.current.value.trim();

    let newError = {}

    if (!emailForm)
      newError.email = "email invalid";
    else {
      delete newError.username;
    }
    if (!passwordForm)
      newError.password = "password invalid"
    else
      delete newError.password

    if (!emailRegex.test(emailForm)) newError.emailValid = "Email is not valid"

    setErrors(newError);
    return newError
  }

  async function handleFormClick(event) {
    event.preventDefault();
    // Mkaes it easy to retrieve all the data use the fd 
    const fd = new FormData(event.target);
    // to retrieve the data from the form 
    const dataForm = Object.fromEntries(fd.entries())
    console.log("from dataForm" , dataForm)
    const errs = validation()
    if (Object.keys(errs).length > 0) {
      console.log("Theres still Errors", errs)
      return
    }
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify(dataForm)
      });
      const resData = await res.json()
      alert(resData.message || "Login Success!")

      if (res.ok) {
        dispatch(setUserDetail({ username: resData.user.username, email: resData.user.email }))
       
        dispatch(setAccessToken(resData.token));
        navi('/form');
      }
    } catch (err) {
      console.error(err)
    }

  }

  function navRegister() {
    navi('/register')
  }
  return (
    <div className=" text-amber-50 flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-500">
      <div className="bg-white/5 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-white/20">
        <h1 className="text-2xl mb-4">Login Page</h1>

        <form className="flex flex-col gap-4 mb-4" onSubmit={handleFormClick}>
          <Input label="Email" ref={emailRef} name="email" />
          {errors.email && <p className="text-red-500 font-bold text-sm">{errors.email}</p>}
          <Input label="Password" ref={passwordRef} type="password" name="password" />
          {errors.password && <p className="text-red-500 font-bold text-sm" >{errors.password}</p>}
          <Button type="submit">Login</Button>
        </form>

        <p>Do not have an account ? </p>
        <Button type="button" onClick={() => navRegister()}>Register</Button>
      </div>

    </div>

  )
}