import React, {useContext, useState} from 'react'
import { styled, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { addUser} from "../service/api"
import { TodoContext } from "../context/Context";


const AddUserButton = styled(Button)`
  width: 120px;
  padding-inline: 0;
`

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
}

const AddUser = () => {
  const { setUsers, users } = useContext(TodoContext)

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState(initialValues)

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addUserDetails = async () => {
    const response = await addUser(user)
    return response.data;
  }

  const handleSubmit = async () => {
  const newUser = await addUserDetails();
  setUsers([...users, newUser]);
  handleClose();
}

  return (
    <>
      <AddUserButton variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
        Add User
      </AddUserButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
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

export default AddUser