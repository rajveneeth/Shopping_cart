import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { env } from '../../env'
import classes from './CategoryCard.module.css'
import Button from '../button/Button'
import { data } from '../../data'



const CategoryCard = () => {

    const history = useHistory();
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        axios
        .get(`${env.REACT_APP_RUNTIME_URL}/categories`)
        .then((response)=>{
            if(response){
                setCategories(response.data.sort((first, second) => first.order - second.order))
            }
            else{
                setCategories(data.categories.sort((first, second) => first.order - second.order))
            }
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    console.log(categories)
 
    return (
        <div className={classes.category_section}>
            {
                categories.map((category)=> {
                    return (

                        category.enabled ? (
                            <div className={classes.category} key={category.key}>
                                    <div className={classes.category_image}>
                                        <img src={category.imageUrl} alt={category.name} />
                                    </div>

                                    <div className={classes.category_container}>
                                        <h2>{category.name}</h2>
                                        <p>{category.description}</p>
                                            <button className={classes.button}
                                                onClick={() => history.push(`/Products?product=${category.id}`)}
                                            >
                                                
                                                {category.name}
                                            </button>
                                    </div>
                            </div>
                            ): null
                    )
                }
                )
            }

        </div>
    )
}

export default CategoryCard