import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
// import fetch from 'node-fetch';

import { db, firebase } from "@/config/firebase";
import { useAuth } from "@/firebase/context";
import { useCart } from "hooks/cart.hook";
import { removeFavorite, addFavorite, addToCart } from "@/firebase/product";
import { collection, doc, documentId, query, where, getDocs } from "firebase/firestore";

import styles from "./product.module.scss";

import Layout from "components/Layout";
import Button from "@/components/Button";
import HeartIcon from "@/icons/heart";
import HeartFilled from "@/icons/heart-filled";
import ErrorPage from "pages/404";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard/product-card";

export default function Product({ data, query }) {
  if (!data.productData.productDisplayName) {
    return <ErrorPage />;
  }

  const [selectedSize, setSelectedSize] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isFavorite, setFavorite] = useState(false);
  const [recommendData, setRecommendData] = useState();

  const { user, loading } = useAuth();

  const router = useRouter();

  // const {
  //   seller,
  //   link,
  //   price,
  //   product_name,
  //   sale_price,
  // } = data;

  const product_data = data.productData
  const prod_id = product_data.id
  const product_name = product_data.productDisplayName
  const price = product_data.price + 142
  const sale_price = product_data.price
  const image = product_data.link
  const gender = product_data.gender
  const masterCategory = product_data.masterCategory
  const subCategory = product_data.subCategory
  const sellers = product_data.sellers

  const information = product_name + " " + gender + " " + masterCategory + " " + subCategory + " " + sellers


  const id = query?.product;

  useEffect(() => {
    user && setFavorite(user.favorites.includes(id));
  }, [user]);

  const removeEvent = (id) => {
    removeFavorite(id);
    setFavorite(false);
  };
  const addEvent = (id) => {
    addFavorite(id);
    setFavorite(true);
  };

  const favoriteEvent = () => {
    user
      ? isFavorite
        ? removeEvent(id)
        : addEvent(id)
      : typeof window !== "undefined" && router.push("/login");
  };

  const cart = useCart().data;

  console.log(cart);

  const addCartEvent = () => {
    if (!user && !loading && typeof window !== "undefined")
      router.push("/login");
    else {
      if (selectedSize) {
        const newCart = {
          ...cart,
          [id]: cart.hasOwnProperty(id)
            ? [...cart[id], selectedSize]
            : [selectedSize],
        };
        addToCart(newCart);
      }
      if (sizes?.length === 0) {
        const newCart = {
          ...cart,
          [id]: cart.hasOwnProperty(id) ? [...cart[id], "-"] : ["-"],
        };
        addToCart(newCart);
      }
    }
  };

  // const getProds = async () => {

  //   const prodIds = await fetch(`http://localhost:5000/recommend?name=${image}&id=${prod_id}`,{
      
  //   }).then((res) => res.json())
  //   console.log(`http://localhost:5000/recommend?name=${image}&id=${prod_id}`)
  //   console.log(prodIds.result)
    // await db  
    // .collection("Products")
    // .where(firebase.firestore.FieldPath.documentId(), "in", prodIds.result)
    // .get()    
    // .then(function (querySnapshot) {
    //   const products = querySnapshot.docs.map(function (doc) {
    //     return { id: doc.id, ...doc.data() };
    //   });
    //   setRecommendData(products)
    // })
    // .catch((e) => (error = e));
    // const products = []
    // prodIds.result.forEach(async p => {      
    //   await db.collection("Products").doc(p).get().then((doc) => {
    //     products.push({
    //       id: doc.id,
    //       ...doc.data()
    //     })
    //   })
    // })
    // db.collection("Products").doc(prodIds.result).get()
    // .then(function (querySnapshot) {
    //     products = querySnapshot.docs.map(function (doc) {
    //       return { id: doc.id, ...doc.data() };
    //     });
    //     // recommendedProducts = products;
    //   })
    //   .catch((e) => (error = e));
    
    // .then((d) => {
    //   products.push({
    //     id: d.id,
    //     ...d.data()
    //   })
    // })
  //   console.log(products)
  //   setRecommendData(products)
  // }

  // useEffect(() => {
  //     getProds()
  // },[])

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img src={image} loading="lazy" />
            </div>
            {/* <div className={styles.smallPhotos}>
              {photos.slice(0, 5).map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    className={styles.smallPhoto}
                    style={{ borderColor: selectedPhoto === index && "black" }}
                    onClick={() => setSelectedPhoto(index)}
                    loading="lazy"
                  />
                );
              })}
            </div> */}
            <hr />
          </div>
          <div className={styles.productInfos}>
            <div className={styles.header}>
              <h1 className={styles.productTitle}>{product_name || ""}</h1>
              <Link href={`/brand/${sellers}`}>{sellers || ""}</Link>
            </div>
            <span className={styles.priceText}>{price || 0}$</span>
            <div className={styles.saleContainer}>
              <span className={styles.saleText}>{sale_price || 0}$</span>
              <span className={styles.savedText}>
                {"(You will be saved " + (price - sale_price) + "$!)"}
              </span>
            </div>
            {/* <hr /> */}
            {/* <div className={styles.sizes}>
              <h4 className={styles.sizesText}>Sizes</h4>
              {sizes.map((size) => {
                return (
                  <button
                    key={size}
                    className={styles.sizeButton}
                    style={{
                      borderColor: selectedSize === size && "black",
                      fontWeight: selectedSize === size && "bold",
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div> */}
            <hr />
            <div className={styles.buttons}>
              <Button style={{ margin: 0 }} onClick={addCartEvent}>
                Add to Cart
              </Button>
              <button className={styles.favButton} onClick={favoriteEvent}>
                {isFavorite ? (
                  <HeartFilled width={24} height={24} />
                ) : (
                  <HeartIcon width={24} height={24} />
                )}
              </button>
            </div>
            <hr />
            <div className={styles.infoContainer}>
              <h4 className={styles.sizesText}>Product Information</h4>
              <p className={styles.infoText}>{information}</p>
            </div>
          </div>
        </main>
        <hr />
        <div className={styles.recommendContainer} >
        <h2>Similar Products</h2>
        <div className={styles.products}>
            {!loading && data.recommendedProducts &&
              data.recommendedProducts.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    brand={product.sellers}
                    name={product.productDisplayName}
                    image={product.link}
                    price={product.price + 142}
                    sale_price={product.price}
                    favorite={user?.favorites?.includes(product.id)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

Product.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};
  let productData = {}
  let recommendedProducts = {}
  await db
    .collection("Products")
    .doc(query.product)
    .get()
    .then(function (doc) {
      productData = { id: doc.id, ...doc.data() };
    })
    .catch((e) => (error = e));

  // let recommendedProductsIds = ['9092', '10035','10279','10692']  
 
    const res = await fetch(`http://localhost:5000/recommend?name=${productData.link}&id=${productData.id}`)
    const recommendedProductsIds = await res.json()
    console.log(recommendedProductsIds.result)
    const recommendIdStrings = []
    recommendedProductsIds.result.forEach(r => {
      recommendIdStrings.push(r.toString())
    })
    console.log("string ids, ",recommendIdStrings)
    // recommendedProductsIds.result.forEach(async r => {
    //   console.log(r)
    //   await db.collection("Products").doc(r).get().then((d) => console.log("data #: ", d))
    // })

//     const refs = recommendedProductsIds.result.map(id => db.doc(`Products/${id}`))
//     const snap = await db.getAll(...refs)
// const products = snap.docs.map(function (doc) {
//           return { id: doc.id, ...doc.data() };
//         });
//         recommendedProducts = products


    await db  
    .collection("Products")
    .where(firebase.firestore.FieldPath.documentId(), "in", recommendIdStrings)
    .get()    
    .then(function (querySnapshot) {
      const products = querySnapshot.docs.map(function (doc) {
        return { id: doc.id, ...doc.data() };
      });
      recommendedProducts = products;
    })
    .catch((e) => (error = e));

    console.log(recommendedProducts)

    // const snap = await getDocs(query(collection(db, 'Products'), where(documentId(), "in", recommendedProductsIds.result)))
    // const products = snap.docs.map(function (doc) {
    //       return { id: doc.id, ...doc.data() };
    //     });
    //     recommendedProducts = products
    // console.log(data)

  data = {
    productData,
    recommendedProducts
    // recommendedProductsIds: recommendedProductsIds.result
  }

  console.log(data)

  return {
    data,
    error,
    query,
  };
};  
