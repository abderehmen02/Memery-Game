import React,{useContext} from 'react'
import {Data} from '../app'
function Eyes() {
  const data = useContext(Data)
  const eyes = data.eyes;
  console.log(eyes)
  const EyesBttons = ()=>{
let buttons = [];
        for(let i = 0 ; i < eyes ; i++){
 buttons.push(<button className="eyebtn"></button>)
        }
    return <div className="eyescontainer">{buttons.map(item =>{
        return item
    })}</div>  ;
}
    return (
        <div onClick={data.showAll}>
    <EyesBttons></EyesBttons>
        </div>
    )
}

export default Eyes
