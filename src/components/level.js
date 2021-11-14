import React , {useContext , useState } from 'react' ;
import { Data } from '../app';
export default ()=>{
const [level, setLevel] = useState('easy') ;
const mydata = useContext(Data)    ;
const average = mydata.Average ;
    return (<span className="level  value">
 {average} 
    </span>)
}