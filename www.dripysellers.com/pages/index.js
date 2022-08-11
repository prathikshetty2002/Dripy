import Head from 'next/head'
import Image from 'next/image'
import Logoutscreen from '../components/Logoutscreen'
import styles from '../styles/Home.module.css'
import { collection, getDocs, query,  where } from "firebase/firestore";
import { auth, db } from '../Firebase'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home({user}) {

  return (
    <>
    {
      user 
      ?
      <>
      <div className={styles.mainheadingcomp}>
        <p className={styles.mainheading}>Welcome to Sellers Section Of Drippy</p>
      </div>

      <div className={styles.displaySection}>
        <h2 className={styles.heading}>Your Products</h2>



      </div>
      </>
      :
      <Logoutscreen/>
    }
    </>
    
  )
}
