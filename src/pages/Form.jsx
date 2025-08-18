import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
export default function Form() {
  let formClass = " w-full h-screen bg-gray-300 shadow-md border border-gray-200 p-10 space-y-6 "
  const [errors, setErrors] = useState({});

  // retrieving admin email from the store 
  const {email} = useSelector(state=> state.userDetail);
  // using a useEffect to track the errors in the console.log 
  useEffect(() => {
    console.log("Errors updated ", errors);
  }, [errors])


  function validateForm(data) {
    const newErrors = {}
    if (!data.phone?.trim()) newErrors.phone = "Phone is required";
    if (!data.hobby?.trim()) newErrors.hobby = "Hobby is required";
    if (!data.job?.trim()) newErrors.job = "Occupation is required";
    if (!data.memberName?.trim()) newErrors.member = "Member name is required";
    // regex or format checks
    const phoneRegex = /^[0-9-]+$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
      newErrors.phoneFormat = "Invalid phone format";
    }

    return newErrors;
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    // fd short for form data  
    const fd = new FormData(event.target);
    const rawData = Object.fromEntries(fd.entries())
    console.log({...rawData, email})
    let errs = validateForm(rawData)
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // if there are no errs. It would clear the setErrors state 
    setErrors({});
    console.log("success from client side validation")

    //backend code  
    try {
      const res = await fetch("http://localhost:5000/api/formFilled",{
        method : "POST", 
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({...rawData,  email})
      });

      const data = await res.json();
      alert(data.message);

    }catch(err){ 
      console.log(err , "from console.errs");
    }
  }
  return (
    <>
      <Header buttonName="Members" />

      <form className={formClass} onSubmit={handleSubmitForm} >
        <h1 className='font-bold text-4xl'>Member Form</h1>
        <Input label="Member Name" name="memberName" placeholder="John Doe"/>
        {errors.member && <p className="text-red-500 font-bold text-sm">{errors.member}</p>}
        <Input label="Phone Number" name="phone" placeholder="012-345-6789" />
        {errors.phone && <p className="text-red-500 font-bold text-sm">{errors.phone}</p>}
        {errors.phoneFormat && <p className="text-red-500 font-bold text-sm">{errors.phoneFormat}</p>}
        <Input label="Hobbies" name="hobby" placeholder="E.g ~ football, gaming" />
        {errors.hobby && <p className="text-red-500 font-bold text-sm">{errors.hobby}</p>}
        <Input label="Occupation" name="job" placeholder="E.g~ Software Engineer" />
        {errors.job && <p className="text-red-500 font-bold text-sm">{errors.job}</p>}
        <Button type="submit">Submit</Button>
      </form>

    </>
  )
}