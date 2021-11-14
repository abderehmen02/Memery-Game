import React from 'react'

function finished(props) {
    console.log(props)
    return (
        <div className='finished' >
           <h2> You Finished </h2>
          <h3> Score : {props.score} </h3>
          <button className='buttonRestart' onClick={()=>{props.setGameFinishedCount(prev =>{return prev + 1})}} > Restart </button>
        </div>
    )
}

export default finished
