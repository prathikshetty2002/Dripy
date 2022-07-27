import React, { useState } from 'react'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword , updateProfile  } from 'firebase/auth'
import {useRouter} from 'next/router'
import {collection,addDoc, setDoc, doc} from 'firebase/firestore'
import {db} from '../Firebase'
import styles from'../styles/Register.module.css'


const register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleClick = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(async() => {

                    await setDoc(doc(db, "Sellers", user.uid), {
                        email,
                        name,
                        products: [],
                        cart: {},
                        phoneNumber: "",
                        photoUrl: null
                    }).then(() => router.push("/")).catch(e => console.log(e))

                    // const docRef = await db.collection('sellers').doc(user.uid).set({
                    //    email,
                    //    name,
                    //    products: [],
                    //    cart: {},
                    //    phone: "",
                    //    profilePhoto: null     
                    // }).then((s) =>  router.push("/"))
                    
                    
                  }).catch((error) => {
                        console.log(error.message)
                  });

                
                
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className={styles.main} >
            <h1>Registration</h1>
            <input className={styles.main1} onChange={(e) => setName(e.target.value)} type="text" name="" placeholder='Enter name' />
            <input className={styles.main1} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className={styles.main1} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button className={styles.btn1} onClick={handleClick}>Sign In</button>
        </div>
        
    )
}

export default register
