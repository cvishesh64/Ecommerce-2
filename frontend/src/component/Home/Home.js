import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction'
import { useDispatch } from 'react-redux'



const product={
    name:"Blue T shirt",
    images:[{url:"https://qph.cf2.quoracdn.net/main-qimg-cd3b3a92caa8b2b98aec0fe4b6bead54-lq"}],
    price:"₹3000",
    _id:"Vishesh"
}

const Home = () => {
  const dispatch=useDispatch()
  

  useEffect(()=>{
   dispatch(getProduct())
  },[dispatch])

  return (
    <Fragment>
      <MetaData tilte="HOMEPAGE IS WORKING"/>

        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse/>
              </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
       <div className="container" id="container"> <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} />
        <Product  product={product} /></div>
    </Fragment>
  )
}

export default Home