import axios from "axios"

const API_URL = "https://my-json-server.typicode.com/leopaez/users/users"

export const addUser = async (data) => {
  try {
    return await axios.post(API_URL, data);
  } catch (error) {
    console.log("Error while calling addUser API", error.message);
  }
}

export const getUsers = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.log("Error while calling getUsers API", error.message);
  }
}

export const getUser = async (data) => {
  try {
    return await axios.get(`${API_URL}/${data}`);
  } catch (error) {
    console.log("Error while calling getUser API", error.message);
  }
}

export const editUser = async (data, id) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch {
    console.log("Error while calling editUser API", error.message);
  }
}

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.log("Error while calling deleteUser API", error.message);
  }
}