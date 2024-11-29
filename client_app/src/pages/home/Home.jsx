import React, {useState, useEffect} from 'react'
import axios from 'axios'
import classes from './Home.module.css'

import Banners from '../../components/banners/Banners'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import { env } from '../../env'
import { data } from '../../data'

const Home = ()=>{

    const [banners, setBanners] = useState([])

    useEffect(()=>{
        axios
        .get(`${env.REACT_APP_RUNTIME_URL}/banners`)
        .then((response)=>{
            if(response){
                setBanners(response.data)
            }
            else {
                 setBanners(data.banners)
            }
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    

    return (
        <>
            <main className={classes.home__container}>
                <Banners banners={banners}/>
                <CategoryCard />
            </main>

        </>
    )
}


export default Home;
