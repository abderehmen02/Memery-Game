import React , {useEffect , useState } from 'react'
import {HotelDetais , HotelPhotos , HotelReviews}  from './data'
import {useParams} from 'react-router-dom'
import PhotosTabs from './photoReviewingtabs'
import './index.css'
import MyTabs from './mytabs'
function HotelDetails() {
  const [HotelDetailsState, setHotelDetailsState] = useState(null)
  const [HotelReviewsState  , setHotelReviewsState] = useState(null)
  const [HotelPhotosState, setHotelPhotosState] = useState(null)
    const params = useParams()
    const HotelId = params.id 
const getHotelDetails =  ()=>{
  console.log('this is the hotel details page')
//     if(localStorage.getItem('hotelDetails')){
// setHotelDetailsState( JSON.parse(localStorage.getItem('hotelDetails')))
// console.log('i got the response from the local for the hotael details')
// }
// else 
    HotelDetais(HotelId).then(res =>{
  console.log(res)
  setHotelDetailsState( res)
  console.log('i got the data from the server');
        // localStorage.setItem('hotelDetails' , JSON.stringify(res))
    }).catch(err =>{
        console.log(err)
    }
    )
// if(localStorage.getItem('hotelReviews')){  
//   setHotelReviewsState(JSON.parse(localStorage.getItem('hotelReviews')))
//   console.log(JSON.parse(localStorage.getItem('hotelReviews')))
//  }
// else   
HotelReviews(HotelId).then(res =>{
    // localStorage.setItem( 'hotelReviews' ,  JSON.stringify(res))
    setHotelReviewsState(res)
    console.log(res)
    console.log('i got the data from the server');
  })



// if(localStorage.getItem('HotelPhotos')){    
//   setHotelPhotosState( JSON.parse(localStorage.getItem('HotelPhotos')))
//   console.log(JSON.parse(localStorage.getItem('HotelPhotos')))
//   console.log('i got the response from the local for the hotel photos');
//   }
//   else       
  HotelPhotos(HotelId).then(res =>{
    setHotelPhotosState(res)
      // localStorage.setItem( 'HotelPhotos' ,  JSON.stringify(res))
      console.log(res)
      console.log('i got the data from the server');
    })
  }
useEffect(() => {
getHotelDetails()
}, [])
console.log('this is the horel details')
console.log(HotelDetailsState)

return  <div className="hotelDetailComponent" > 
  <h1 className="hotelName" >  { HotelDetailsState && HotelDetailsState.name}</h1>
<MyTabs data={HotelDetailsState} />
<PhotosTabs data={{photos: HotelPhotosState , reviews : HotelReviewsState}} />
</div> 
}

export default HotelDetails
