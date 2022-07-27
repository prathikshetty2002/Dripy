import React, { useState } from 'react'
import styles from '../styles/upload.module.css'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {storage,db} from '../Firebase'
import {v4} from 'uuid'
import {collection,addDoc} from 'firebase/firestore'
import {useRouter} from 'next/router'

const upload = ({user}) => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [image, setImage] = useState(null)
    const [gender, setGender] = useState("")
    const [price, setPrice] = useState(0)
    const [articleType,setarticleType] = useState("")
    const [masterCategory,setmasterCategory] = useState("")

    const router = useRouter()


    const handleClick = async()=>{
        const imgname = image.name + v4()
        const imageref = ref(storage,`images/${imgname}`)

        try{
            await uploadBytes(imageref,image)
            const link =  await getDownloadURL(imageref)

            const docRef = await addDoc(collection(db, "Products"), {
                productDisplayName : name,
                category,
                created_by:user.uid,
                subCategory:subcategory,
                gender,
                price,
                link,
                filename:imgname
              });
              alert("Data uplodaded")
               router.push('/')     
        }catch(err){
            console.log(err.message)
        }

    }
    return (
        <div>


            <div className={styles.main}>
                <div className={styles.sub}>
                    <h2>Welcome To Upload Section</h2>
                    <h3>Fill the following details to upload your product on Drippy</h3>
                    <div className={styles.first}>
                        <input className={styles.inp} placeholder='Enter name' onChange={(e)=>setName(e.target.value)} />
                        <input className={styles.inp} placeholder='Select Category' onChange={(e)=>setCategory(e.target.value)}/>
                    </div>

                    <div className={styles.first}>
                        <input className={styles.inp} placeholder='Enter subcategory' onChange={(e)=>setSubcategory(e.target.value)} />
                        <input className={styles.inp} placeholder='Select Gender' onChange={(e)=>setGender(e.target.value)}/>
                    </div>

                    <div className={styles.first}>
                        <input className={styles.inp} placeholder='Enter price' onChange={(e)=>setPrice(e.target.value)} />
                        <input className={styles.inp} placeholder='Choose masterCategory'  onChange={(e)=>setmasterCategory(e.target.value)}/>
                    </div>

                    <div className={styles.first}>
                        <input className={styles.inp} placeholder='Enter articleTyle' onChange={(e)=>setarticleType(e.target.value)} />
                        <input className={styles.inp} placeholder='Choose File' type="File" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>

                    <button onClick={handleClick} className={styles.submitbtn}>Submit</button>


                </div>
            </div>

            

        </div>
    )
}

export default upload
