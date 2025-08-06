export default function Input({label,ref,...props}) {
  const inputBoxDesign = " mt-1 text-md font-bold text-shadow-white rounded-sm w-full p-1 border-2 border-amber-50"
  return (
    <label className="text-start gap-2.5">
      {label}
      <input type="text" ref={ref} className={inputBoxDesign}  {...props}  />
    </label>
  )
}