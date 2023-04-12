import  {  useState , useEffect, useCallback } from 'react'
import {useQueryClient, useMutation ,useQuery} from "@tanstack/react-query"
import{getAllUsers,postUser,updateUser,deleteUser ,api} from "./api/axios"
import User from "./User"
import {DragDropContext,Draggable  } from "react-beautiful-dnd"
import {DroppableSolution as Droppable } from "./DroppableSolution"
const Users = () => {
    const userQueryClient = useQueryClient()
    const [name,setName] =useState("")
    

const {data: dataServer,isLoading,isError,error}= useQuery(['users'],getAllUsers);

const [data , setData] = useState([])

useEffect(()=>{
    const idArraySort = JSON.parse(localStorage.getItem("idArraySort"))

    if(!idArraySort && dataServer){
     const idArray = dataServer.map((user)=> user.id)
    localStorage.setItem("idArraySort",JSON.stringify(idArray) )
    setData(dataServer)
    }
    
    if(idArraySort && dataServer){
        
      let  dataArray = idArraySort.map((id)=>{
        return dataServer.find((user)=> user.id ===id)

        })
const usersId = dataServer.map((user)=> user.id)
        
        const newName = usersId.filter((userId)=>{
        return !idArraySort.includes(userId)
})
const idArray = [...newName,...idArraySort]
localStorage.setItem("idArraySort",JSON.stringify(idArray) )
dataArray = idArray.map((id)=>{
    return dataServer.find((user)=> user.id ===id)

    })


     setData(()=>dataArray)   
    }
    

    
},[dataServer])


const addMutation = useMutation(postUser,
    {
        onSuccess:()=>{
            userQueryClient.invalidateQueries("users")
            
        }
    })
const deleteMutation = useMutation(deleteUser,
    {
        onSuccess:()=>{
            userQueryClient.invalidateQueries("users")
            
        }
    })
    
const updateMutation = useMutation(updateUser,
    {
        onSuccess:()=>{
            userQueryClient.invalidateQueries("users")
            
        }
    })
    
const deleteName = (e , userId)=>{
e.preventDefault()
let idArraySort = JSON.parse(localStorage.getItem("idArraySort"))
const idArray = idArraySort.filter((id)=>{
    return id != userId
})
    localStorage.setItem("idArraySort",JSON.stringify(idArray) )
deleteMutation.mutate({id:userId})



}
const addName = (e )=>{
e.preventDefault()


addMutation.mutate({ name:name})

setName("")

}

const handeleDnd =useCallback((result)=>{
    if(!result.destination)return;
    const dataArray = [...data]
    const [reorderedItem] = dataArray.splice(result.source.index,1)
    dataArray.splice(result.destination.index,0,reorderedItem)
    const idArray = dataArray.map((user)=> user.id)
    localStorage.setItem("idArraySort",JSON.stringify(idArray) )
    setData(dataArray)

},[data])

let contant ;
if(isLoading){
    contant=<>Loading......</>
}else if(error){
    contant=<>{error}</>
}else{
    contant= (
        <DragDropContext onDragEnd={handeleDnd}>
            <Droppable droppableId="users">
                {(provided)=>(
                    <section {...provided.droppableId} ref={provided.innerRef} >
                    {data.map((user,i)=>{return(
                <Draggable key={user.id} draggableId={user.id.toString()} index={i}>
                     {(provided)=>( 
                    <User 
                    provided={provided}
                    ref={provided.innerRef}
                    user={user} 
                    key={user.id} 
                    deleteName={deleteName} 
                    updateMutation={updateMutation}/>
                     )}
                    </Draggable>)})}
                    {provided.placeholder }
                    </section>)}
                
                
        </Droppable>
    </DragDropContext>
        ) 
        
    
}



  return (
    <><div> {contant}
    </div>
    <form onSubmit={(e)=>addName(e)}>
        <input type='text' value={name} onChange={(e)=>setName(()=>e.target.value)}/>
        <input type='submit' value={"addName"} />
        
    </form>
    
    </>
    
  )
}

export default Users