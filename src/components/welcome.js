import React from 'react'
import { BrowserRouter as Router,Link , useParams,  Route, Switch} from 'react-router-dom'
import { Button  } from '@material-ui/core'
import { motion } from 'framer-motion'
import logo from '../Images/logo.png'
import '../stylesheets/welcome.css'
function welcome() {
 
    return (
        <motion.div initial={{y: '100vh'}} animate={{y: 0}} transition={{duration: 0.5}} className='welcome' >
       <section className='welcomeBackground' >
    <h2>
       Hello October!
      </h2>
 
     <div className="leaf mobileHide" >
      <div>  <img src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png" height="75px" width="75px"/></div>
      <div><img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png" height="75px" width="75px"/></div>
      <div>  <img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png" height="75px" width="75px" /></div>
      <div><img  src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png" height="75px" width="75px"/></div>
       <div> <img src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png" height="75px" width="75px"/></div>
     <div>   <img src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png" height="75px" width="75px"/></div>
     <div><img src="http://cdn.clipart-db.ru/rastr/autumn_leaves_025.png" height="75px" width="75px"/> </div>
            
     </div> 
     
     <div className="leaf leaf1 mobileHide " >
     <div>  <img src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png" height="75px" width="75px"/></div>
      <div><img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png" height="75px" width="75px"/></div>
      <div>  <img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png" height="75px" width="75px" /></div>
      <div><img  src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png" height="75px" width="75px"/></div>
       <div> <img src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png" height="75px" width="75px"/></div>
     <div>   <img src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png" height="75px" width="75px"/></div>
     <div><img src="http://cdn.clipart-db.ru/rastr/autumn_leaves_025.png" height="75px" width="75px"/></div>
            
     </div>
     
     <div className="leaf leaf2 mobileHide">
     <div>  <img src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png" height="75px" width="75px"/></div>
      <div><img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png" height="75px" width="75px"/></div>
      <div>  <img src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png" height="75px" width="75px" /></div>
      <div><img  src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png" height="75px" width="75px"/></div>

       <div> <img src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png" height="75px" width="75px"/></div>
     <div>   <img src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png" height="75px" width="75px"/></div>
     <div><img src="http://cdn.clipart-db.ru/rastr/autumn_leaves_025.png" height="75px" width="75px"/></div>
            
     </div>
     </section>
{/* the actual page */}
          <motion.div
  className='myLogo' 
  style={{
      backgroundImage: `url(${logo})`
  }}
    animate={{
      scale: [1, 1.2, 1.2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{
        duration: 1 ,
        delay: 0.5
    }}> <motion.div  
    
        animate={{
      scale: [1, 1.2, 1.2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{
        duration: 1 ,
        delay: 0.5
    }}

    className='logoOverlay' ></motion.div> </motion.div> 
          <div className='welcomeTittle'>  welcome to CHAT WX  </div>
          <div className='buttons'  >
     <div className='btn' >       <Button size='large'   variant='contained' color='secondry' ><Link style={{textDecoration : 'none'}} to='/SignIn'>Sign In</Link></Button></div>
      <div className='btn' >      <Button size='large' variant='contained' color='primary' ><Link  style={{textDecoration: 'none'}} to='/SignUp'>Sign Up</Link></Button></div>
        </div></motion.div>
    )
}

export default welcome
