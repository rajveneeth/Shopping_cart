import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory, useLocation} from 'react-router-dom'
import { env } from '../../env'
import ProductItems from '../../components/ProductItems/ProductItems'
import Menubar from '../../components/Menubar/Menubar'
import Dropdown from '../../components/dropdown/Dropdown'

import classes from './Products.module.css'
import { data } from '../../data'

const Products = ()=>{

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])

    const history =useHistory()
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search);
    const productId = searchParams.get("product");

    useEffect(()=>{
        axios
       .get(`${env.REACT_APP_RUNTIME_URL}/products`)
       .then((response) => {
        if(response){
            setProducts(response.data);
        }
        else {
            setProducts(data.products);
        }
        
       })
       .catch((error) => {
         console.log(error);
       });
    },[])

    useEffect(() => {
        axios
          .get(`${env.REACT_APP_RUNTIME_URL}/categories`)
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {});
    }, []);

console.log(productId)
    useEffect(()=>{
        setAllProducts(()=>{
            if(productId === null){
                return products
            }
            else {
                return products.filter(
                  (product) => product.category === productId
                );
              }
        })
    },[productId,products ])

    const handleclick = (id)=> {
        history.push(`/Products?product=${id}`)
    }

    const handleDropdownclick =(e) =>{
        const id = e.target.value;
        if(id === "Default"){
            history.push('/Products')
        }
        else{
            history.push(`/Products?product=${id}`);
        }
        
    }

    return (
        <div className={classes.product__container}>
            <Menubar categories={categories} handleclick={handleclick} className={classes.menubar__container}/>
            <div className={classes.product__dropdown}>
                <Dropdown categories={categories} handleDropdownclick={handleDropdownclick} />
            </div>
            <ProductItems products={allProducts}/>
            
        </div>
    )
}


export default Products;
