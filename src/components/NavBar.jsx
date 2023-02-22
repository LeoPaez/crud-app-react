import React from 'react'
import { AppBar, Toolbar, styled } from "@mui/material"

const Logo = styled("a")`
  font-size: 26px;
  color: #212529;
  font-weight: 500;
`

const NavBar = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#FFF", boxShadow: 3 }}>
        <Toolbar>
          <Logo href="/">
            Crud App
          </Logo>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar