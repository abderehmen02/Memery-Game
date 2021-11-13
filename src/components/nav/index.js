import React from 'react'
import './index.css'
import {Link , useHistory , useLocation } from 'react-router-dom'
import {makeStyles} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import CloudIcon from '@material-ui/icons/Cloud';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
function Nav() {
    const useStyles = makeStyles({
    Normal: {
backgroundColor: 'white'
    } ,
    LinkIn : {
        backgroundColor: 'aqua' ,
        borderWidth: 2 ,
        borderColor: 'blue' ,
        borderStyle: 'solid' ,
        boxShadow: '3px 2px 5px blue   , -3px -2px 6px black'
    }    
    })
const classes = useStyles()
const location  = useLocation()
    return (
<div className='nav' >
<div>
<Link to='/weather' style={{textDecoration: 'none'}} >
    <Fab variant="extended"  className={location.pathname === '/weather' ? classes.LinkIn : classes.Normal } >
<CloudIcon /> 
Weather
    </Fab>
</Link>
    </div>
    <div>
<Link to='/Map'  style={{textDecoration: 'none'}}  >    <Fab variant="extended" className={location.pathname === '/Cities' ? classes.LinkIn : classes.Normal } >
<LocationCityIcon/>
Map
    </Fab></Link></div>
    <div>
    <Link to='/Hotels' style={{textDecoration: 'none'}} >
 <Fab  className={location.pathname === '/Hotels' ? classes.LinkIn : classes.Normal }  variant="extended">
 <LocalHotelIcon/>
 Hotels 
    </Fab>
    </Link>
    </div>
</div>
    )
}

export default Nav
