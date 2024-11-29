import React, {useState, useEffect} from 'react'
import axios from 'axios'
import classes from './Home.module.css'

import Banners from '../../components/banners/Banners'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import { env } from '../../env'

const Home = ()=>{

    const [banners, setBanners] = useState([])

    useEffect(()=>{
        axios
        .get(`${env.REACT_APP_RUNTIME_URL}/banners`)
        .then((response)=>{
            setBanners(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    

    return (
        <>
            <main className={classes.home__container}>
                <h1>Test</h1>
                <Banners banners={banners}/>
                <CategoryCard />
            </main>

        </>
    )
}


export default Home;
