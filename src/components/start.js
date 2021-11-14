import React , {useContext}from 'react'
import  {Data} from '../app'
function start() {
const data = useContext(Data)
    return (
        <div>
            <h1>welcome to our memery game</h1>
            <button onClick={data.easy} > Easy </button>
            <button onClick={data.intermediate}> Intermediate </button>
            <button > Hard</button>
            <button > Verry Hard </button>
        </div>
    )
}

export default start
