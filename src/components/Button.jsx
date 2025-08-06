export default function Button({fx,children,...props}){ 
  let buttonDesign = "active:cursor-pointer hover:cursor-pointer stroke-stone-500"
  return(
    <button  className={buttonDesign} onClick={fx} {...props}>{children}</button>
  )
}