import React, { useState, useEffect, createContext } from 'react'
import { getUsers, deleteUser } from "../service/api"

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState ("")

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    let response = await getUsers();
    setUsers(response.data)
  }

  // delete user from the array of
  const deleteUserArray = (id) => {
    const newUsers = users.filter(tarea => tarea.id !== id)
    setUsers(newUsers);
  }

  const deleteUserData = async (id) => {
    await deleteUser(id)
    getUsers();
    deleteUserArray(id)
  }


  return (
    <TodoContext.Provider
      value={{ users, setUsers, deleteUserData, search, setSearch }}
    >
      {children}
    </TodoContext.Provider>
  )
}
