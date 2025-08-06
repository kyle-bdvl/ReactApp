import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
export default function Register() {
  // use state to handle the errors 
  const [errors, setErrors] = useState({})
  // declaring all the refs 
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  // function to validate the input fields 
  function validation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let username = usernameRef.current.value.trim()
    let password = passwordRef.current.value.trim()
    let confirmPassword = confirmPasswordRef.current.value.trim()
    let email = emailRef.current.value.trim()

      let newError = {};
      if (!username) newError.username = "Invalid Username";
      if (!password) newError.password = "Invalid password";
      if (!confirmPassword) newError.confirmPassword = "Invalid password";
      if (!email) newError.email = "Invalid Email";
      if (confirmPassword !== password) newError.matching = "passwords are not matching";
      if (!emailRegex.test(email) ) newError.emailValid ="Email is not valid"

      setErrors(newError);
      return newError;
    
  }

  // Client side validation 
  function handleSubmit(event) {
    event.preventDefault()
    const errs = validation();

    const fd = new FormData(event.target);
    // gives an array of all input fields
    const data = Object.fromEntries(fd.entries())



    // to check if there are keys from the useState --> setErrors object 
    if (Object.keys(errs).length === 0) {
      console.log("submit form")
    }


  }

  return (
    <div className=" text-amber-50 flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500  to-stone-500">
      <div className="bg-cyan-500 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-white/20">
        <h1 className="text-2xl mb-4">Register Page</h1>

        <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
          <Input label="Username" ref={usernameRef} />
          {errors.username && <p className="text-red-500 font-bold text-sm">{errors.username}</p>}
          <Input label="Email" ref={emailRef} type="text" name="email"/>
          {errors.email && <p className="text-red-500 font-bold text-sm">{errors.email}</p>}
          {errors.emailValid && <p className="text-red-500 font-bold text-sm">{errors.emailValid}</p>}
          <Input label="Password" ref={passwordRef} type="password" name="password" />
          {errors.password && <p className="text-red-500 font-bold text-sm">{errors.password}</p>}
          <Input label="Confirm Password" ref={confirmPasswordRef} type="password" name="confirmPassword" />
          {errors.confirmPassword && <p className="text-red-500 font-bold text-sm">{errors.confirmPassword}</p>}
          {errors.matching && <p className="text-red-500 font-bold text-sm">{errors.matching}</p>}

          <div className="flex items-center justify-between mt-8">
            <Link to="..">Back</Link>
            <Button type="submit" >Register</Button>
          </div>
        </form>


      </div>

    </div>
  )
}