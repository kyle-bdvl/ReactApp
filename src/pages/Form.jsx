import Header from '../components/Header';
import Input from '../components/Input';
export default function Form() {
  return (
    <>
      <Header buttonName="Tables" />
      <form className="w-full h-screen bg-gray-300 shadow-md border border-gray-200 p-10 space-y-6">
        <Input label="Phone Number" name="phone" />
        <Input label="Address" name="address" />
        <Input label="Hobbies" name="hobby" />
        <Input label="Occupation" name="job" />
      </form>






    </>
  )
}