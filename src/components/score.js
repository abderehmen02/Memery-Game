import React,{useContext} from 'react'
import {Data} from '../app'
function Score() {
    const mydata = useContext(Data) ;
    return (
        <div className="grad">    
      <h3> <span className="text"  > Your Grad :   </span> <span className="value scorevalue"> {mydata.level} </span> </h3>
        </div>
    )
}

export default Score
