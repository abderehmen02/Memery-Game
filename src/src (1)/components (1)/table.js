import React , {useContext , useRef} from 'react'
import Tab from './tab'
import {Data} from '../app' ;
function Table() {
const  table = useRef(null)
 
const mydata = useContext(Data)
const shuffeldarray = mydata.shuffeldarray ;
if(mydata.GameKind === 'hard'){
  
}
const TabsIcons = ()=>{
  return shuffeldarray.map( item =>{
return  <Tab item={item}  />  }) }
   return(
   <div>
   <div ref={table} className='table' >
<TabsIcons/>
</div> </div>)
}
export default Table
