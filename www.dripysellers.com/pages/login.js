import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import {auth} from '../Firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'next/router'
const login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()
    const handleSubmit = async()=>{
            try{
                await signInWithEmailAndPassword(auth,email,password)
                  router.push('/')
            }catch(err){
                console.log(err.message)
            }
    }
  return (
    <div className={styles.main}>
      <h1>Login Page</h1>
      <input className={styles.main1} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
      <input className={styles.main1} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button className={styles.btn1} onClick={handleSubmit}>Log In</button>
    </div> 
//     <div>
//   <form action="/action_page.php">
//     <label for="fname">First Name</label>
//     <input type="text" id="fname" name="firstname" placeholder="Your name..">

//     <label for="lname">Last Name</label>
//     <input type="text" id="lname" name="lastname" placeholder="Your last name..">
  
//     <input type="submit" value="Submit">
//   </form>
// </div>
  )
}

export default login
