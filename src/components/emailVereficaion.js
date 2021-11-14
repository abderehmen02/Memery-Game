import React from 'react'
import { Button } from '@material-ui/core'       
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../stylesheets/landing.css'
function emailVereficaion() {
const  data  = useParams()


// const OnSignUp = (event)=>{
//     event.preventDefault() ;
// auth.createUserWithEmailAndPassword(email, password).then(res =>{ 
// auth.currentUser.updateProfile({
//     displayNamem: UserName,
// })
// history.push('/landing')
// }).catch(err => alert(err.message)
// )
// }
    return (
        <motion.div initial={{scale: 0.2}} animate={{scale: 1 , transition: {duration:0.5}}} >
            <h1 className='tittle' >Verefy Your Email</h1>
<Button color='secondary' variant='contained' >send Link</Button>
        </motion.div>
    )
}

export default emailVereficaion
