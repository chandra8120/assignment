import React, { useState } from 'react'
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";

import { Button } from '@mui/material';
import { auth } from './FirebaseConfig';

const Email = () => {
    const [data,setData]=useState({email:"",password:""})
    const {email,password}=data
    const [show,setShow]=useState(false)
    
    
    const change=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
    }
    

  const signIn=()=>{

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      setShow(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode,"Password did not match")
      
    });
    setData({email:"",password:""})
     }
     const signout=()=>{
      setShow(false)
 
      

    }

        
        // signOut(auth).then(() => {
        //   // Sign-out successful.
        // }).catch((error) => {
        //   // An error happened.
        // });
  return (
    <div>

    <form style={{border:"2px solid red",width:"400px"}}>
      <input type='text' name='email' value={email} placeholder='email' onChange={change}/><br></br>
      <input type='text' name='password' value={password} placeholder='password' onChange={change}/><br></br>

      <Button onClick={signUp}>SignUp</Button>
      <Button onClick={signIn}>SignIn</Button> 
      {/* <Button onClick={signout}>SignOut</Button> */}
      </form>
    </div>
  )
}

export default Email
