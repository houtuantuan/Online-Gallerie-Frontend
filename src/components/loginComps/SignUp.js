import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from './Loading'
import { registerUser } from '../../utils/authUtils'
import { Container, Grid, Box, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const SignUp = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest
}) => {
  const [{ firstName, lastName, email, password }, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleChange = e =>
    setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }))

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      if (!firstName || !lastName || !email || !password)
        throw new Error('First and last name, email and password are required')
      setLoadingAuthRequest(true)
      const { data, error } = await registerUser({
        firstName,
        lastName,
        email,
        password
      })
      if (error) throw error
      setToken(data.token)
      setIsAuthenticated(true)
      setLoadingAuthRequest(false)
      localStorage.setItem('token', data.token)
    } catch (error) {
      setLoadingAuthRequest(false)
      toast.error(error.message)
    }
  }

  if (loadingAuthRequest) return <Loading />
  if (isAuthenticated) return <Navigate to='/' />
  return (
    <>
      {/* <Container>

        <Grid
        container
        mt={10}
        ColumnSpace={{ xs: 2, md: 3, lg: 5 }}
        sx={{ display: 'flex', justifyContent: 'center' }}>

        <form className='form-signin' onSubmit={handleSubmit}>
          <label htmlFor='inputEmail' className='sr-only'>
            First name
          </label>
          <input
            id='firstName'
            className='form-control'
            placeholder='First Name'
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor='inputEmail' className='sr-only'>
            Last name
          </label>
          <input
            id='lastName'
            className='form-control'
            placeholder='Last name'
            value={lastName}
            onChange={handleChange}
          />
          <label htmlFor='inputEmail' className='sr-only'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder='Email address'
            value={email}
            onChange={handleChange}
          />
          <label htmlFor='inputPassword' className='sr-only'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='form-control'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />
          <button type='submit'>
            Sign up
          </button>
        </form>
      </Grid>
    </Container> */}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '75vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/signin'>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SignUp
