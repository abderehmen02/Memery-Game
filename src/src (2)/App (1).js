import React ,{useState , useEffect , useContext}from 'react'
import './app.css'
import { BrowserRouter as Router,Link , useParams,  Route, Switch} from 'react-router-dom'
import Posts from './components/posts';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {auth, db} from './firebase';
import Landing from './components/landing';
import Welcome from './components/welcome';
import EmailVereficaion from './components/emailVereficaion';
import Acount from './components/acount';
import Search from './components/search';
export const Data = React.createContext()
let today = new Date();
let yesterday = new Date();

yesterday.setDate(today.getDate() - 1);



function App() { 
  // hooks
  const [user, setUser] = useState(null)
  const [Loading, setLoading] = useState(true)
  const [userdb, setuserdb] = useState(null)
  const [userdbdata, setUserdbdata] = useState(null)
// functions
useEffect(() => {
  auth.onAuthStateChanged(authuser =>{

    setUser(authuser)
  setLoading(false)
  })
}, [])
 useEffect(() => {
   if(user){
     db.collection('users').doc(user.uid).onSnapshot((snapshot )=>{
  setuserdb(snapshot)
  setUserdbdata(snapshot.data())


}) }
   
 }, [user]) 

if(Loading){
  return <h4>Loading...</h4>
}
if(!user){
  return <Router>
  <Switch>
   <Route path='/VerifyEmail'><EmailVereficaion/></Route>
<Route  path='/SignUp'> <SignUp/> </Route>
<Route path='/SignIn'><SignIn/></Route>
<Route  path='/'><Welcome/> </Route>

 </Switch>
  </Router>
}
  return (
    <Data.Provider value={{user ,  userdb , userdbdata } }>
     <Router> 
<div className="app">
  <Switch>
 <Route exact path='/acount/:id'><Acount/></Route>
 <Route exact path='/posts'> 
<Posts/> </Route>
  <Route exact path='/search'> <Search/></Route>
   <Route   path='/'><Landing/></Route>
 </Switch>
 </div>
</Router></Data.Provider>
  )
}

export default App

