import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState, useEffect} from 'react';
export default function Form() {
  let formClass = " w-full h-screen bg-gray-300 shadow-md border border-gray-200 p-10 space-y-6 overflow-hidden"
  const [errors, setErrors] = useState({});

  // using a useEffect to track the errors in the console.log 
  useEffect(()=>{
    console.log("Errors updated ", errors);
  },[errors])


  function validateForm(data) {
    const newErrors = {}
    if (!data.phone?.trim()) newErrors.phone = "Phone is required";
    if (!data.address?.trim()) newErrors.address = "Address is required";
    if (!data.hobby?.trim()) newErrors.hobby = "Hobby is required";
    if (!data.job?.trim()) newErrors.job = "Occupation is required";

    // regex or format checks
    const phoneRegex = /^[0-9-]+$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
      newErrors.phoneFormat = "Invalid phone format";
    }

    return newErrors;
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    // fd short for form data  
    const fd = new FormData(event.target);
    const rawData = Object.fromEntries(fd.entries())
    console.log(rawData)
    let errs = validateForm(rawData)
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // if there are no errs. It would clear the setErrors state 
    setErrors({});
    console.log("success")

    // backend code 
  }
  return (
    <>
      <Header buttonName="Tables" />
      <form className={formClass} onSubmit={handleSubmitForm} >
        <Input label="Phone Number" name="phone" placeholder="012-345-6789" />
        {errors.phone && <p className="text-red-500 font-bold text-sm">{errors.phone}</p>}
        {errors.phoneFormat && <p className="text-red-500 font-bold text-sm">{errors.phoneFormat}</p>}
        <Input label="Address" name="address" />
        {errors.address && <p className="text-red-500 font-bold text-sm">{errors.address}</p>}
        <Input label="Hobbies" name="hobby" placeholder="E.g football, gaming" />
        {errors.hobby && <p className="text-red-500 font-bold text-sm">{errors.hobby}</p>}
        <Input label="Occupation" name="job" placeholder="E.g~ Software Engineer" />
        {errors.job && <p className="text-red-500 font-bold text-sm">{errors.job}</p>}
        <Button type="submit">Submit</Button>
      </form>

    </>
  )
}