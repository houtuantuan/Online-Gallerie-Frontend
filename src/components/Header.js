import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate
} from 'react-router-dom'
import '../css/navLink.css'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function Header (props) {
  const { window, isAuthenticated, user, logOut } = props

  const initialState = [
    { name: 'Home', pathName: '', tag: 'home' },
    { name: 'Explore', pathName: 'gallery' },
    { name: 'Drawing board', pathName: 'canvas' },
    { name: 'Sign In', pathName: 'signin', tag: 'signIn' },
    { name: 'Sign Up', pathName: 'signup', tag: 'signUp' }
  ]

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [navItems] = useState(initialState)

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [value, setValue] = useState()

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2, textDecoration: 'none' }}>
        <Link to='/Online-Gallerie-Frontend'>Color Gallery</Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map(
          item =>
            !(
              (isAuthenticated && item.tag === 'signIn') ||
              (isAuthenticated && item.tag === 'signUp')
            ) && (
              <ListItem key={item.name} disablePadding>
                <NavLink
                  key={item.name}
                  className='navLink'
                  to={`Online-Gallerie-Frontend/${item.pathName}`}
                >
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            )
        )}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  const navigate = useNavigate()
  const params = { q: value }

  const goToSearchResult = () => {
    navigate({
      pathname: '/gallery/search',
      search: `?${createSearchParams(params)}`
    })
    document.getElementById('inputField').value = ''
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: '#94AF9F', display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link className='navLink' to='/Online-Gallerie-Frontend'>
              <Typography
                variant='h5'
                fontWeight={'bold'}
                sx={{ color: '#94AF9F', textShadow: '1px 2px 5px #F9F5EB' }}
              >
                Color Gallery
              </Typography>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            {navItems.map(
              item =>
                !(
                  (isAuthenticated && item.tag === 'signIn') ||
                  (isAuthenticated && item.tag === 'signUp')
                ) && (
                  <NavLink
                    key={item.name}
                    className='navLink'
                    to={`Online-Gallerie-Frontend/${item.pathName}`}
                  >
                    <Button
                      key={item.name}
                      style={{ color: 'white', fontWeight: '1000' }}
                    >
                      {item.name}
                    </Button>
                  </NavLink>
                )
            )}
          </Box>
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'white' }} />
              </SearchIconWrapper>
              <StyledInputBase
                id='inputField'
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => {
                  setValue(event.target.value)
                }}
              />
            </Search>
            <Button
              onClick={goToSearchResult}
              variant='contained'
              sx={{ marginLeft: '7px', color: '#539165' }}
            >
              Search
            </Button>
          </Toolbar>
          {user && (
            <Box>
              <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Typography>
                  {' '}
                  <span style={{ color: '#000000' }}>
                    <AccountCircleIcon
                      fontSize='large'
                      sx={{ marginTop: '10px', color: '#94AF9F' }}
                    />
                    {/* {user.firstName + ' ' + user.lastName} */}
                  </span>
                </Typography>
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <Link
                  to='Online-Gallerie-Frontend/profile'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <Link to='/Online-Gallerie-Frontend'>
                  <MenuItem
                    style={{ textDecoration: 'none', color: 'black' }}
                    onClick={() => {
                      logOut()
                      handleClose()
                    }}
                  >
                    Logout
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }}></Box>
    </Box>
  )
}

export default Header
