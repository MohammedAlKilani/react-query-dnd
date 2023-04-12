import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:3500"
})

export const getAllUsers =async()=>{
  const data = await api.get("/users")
  return data.data} 

export const postUser = async(data)=>{
   return await api.post("/users",data)};

export const updateUser = async (user)=>{
  return  await api.patch(`/users/${user.id}`,user)
}

export const deleteUser = async (user)=>{
  
  return  await api.delete(`/users/${user.id}`)
}