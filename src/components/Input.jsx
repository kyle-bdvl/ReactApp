export default function Input({label,ref,...props}) {
  const inputBoxDesign = "text-sm font-bold uppercase text-shadow-white rounded-sm w-full p-1 border-2 border-amber-50"
  return (
    <label>
      {label}
      <input type="text" ref={ref} className={inputBoxDesign}  {...props}  />
    </label>
  )
}