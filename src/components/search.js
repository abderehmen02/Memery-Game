import React , {useState , useEffect } from 'react'
import { duration, Input } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import '../stylesheets/search.css'
// import imgone from '../Images/1.jpg'
// import imgtwo from '../Images/2.jpg'
// import imgtree from '../Images/3.jpg'
// import imgfour from '../Images/4.jpg'
// import imgfive from '../Images/5.jpg'
// import imgsix from '../Images/6.png'
// import imgseven from '../Images/7.jpg'
// import imgeight from '../Images/8.jpg'
import logo from '../Images/logo.png'
import { motion } from 'framer-motion';
function search() {
    // hooks
const [UserSearched, setUserSearched] = useState([])
const history = useHistory()
// effects
useEffect(() => {
    db.collection('users').orderBy('timestamp').limit(3).get().then(
(users)=> {users.docs.forEach(user =>{
    setUserSearched(value=>{
    return [...value , user]
})})
}   
)
}, [])



    //function declaration
const research = (event)=>{
    setUserSearched([])
db.collection('users').where('userName' , '==' , event.target.value).get().then(
(users)=> {users.docs.forEach(user =>{
    setUserSearched(value=>{
    return [...value , user]
})})
}   
)
}
    return (
        <motion.div className='searchPage' initial={{y: '100vh'}} animate={{y: 0 , transition:{duration: 0.5} }} >
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
{/* <motion.div animate={{x: ['0vw' ,'-100vw' ,'-200vw' ,'-300vw' ]  }} transition={{times: [ 5 , 5 , 5 , 5]}}  className='imageSlider'  > <div className='slider' style={{ backgroundImage: `url(${imgone})` }} ></div> <div className='slider' style={{ backgroundImage: `url(${imgtwo})` }}  > </div><div className='slider' style={{ backgroundImage: `url(${imgtree})` }} ></div> <div className='slider' style={{ backgroundImage: `url(${imgfour})` }}  > </div><div className='slider' style={{ backgroundImage: `url(${imgfive})` }} ></div> <div className='slider' style={{ backgroundImage: `url(${imgsix})` }}  > </div><div className='slider' style={{ backgroundImage: `url(${imgseven})` }} ></div> <div className='slider' style={{ backgroundImage: `url(${imgeight})` }}  > </div> </motion.div> */}
<div className='searchBar'> <Input onChange={research} startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          } ></Input> <SearchIcon/> </div>     
<div >  
{UserSearched.map(user =>{
    return <motion.div  className='users' initial={{x: '100vw'}} animate={{x: 0 , transform: {duration: 0.5 , delay: 0.5}}} className='user' onClick={()=>{ history.push(`/acount/${user.id}`)}}>
     {user.data().FirstName}  {user.data().lastName} 
     </motion.div>
})}
</div>
        </motion.div>
    )
}
export default search
