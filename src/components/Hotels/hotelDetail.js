import React , {useState , useEffect} from 'react'
import {useParams  } from 'react-router-dom'
import data ,  {HotelPhotos , HotelDetais ,  HotelReviews } from './data'
function HotelDetail() {
const params = useParams()

const getPhotos = ()=>{
   HotelPhotos(params.geoId).then(res =>{
           console.log('photos')
        console.log(res)
    } ).catch(err =>{
        console.log(err)
    })
}
const getHotelDetails = ()=>{
    console.log('info')
    HotelDetais(params.geoId).then(res =>{
        console.log(res)
    }).catch(err =>{
        console.log(err)
    })
}
const getReviews = ()=>{
    HotelReviews(params.geoId).then(res =>{
          console.log('reviews')
        console.log(res)
    }).catch(err =>{
        console.log(err)
    })
}


useEffect(() => {
getReviews()
getPhotos()
getHotelDetails()
}, [])
    return (
        <div>
this is the hot el detail             
        </div> 
    )
}

export default HotelDetail
