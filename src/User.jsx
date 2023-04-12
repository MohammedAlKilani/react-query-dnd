import {useState,forwardRef} from 'react'

const User = forwardRef(({ user ,deleteName ,updateMutation,provided},ref) => {
  const [newName,setNewName] =useState("")
  const updateName = (e,id)=>{
    e.preventDefault()
    updateMutation.mutate({...user,name:newName})
    
    setNewName("")
    }
  return (
    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={ref}>name : {user.name }
    <input type='text' value={newName}  onChange={(e)=>setNewName(()=>e.target.value)}/>
    
    <input type='button' value={"update"} onClick={(e)=>updateName(e,user.id)}/>

    <input type='button' value={"delete"} onClick={(e)=>deleteName(e,user.id)}/>
    </div>
  )
})

export default User