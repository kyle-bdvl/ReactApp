export default function Button({fx,children,...props}){ 
  return(
    <button  className="active:cursor-pointer hover:cursor-pointer stroke-stone-500" onClick={fx} {...props}>{children}</button>
  )
}