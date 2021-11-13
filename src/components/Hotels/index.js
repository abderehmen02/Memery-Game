import React , {useState , useEffect , useReducer , useCallback} from 'react'
import './index.css'
import Fab from '@material-ui/core/Fab'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from 'google-map-react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import data from './data'
import { Skeleton } from 'react-skeleton-generator'
import {useHistory , Link} from 'react-router-dom'
function City() {
const myHistory = useHistory()
const [MapMarkerLat, setMapMarkerLat] = useState('51.509865')
const [PriceMin, setPriceMin] = useState(0)
const [PriceMax, setPriceMax] = useState(1000000)
const [MapMarkerLon, setMapMarkerLon] = useState('-0.118092')
const [state, dispatch] = useReducer(reducer, {status: false , Hotels: []})
const showPosition = (position) =>{
    // data(position.coords.latitude , position.coords.longitude).then(res =>{
   // })
setMapMarkerLat(position.coords.latitude.toString() )
setMapMarkerLon(position.coords.longitude.toString() )
}
function reducer (state , action){
    switch (action.type) {
        case 'Add-hotels':  return ({ Hotels : action.Hotels , status : true })
        case 'error' :  return ({  Hotels :[] , status : false})  ;   
        case 'loading' :  return ({Hotels : ['loading'] , status : false })   
        default:  return ({ Hotels : [] , status :false })
    }
}
const PositionError = (err)=>{
    // data().then(res =>{
    //     console.log(res)
    //     setHotels(res.searchResults.results)
    // })
    setMapMarkerLat('59.955413')
    setMapMarkerLon('30.337844')
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition , PositionError);
  } else {
   alert("Sorry ... ! this browser doesn't support location  ")
  } 
}
const getHotels = ()=>{
//   if(localStorage.getItem('hotelsData')){
//     console.log( localStorage.getItem('hotelsData'));
//     dispatch({type: 'Add-hotels' , Hotels : JSON.parse( localStorage.getItem('hotelsData') ) })
//     console.log('i got the data from localStorage')
//   }
// else
 dispatch({type: 'loading' , Hotels: [] })
data(MapMarkerLat  , MapMarkerLon , PriceMax , PriceMin ).then(res =>{
  console.log(res)
  console.log('i got the data from the serqver')
localStorage.setItem('hotelsData' , JSON.stringify( res.searchResults.results) )
    dispatch({type: 'Add-hotels' , Hotels : res.searchResults.results })
    }).catch(err =>{
dispatch({type: 'error' , Hotels: []})
console.log('there is an error ')
console.log(err)
    })

}
const myLocation = ()=>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition , PositionError );
  } else {
   alert('sorry this browser does not support location')
}
}
const RatingComponent =({rate})=>{
const stars = [ 1 , 2 , 3 , 4 , 5]
return <div className='ratingComponent' >  
{ stars.map(item => {return <div> {item <= Math.floor(rate) ? <StarIcon/> :(  rate > item - 1 && Math.floor(rate) ==  item -1 ? <StarHalfIcon/> : <StarBorderIcon/> ) }  </div>} ) }
</div>
}
const HotelsComponent =  useCallback( ()=>{
if(state.status  && state.Hotels.length){
return <div  className='hotelsComponent' > 
 { state.Hotels.map(item => <div className='HotelComponent'>
<div className='info' > 
{/* <div>  {item.messaging.name} </div> */}
{/* item.optimizedThumbUrls.srpDesktop */}
<span>{item.address.countryName}</span>
<span> {item.address.locality}</span>
<span>{item.address.streetAddress}</span> 
{/* <div style={{ backgroundImage: `url("https")`  }} className='image'  ></div> */}
<span> {item.ratePlan.price.current}</span>
</div>
<div className='HotelThumbnail' style={{backgroundImage: `url(${item.optimizedThumbUrls.srpDesktop})`}}  > </div>
<div className='footer' >
<button onClick={()=>{myHistory.push(`/hotelDetails/${item.id}`)}} >More Details </button>
<RatingComponent rate={item.guestReviews.rating} />
     </div>   
</div> ) }</div> 
}
else if(state.status  && !state.Hotels.length) return  <div className='hotelErr'> <h1 > it seems that there  is no hotel in this place</h1></div>
else if(!state.status &&  state.Hotels.length ) return (<Skeleton.SkeletonThemeProvider animation="opacity" >
<div className='HotelComponent hotelComponentSkeleton'>
<div className='info' > 
<span style={{ display: 'flex' , alignItems:'center' , justifyContent: 'center' }} > <Skeleton an width="150px" height="20px" /> </span>
<span style={{ display: 'flex' , alignItems:'center' , justifyContent: 'center' }} > <Skeleton width="150px" height="20px" /> </span>
<span style={{ display: 'flex' , alignItems:'center' , justifyContent: 'center' }} > <Skeleton width="150px" height="20px" /> </span>
<span style={{ display: 'flex' , alignItems:'center' , justifyContent: 'center' }} > <Skeleton width="150px" height="20px" /> </span>
</div>
<div className='HotelThumbnail'   >
  <Skeleton animation="opacity" width="100%" height="100%" />
</div>
<div className='footer' >
<div className="footerSkeletonItem" ><Skeleton width="100%" height="20px" />  </div>
<div className="footerSkeletonItem" > <Skeleton width="60%" height="20px" />  </div>
</div>   
</div>
</Skeleton.SkeletonThemeProvider>
)
else if(!state.status && !state.Hotels.length) return <div className='hotelErr' > <h1  > error !! can't fetch the data  </h1></div>
else return <h1>some error happened</h1>
} , [state] )
useEffect(() => {
  getLocation()
   getHotels()
}, [])
return ( 
<div className='HotelsComponent' >
<h1>Hotels </h1>
<div className='containerInfoMap' >
      <div   className="reactMap" > <GoogleMapReact
        onClick={ (e)=>{  setMapMarkerLat(e.lat.toString()) ; setMapMarkerLon(e.lng.toString()) } }
       defaultCenter={{
      lat: Number(MapMarkerLat),
      lng: Number(MapMarkerLon)}}
          defaultZoom={11}
        >
<div     lat={Number(MapMarkerLat)}
            lng={Number(MapMarkerLon)} >
          <RoomIcon
          /> </div>
        </GoogleMapReact></div>
        <div className='parameters' >
  <SettingsBackupRestoreIcon onClick={myLocation} />
  <Fab variant='extended' onClick={getHotels} >
Search Hotels
<SearchIcon/>
  </Fab>
  <input type='number' value={PriceMin} onChange={(e)=>{setPriceMin(e.target.value)}} />
  <input type='number' value={PriceMax} onChange={(e)=>{ setPriceMax(e.target.value) }} ></input>
  </div>
  <div>
  <HotelsComponent/>
</div></div></div>
    )
}

export default City
