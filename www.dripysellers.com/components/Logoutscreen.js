import React from 'react'
import image from '../public/wall.png'
import styles from '../styles/Logout.module.css'

const Logoutscreen = () => {
  return (
    <div className={styles.main}>
       <p className={styles.heading}>Welcome to Drippy</p>
       <p className={styles.subheading}>Please SignIn to access our features</p>
    </div>
  )
}

export default Logoutscreen
