import React ,  {useState} from 'react'
import Modal from '@material-ui/core/Modal';
import  Input  from '@material-ui/core/Input';
import  Button  from '@material-ui/core/Button';
import Welcome from './welcome';
import {auth} from '../firebase'
import {  BrowserRouter as Router,Link , useParams,  Route, Switch} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import '../stylesheets/SignIn.css';
function SignIn() {
const [Email, setEmail] = useState('')
const [Password, setPassword] = useState('')
const history = useHistory()

    const authSignIn = (event)=>{
        event.preventDefault()
    auth.signInWithEmailAndPassword(Email , Password).then(res =>{
    
    }).then(()=>{
        history.push('/landing')
    }).catch(err=>{
        alert(err.message)
    })
    }
     const [Open, setOpen] = useState(true)
    return (<div>

        <Modal className="SignInModal" open={Open} onClose={()=>{setOpen(false)   ; history.push('/')}}>
<div class='SignInRealModal'>
<h4 className='signIntittle'>Sign In</h4>
<Input value={Email} onChange={(event)=>{setEmail(event.target.value)}} className='userName SignInInput' placeholder="User Name"></Input>
<Input value={Password} onChange={(event)=>{setPassword(event.target.value)}} className='lastName SignInInput' placeholder="Password"></Input>
<div className='SignInButtons'>
<Button className='SignInButton button' onClick={authSignIn} variant='contained' color='secondary' >Sgin In</Button>
<Link to='/SignUp' style={{textDecoration: 'none'}}>
<Button className='SignUpButton button' variant='contained' color='secondary'>Sign Up</Button>
</Link>
</div>
</div>
</Modal>
</div>
    )
}

export default SignIn
