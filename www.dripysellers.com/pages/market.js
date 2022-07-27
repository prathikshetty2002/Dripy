import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import styles from '../styles/market.module.css'

const Market = () => {
    useEffect(()=>{
        fetchData()
    },[])
    
    const [apiData, setApiData] = useState()
    const fetchData = async ()=>{
        let data = await fetch('https://newsapi.org/v2/everything?q=business&apiKey=51eb69ffd9f64ee39e141e9a2505e49a')
        data = await data.json()
        console.log(data)
        setApiData(data["articles"])
          console.log(apiData)
    }
  return (
    <div className={styles.main} >
      <h2>Latest Market News , Drippy Keeps you Up to Date</h2>
      <div className={styles.newsfeed}>
        <div className={styles.card}>
             <p>{apiData[0]["author"]}</p>
        </div>
      </div>
    </div>
  )
}
 
export default Market
