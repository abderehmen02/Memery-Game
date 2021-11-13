import React , {useState , useEffect , useRef}from 'react'
import fetchWeather from './data'
import AirplayIcon from '@material-ui/icons/Airplay';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ContactlessIcon from '@material-ui/icons/Contactless'
import ReorderIcon from '@material-ui/icons/Reorder';
import Dialog from '@material-ui/core/Dialog'
import Rain from '../../Images/Rain.jpg'
import Clouds from '../../Images/Clouds.jpg'
import { Skeleton } from 'react-skeleton-generator'
import Clear from '../../Images/Clear.jpg'
import './index.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
let temperaryOptions = []
function Index() {
const [CityName, setCityName] = useState('')
const [Options, setOptions] = useState([])
const [CityNameWeather, setCityNameWeather] = useState(false)
const [Details, setDetails] = useState(false)
const CityInput = useRef(null)


 // componenets
const DetailsComponent = () => {
  return <div className='detailsComponents' > 
    <nav className='DetailsNav' ><span onClick={()=>{setDetails('wind')}} >wind <ContactlessIcon/> </span><span  onClick={()=>{setDetails('city')}}  >City <LocationCityIcon/> </span><span onClick={()=>{setDetails('temp')}} >temperature <AirplayIcon/> </span><span onClick={()=>{setDetails('others')}} >others <ReorderIcon/> </span></nav>
    {Details === 'wind' && (<div className='DetailsInfo' >
   <div> degree:  {CityNameWeather.wind.deg}  </div>
   <div> speed: {CityNameWeather.wind.speed}  </div>
    </div> )}
    {Details === 'city' && <div  className='DetailsInfo' >
      <div>  Grand Level : {CityNameWeather.main.grnd_level}</div>
      <div>  Sea Level :{CityNameWeather.main.sea_level}</div>
      <div>  Latitude : {CityNameWeather.coord.lat}</div>
        <div> Longitude: { CityNameWeather.coord.lon }</div>
       <div> Country : {CityNameWeather.sys.country} </div>
    </div> }
{Details === 'temp' && <div  className='DetailsInfo' >
 <div>   Temperature : { Math.round( eval( CityNameWeather.main.temp - 273 )) }</div>
   <div> Maximum Temperature : {  Math.round( eval (CityNameWeather.main.temp_max  - 273))}</div>
<div>    Minimum Temperature : {  Math.round( eval (CityNameWeather.main.temp_min -273 ))}</div>
</div>}
{Details === 'others' && <div  className='DetailsInfo' >
<div>  Humidity: {CityNameWeather.main.humidity}</div>
 <div> pressure: {CityNameWeather.main.pressure} </div>
<div>Weather Info : {CityNameWeather.weather[0].description}</div>
</div>
}  
    </div>
}

const  OptionsComponent = () =>{
    if(Options && !CityNameWeather ){
     
    let newArr = Options.slice(0 , 6)
    return <div> {newArr.map(item =>{
        return <div> {item.name} </div>
    })} </div>
}
else return <div>  </div>
}

// effects 

useEffect(() => {
    CityInput.current.focus()
}, [])
const CityNameChanged = (e) =>{
    setOptions([])
    setCityNameWeather(null)
setCityName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)) 

fetchWeather(e.target.value).then(data =>{
    if(data.weather[0].main ){
    setCityNameWeather(data) 
}
}).catch(err =>{
  console.log('error:' + err)
    setCityNameWeather(false)
})
}
return (
     <div className='weatherComponent'>

    <div className='navBar' >  </div>
<div className='weatherTitle' > Weather</div>
<div className='infoInput' >
<input placeholder='Type A City Name' className='weatherCityInput' ref={CityInput} value={CityName} onChange={(event) => {CityNameChanged(event)}} ></input> 
<OptionsComponent/>
{
CityName === '' || CityNameWeather === false ? <div className='errContainer' > <div className='errTitle' > Sorry </div> <div className='errInfo' > No City Found </div> </div> :  
  (  CityNameWeather?
    <div className='weatherInfo'  >
    <div className='weatherInfoBk' style={{backgroundImage: `url(${CityNameWeather.weather[0].main === 'Clear'? Clear : ( CityNameWeather.weather[0].main === 'Clouds'? Clouds : Rain  )})`   }}></div>
  <div className='weathrInfoItem temp' >  tempereture: <span className='tempInfo info' > { Math.round(  eval( (CityNameWeather.main.temp - 273 ) ) ) } </span>
   </div>
  <div className='weathrInfoItem  weatherGeneralInfo' ><span className='weatherInfoGeneral info ' >   weather: {CityNameWeather.weather[0].main } </span> </div>
    <button onClick={()=>{setDetails('wind')}} className='detailsButton' >See More ...</button>
    </div> :<div className='weatherInfo' style={{backgroundColor: 'rgb(180, 180, 180)'}} >
     <Skeleton.SkeletonThemeProvider> 
   <div className='skeletonContainer'>
    <Skeleton
    style={{marginRight: 10}}
      width="145px"
      height="15px"
      borderRadius="10px"
      />

    <Skeleton
      width="45px"
      height="15px"
      borderRadius="10px"
    />
  
  </div>
<div className='skeletonContainer'>
    <Skeleton style={{justifySelf: 'flex-start' , marginRight: 20  }}
      width="100px"
      spaceBetween='20px'
      height="15px"
      borderRadius="10px"
      />

    <Skeleton
      width="70px"
      height="15px"
      borderRadius="10px"
      style={{justifySelf: 'flex-end' , marginLeft: 10 }}
    />
  </div>
  <Skeleton width='200px' height='25px' />
  {/* <div className='weathrInfoItem  weatherGeneralInfo' >   <Skeleton  width='105px' height='15px'/> <Skeleton width='150px' height='15px' /> </div> */}

       {/* <div>
        <Skeleton.SkeletonThemeProvider>
 
  <Skeleton  width='170px' height='15px'/>
   <Skeleton  width='105px' height='15px'/> 
</Skeleton.SkeletonThemeProvider>
        </div> */}    </Skeleton.SkeletonThemeProvider>
</div>     )   
}
</div>
<div className='weatherDetails' >
<Dialog open={Boolean(Details)} onClose={()=>{setDetails(false)}} >
<DetailsComponent/>
</Dialog>
</div>
        </div>)
}

export default Index