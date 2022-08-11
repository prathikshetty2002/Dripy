import { useEffect, useState } from 'react'
import '../styles/globals.css'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../Firebase.js'
import Navbar from '../components/Navbar'



function MyApp({ Component, pageProps }) {

  const [user,setUser] = useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
    })
  },[])

  return<> 
  <Navbar user={user}/>
  <Component {...pageProps} user={user} />
  </>
}

export default MyApp
