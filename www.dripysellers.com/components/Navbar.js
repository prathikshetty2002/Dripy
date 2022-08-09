import React from 'react'
import styles from '../styles/Navbar.module.css'
import  {auth} from '../Firebase'
import Link from 'next/link'

const Navbar = ({user}) => {
  return (
    <div className={styles.col}>
        <div className={styles.first}>
           <div className={styles.name}>Welcome to Drippy!</div> 
        </div>
        <div className={styles.second}>
            <ul>
                <li>Home</li>
                <li><Link href='/analysis'>Analysis</Link> </li>
                <li><Link href='/market'> MarketPlace</Link></li>
                {
                  user 
                  ?
                  <>
                    <li><Link href='/upload'>Upload Product </Link></li>
                    <li><button className={styles.outbtn} onClick={()=>auth.signOut()}>Signout</button></li>
                    <li>{user.displayName}</li>
                  </>
                  :
                  <>
                    <li><Link href='/register'>SignUp</Link></li>
                    <li><Link href='/login'>Login</Link></li>
                  </>
                }
            </ul>
        </div>
    </div>
  )
}

export default Navbar
