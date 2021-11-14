import React , {useContext} from 'react'
import {  BrowserRouter as Router,Link , useParams,  Route, Switch} from 'react-router-dom' ;
import  {Data} from '../app' ;
let evaluation ; 
function finished() {

const mydata = useContext(Data)
let Average = mydata.Average
    return (
<div className=" finish-container">
<h2 className="win header"> you win !  </h2>
 <div className="descreption">you are <span className="average averagefinished" >{Average}</span> at memerizing</div>
 <button className="prymary-btn restart-btn " onClick={()=>{
      window.location.reload();
 }}> Restart </button>
</div>
    ) 
}

export default finished
