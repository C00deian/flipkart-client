"use client"

import { FormWrap } from "../components/FormWrap"
import Container from "../components/Container"
import RegisterForm from "./RegisterForm"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
    
    const { refreshUser, currentUser } = useContext(AuthContext);
    
    return (

        <Container>
            <FormWrap>
              <RegisterForm currentUser={currentUser} refresh={refreshUser}/>
            </FormWrap>
        </Container>
    )

}

export default Register;