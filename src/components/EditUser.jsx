import React, {useState, useEffect, useContext} from 'react'
import {
  Button,
  styled,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';

import { getUser, editUser } from "../service/api"
import { TodoContext } from "../context/Context";

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
}

const EditUser = ({ userId }) => {
  const { users, setUsers } = useContext(TodoContext);

  const [user, setUser] = useState(initialValues)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getUserData(userId);
  }, [userId])

  const getUserData = async (userId) => {
    let response = await getUser(userId)
    setUser(response.data)
  }

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addUserDetails = async () => {
    await editUser(user, userId)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await addUserDetails();
    const updatedUsers = users.map((u) => (u.id === userId ? user : u));
    setUsers(updatedUsers);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit User
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="name"
            value={user.name}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="username"
            value={user.username}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="email"
            value={user.email}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="phone"
            value={user.phone}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={
            () => handleSubmit()
          }>
            Add User
          </Button>
        </DialogActions>
      </Dialog>  
    </>
  )
}

export default EditUser