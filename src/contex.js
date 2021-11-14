// import React, { useState , useEffect } from 'react';
// import {auth} from './firebase'
// import Landing from './components/landing';

// // import {  BrowserRouter as Router,Link , useParams,  Route, Switch } from 'react-router-dom'
// import { useHistory } from "react-router-dom"
// function MyContext({children}){
//   const [Loading, setLoading] = useState(true)
//   const [User, setUser] = useState(null)
//    const  history = useHistory();

// useEffect(() => {
//     auth.onAuthStateChanged(authuser =>{
//       setUser(authuser)
//       setLoading(false)
//     })
// }, [])
// if(Loading){
//   return <h3>Loading...</h3>
// }

//   if(User){
//      history.push('/landing')
//   }
//   return(
//     <div>
//    { children}
//  </div> )
// }

// export default MyContext;
