import * as React from 'react';
import { useState, useContext } from "react"
import PropTypes from 'prop-types';
import {
  Box, 
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  Toolbar,
  Paper,
  Button,
  styled,
  Typography,
  Chip
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from "./AddUser";
import EditUser from "./EditUser";

import SearchBar from "./SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import { TodoContext } from "../context/Context";

const ToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding-bottom: 10px;
  gap: 10px;
`
const Container = styled(Box)`
  width: 90%;
  margin-top: 20px;
  @media (max-width: 1200px){
    width: 100%;
  }
`
const TableTitle = styled(Typography)`
  font-size: 24px;
  color: #343a40;
  font-weight: 500;
`
const UserChip = styled(Chip)`
  background-color: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
  height: 28px;
`
const TableItem = styled(TableRow)`
  background-color: #f8f9fa;
`
const TablePadding = styled(TableCell)`
  @media (max-width: 1200px){
    padding: 0px;
    width: 4%;
  }
`
const TableInfo = styled(TableCell)`
  margin-right: 10px;
  @media (max-width: 1200px){
    :nth-of-type(3n + 2) {
      width: 10%;
    }
    :nth-of-type(3n + 3) {
      width: 12%;
    }
    :nth-of-type(3n + 4) {
      width: 14%;
    }
    :nth-of-type(3n + 5) {
      width: 24%;
    }
    :nth-of-type(3n + 6) {
      width: 14%;
    }
    :nth-of-type(3n + 7) {
      width: 20%;
    }
  }
  @media (max-width: 900px){
    :nth-of-type(3n + 2) {
      width: 8%;
    }
    :nth-of-type(3n + 7) {
      width: 22%;
    }
    :last-of-type {
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0;
      gap: 6px;
      padding-block: 8px;
    }
  }
`

const variants = {
  hidden: {
    opacity: 0,
    y: -30
  },
  visible: ({ delay }) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.4
    }
  }),
  exit: {
    opacity: 0,
    y: -10,
  }
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'buttons',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableItem>
        <TablePadding padding="normal">
        </TablePadding>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ fontWeight: "600" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableItem>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {
  return (
    <ToolBar>
      <SearchBar />
      <AddUser />
    </ToolBar>
  );
}

const EnhancedTable = () => {
  const { users, deleteUserData, search } = useContext(TodoContext)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Container>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{display: "flex", gap: "10px"}}>
          <TableTitle>
            Clients
          </TableTitle>
          <UserChip label={`${users.length} users`}/>
        </Toolbar>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              rowCount={users.length}
            />
            <TableBody>
              <AnimatePresence>
                {users.filter((user) => {
                  return search.toLowerCase() === ""
                  ? user 
                  : user.name.toLowerCase().includes(search)
                  || user.username.toLowerCase().includes(search)
                  || user.email.toLowerCase().includes(search)
                  || user.phone.toLowerCase().includes(search)
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={user.id}
                      component={motion.tr}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={{ delay: (index) * 0.1}}
                    >
                      <TablePadding padding="normal"></TablePadding>
                      <TableInfo width="14%">{user.id}</TableInfo>
                      <TableInfo width="16%">{user.name}</TableInfo>
                      <TableInfo width="16%">{user.username}</TableInfo>
                      <TableInfo width="20%">{user.email}</TableInfo>
                      <TableInfo width="14%">{user.phone}</TableInfo>
                      <TableInfo width="16%" align="center">
                          <EditUser userId={user.id} />
                          <Button variant="outlined" color="error" onClick={() => deleteUserData(user.id)}>
                            <DeleteIcon />
                          </Button>
                      </TableInfo>
                    </TableRow>
                  );
                })}
              </AnimatePresence>
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default EnhancedTable