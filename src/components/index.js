import React from "react";
import Weather from './weather'
import './index.css'
import Hotels from './Hotels'
import Map from './map'
import Nav from './nav'
// import CityWeather from "./weather/CityWeather";
import {
  BrowserRouter as Router,
  Switch,
  useLocation ,
  Route,
  useHistory,
  Link
} from "react-router-dom";
import { HotelDetails } from "./Hotels/data";
import HotelDetailsComponent from "./Hotels/HotelDetails"


function App() {
    const location = useHistory()
    return (
        <div>
            <Router  >
            <div>
<div className='weatherBk' style={{height: window.screen.height}} ></div>
<Nav/>
<Switch  >
<Route path='/Map' >
<Map/>
</Route>
<Route path='/hotelDetails/:id' >
<HotelDetailsComponent/>
</Route>
<Route path='/Hotels' > <Hotels/> </Route>
 <Route path='/'  >
<Weather/>
                    </Route>
         
</Switch>
</div>
            </Router>
        </div>
    )
}

export default App
