import React , {useState} from 'react'
import { motion , AnimatePresence , useCycle , useAnimation } from 'framer-motion'
import { Button } from '@material-ui/core'
function index() {
    const [exit, setExit] = useState(false)
    const animationText = useAnimation()
const myVarients = {
    hidden: {
        x: '100vw' ,
        opacity: 0 
    } ,
    visible: {
x: 0 ,
opacity: 1 , 
transition: {
    duration: 1.3
}
    } ,
    hover: {
        scale: [1 ,1.2,1,1.3,1,1.4,1,1.5 , 1] ,
        transition:  {
            delay: 0.5 ,
            duration: 0.5 ,
            yoyo: 5 
        }
    } ,
    exit: {
        x: '100vw' , 
        transition:  {
            duration: 2
        }
    }
}
const [animation , setAnimation] = useCycle('hidden' , 'vissible')
    return (
        <div>
<motion.div  animate={{rotateZ: 180, opacity: 0.5 , marginTop: 20 }} >
<motion.h2 initial={{x: 222}} animate={{fontSize: 50 , color: 'red' , x : 50 , y: 0}} >framer motion tutorial</motion.h2>
</motion.div><motion.div initial={{x: -1000}} animate={{x:0}} transition={{delay: 0.2 , duration: 1.5 , type:'spring' , stiffness: 120  }} 
whileHover={{ scale: 1.2 , boxShadow: '8px 8px 8px black' , x: 50 }}
 >
<Button variant='contained' >button</Button>
</motion.div>
<motion.h3 variants={myVarients} initial='hidden' animate='visible' >  varients </motion.h3>
<motion.button variants={myVarients} whileHover='hover' > keyFrames </motion.button>
<AnimatePresence>
  { exit || <motion.button variants={myVarients} exit='exit' onClick={()=>{setExit(true)}}  >  exit </motion.button> }
</AnimatePresence>
<motion.h1 variants={myVarients} animate={animation} >use useCycle</motion.h1>
<button onClick={setAnimation} > click to taggle animation </button>
<motion.h2 drag dragConstraints={{left: 0 , right:  0 , bottom : 0 , top: 0}} > Drag</motion.h2>
<motion.h1 animate={animationText}>Use Animation</motion.h1>
<button onClick={()=>{animationText.start({
    x: 100  , backgroundColor: 'red'
})}} > Click to do animation </button>
</div>
    )
}

export default index
