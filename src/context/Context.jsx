import React, { useState, useEffect, createContext } from 'react'
import { getUsers, deleteUser } from "../service/api"

export const MyContext = createContext()

export const ContextProvider = ({ children }) => {
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
    const newUsers = users.filter(user => user.id !== id)
    setUsers(newUsers);
  }

  const deleteUserData = async (id) => {
    await deleteUser(id)
    getUsers();
    deleteUserArray(id)
  }


  return (
    <MyContext.Provider
      value={{ users, setUsers, deleteUserData, search, setSearch }}
    >
      {children}
    </MyContext.Provider>
  )
}
