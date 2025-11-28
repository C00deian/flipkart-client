"use client"

import { useContext } from 'react'
import Container from '../components/Container'
import { FormWrap } from '../components/FormWrap'
import LoginForm from './LoginForm'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
   
  const { refreshUser, currentUser } = useContext(AuthContext);
  
  return (
        <Container>
            <FormWrap>
        <LoginForm currentUser={currentUser} refresh={refreshUser} />
            </FormWrap>
        </Container>
  )
 }

export default Login;
