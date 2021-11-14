import React , {useState  , useEffect  } from 'react';
import Titel from './components/title' ;
import Table from './components/table' ;
import ScoreComponent from './components/score';
import Finished from './components/finished';
import {  BrowserRouter as Router,Link , useParams ,  Route, Switch} from 'react-router-dom' ;
import TimerSet from './components/timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Eyes from './components/eyes' ;
import LevelComponent from './components/level' ;
import Timer from 'easytimer.js';
import timer from './components/timer';
export const Data = React.createContext() ; 
let EasyTabs  = [ {name:'horse' , id : 1 , status : false, eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } ,
 ,{name: 'racon', id : 2 ,status : false  ,eye: false , image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
  ,{name:'gorila' , id : 3 ,  status : false, eye: false , image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
   ,{name:'cat' , id : 4 , status  : false,  eye: false ,image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
    ,{name:'koala' , id : 5 , status: false , eye: false , image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
     ,{name:'horse' , id : 6 , status : false , eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
      ,{name: 'racon', id : 7,status : false ,  eye: false ,image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
        ,{name:'gorila' , id : 8 ,  status :false,  eye: false ,image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
          ,{name:'cat' , id : 9, status :false, eye: false , image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
            ,{name:'koala' , id : 10 , status: false ,  eye: false ,image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' },         
 ]
 let EasyShuffeledArray =  EasyTabs.sort(()=> Math.random() - 0.5 )
let stopEvents = false ;
let  HardTabs = [{name:'horse' , id : 1 , status : false, eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } ,
 ,{name: 'racon', id : 2 ,status : false  ,eye: false , image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
 ,{name:'gorila' , id : 3 ,  status : false, eye: false , image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
    ,{name:'cat' , id : 4 , status  : false,  eye: false ,image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
  ,{name:'koala' , id : 5 , status: false , eye: false , image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name:'horse' , id : 6 , status : false , eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
  ,{name: 'racon', id : 7,status : false ,  eye: false ,image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
  ,{name:'gorila' , id : 8 ,  status :false,  eye: false ,image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
   ,{name:'cat' , id : 9, status :false, eye: false , image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
   ,{name:'koala' , id : 10 , status: false ,  eye: false ,image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' },
 ,{name: 'fox' , id: 11 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
  ,{name: 'thinDuck' , id: 12 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name: 'elephant' , id: 13 , status: false , eye : false , image: 'https://images.unsplash.com/reserve/RFDKkrvXSHqBaWMMl4W5_Heavy%20company%20by%20Alessandro%20Desantis%20-%20Downloaded%20from%20500px_jpg.jpg?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
    ,{name: 'rhinocero', id : 14, status: false , eye : false , image: 'https://images.unsplash.com/photo-1463501810073-6e31c827a9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
     ,{name: 'blueBird' , id: 15 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1486365227551-f3f90034a57c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
      ,{name: 'sheep', id: 16 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
       ,{name:'girafe' , id: 17 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1496963729609-7d408fa580b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
        ,{name: 'tiger' , id: 18 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1615824996195-f780bba7cfab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
         ,{name: 'panda' , id: 19 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1566487097168-e91a4f38bee2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
          ,{name: 'colorfullBird', id: 20 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
           ,{name: 'roster' , id: 21 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1558954350-2bc4ea82347f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
            ,{name: 'cow', id: 22 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1590743462894-ba7932315ec4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
             ,{name: 'beautyBird' , id: 23 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1563278689-3519903a3e97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
      ,{name: 'fish', id: 24 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
             ,{name: 'rabit' , id: 25 , status: false , eye : false , image:'https://images.unsplash.com/photo-1567633090480-f19f2f67c088?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
              ,{name: 'whiteCat', id: 26 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
                ,{name:'deer' , id: 27 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1495366821225-0a3d30d20b5e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI3fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                 ,{name: 'yellowBird', id: 28 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1618098750285-9402745c67e7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                  ,{name:'crocodile' , id: 29 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1471005197911-88e9d4a7834d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYwfHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                   ,{name: 'smallFish', id: 30 , status: false , eye : false , image:  'https://images.unsplash.com/photo-1516408388733-2f8364f2e00b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc5fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
                        ,{name: 'fox' , id: 31 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
  ,{name: 'thinDuck' , id: 32 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name: 'elephant' , id: 33 , status: false , eye : false , image: 'https://images.unsplash.com/reserve/RFDKkrvXSHqBaWMMl4W5_Heavy%20company%20by%20Alessandro%20Desantis%20-%20Downloaded%20from%20500px_jpg.jpg?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
    ,{name: 'rhinocero', id : 34, status: false , eye : false , image: 'https://images.unsplash.com/photo-1463501810073-6e31c827a9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
     ,{name: 'blueBird' , id: 35 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1486365227551-f3f90034a57c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
      ,{name: 'sheep', id: 36 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
       ,{name:'girafe' , id: 37 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1496963729609-7d408fa580b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
        ,{name: 'tiger' , id: 38 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1615824996195-f780bba7cfab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
         ,{name: 'panda' , id: 39 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1566487097168-e91a4f38bee2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
          ,{name: 'colorfullBird', id: 40 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
           ,{name: 'roster' , id: 41 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1558954350-2bc4ea82347f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
            ,{name: 'cow', id: 42 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1590743462894-ba7932315ec4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
             ,{name: 'beautyBird' , id: 43 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1563278689-3519903a3e97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
      ,{name: 'fish', id: 44 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
             ,{name: 'rabit' , id: 45 , status: false , eye : false , image:'https://images.unsplash.com/photo-1567633090480-f19f2f67c088?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
              ,{name: 'whiteCat', id: 46 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
                ,{name:'deer' , id: 47 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1495366821225-0a3d30d20b5e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI3fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                 ,{name: 'yellowBird', id: 48 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1618098750285-9402745c67e7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                  ,{name:'crocodile' , id: 49 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1471005197911-88e9d4a7834d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYwfHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' }
                   ,{name: 'smallFish', id: 50 , status: false , eye : false , image:  'https://images.unsplash.com/photo-1516408388733-2f8364f2e00b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc5fHxhbmltYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}

]
let HardShuffeledArray = HardTabs.sort(()=> Math.random() - 0.5)
let IntermediateTabs = [{name:'horse' , id : 1 , status : false, eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } ,
 ,{name: 'racon', id : 2 ,status : false  ,eye: false , image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
 ,{name:'gorila' , id : 3 ,  status : false, eye: false , image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
    ,{name:'cat' , id : 4 , status  : false,  eye: false ,image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
  ,{name:'koala' , id : 5 , status: false , eye: false , image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name:'horse' , id : 6 , status : false , eye: false , image :'https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
  ,{name: 'racon', id : 7,status : false ,  eye: false ,image : 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80' }
  ,{name:'gorila' , id : 8 ,  status :false,  eye: false ,image : 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
   ,{name:'cat' , id : 9, status :false, eye: false , image : 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' } 
   ,{name:'koala' , id : 10 , status: false ,  eye: false ,image : 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
  ,{name: 'fox' , id: 11 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
  ,{name: 'thinDuck' , id: 12 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name: 'elephant' , id: 13 , status: false , eye : false , image: 'https://images.unsplash.com/reserve/RFDKkrvXSHqBaWMMl4W5_Heavy%20company%20by%20Alessandro%20Desantis%20-%20Downloaded%20from%20500px_jpg.jpg?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
    ,{name: 'rhinocero', id : 14, status: false , eye : false , image: 'https://images.unsplash.com/photo-1463501810073-6e31c827a9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
     ,{name: 'blueBird' , id: 15 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1486365227551-f3f90034a57c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
         ,{name: 'fox' , id: 31 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
  ,{name: 'thinDuck' , id: 32 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
   ,{name: 'elephant' , id: 33 , status: false , eye : false , image: 'https://images.unsplash.com/reserve/RFDKkrvXSHqBaWMMl4W5_Heavy%20company%20by%20Alessandro%20Desantis%20-%20Downloaded%20from%20500px_jpg.jpg?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }
    ,{name: 'rhinocero', id : 34, status: false , eye : false , image: 'https://images.unsplash.com/photo-1463501810073-6e31c827a9bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
     ,{name: 'blueBird' , id: 35 , status: false , eye : false , image: 'https://images.unsplash.com/photo-1486365227551-f3f90034a57c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFuaW1hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }

]
let IntermediateShuffeledArray = IntermediateTabs.sort(()=> Math.random() - 0.5)
let firstSuffeledArray 
//let firstSuffeledArray = allTabs.sort((a, b) => 0.5 - Math.random()) 
console.log('app rendered') 
console.log(firstSuffeledArray)
let finished = false ;
let GameKind = 'easy';
let showEyeLevels = new Array() ;
let i = 0
while(i < HardTabs.length ){
  showEyeLevels.push(i)
  i += 3 
}
 let start ;
 let seconds = 0;
const Start =()=>{
  
  return (
  <div className="start">
  <h2 class="apptitle"> memery game </h2>
<Route>
<h1 className="smalltitle">Start Play Now </h1>
<ul className="list-group ">
<Link className=" option btn btn-block  bg-success easy" to="/easy"> Easy </Link>
<Link className=" option btn btn-block  bg-primary intermediate" to="/intermediate"> Intermediate </Link>
<Link  className="option btn btn-block  bg-danger hard" to="/hard"> Hard </Link>
</ul>
</Route>
  </div> )
}

const Hard = ()=>{
   firstSuffeledArray = HardShuffeledArray  ; 
GameKind = 'hard'
  return <div>
    <App/>
  </div>
}

const Intermediate = ()=>{
  GameKind = 'intermediate'
firstSuffeledArray = IntermediateShuffeledArray
  console.log('intermediate rendered')
  console.log(firstSuffeledArray)
    console.log(firstSuffeledArray)
return <div>
    <App firstSuffeledArray={firstSuffeledArray}/>
  </div>
}
 
const Easy = ()=>{
 firstSuffeledArray = EasyShuffeledArray 
return <App />
}
const MyRout = ()=>{
   return  <div>
   <Router>
    <Switch>
    <Route path="/easy"> <div className="easy mainapp " >
 <Easy/>
  </div>
</Route> 
    <Route path="/intermediate">
<Intermediate/>
  </Route>
   <Route path="/Hard"> <div className=" mainapp " >
 <Hard></Hard>
  </div>
</Route> 
   <Route path="/">
<Start/>
  </Route>
</Switch>   </Router> </div>
  }
 const App = ()=> {
   console.log('app component rendered')
   console.log(firstSuffeledArray)
const [Score, setScore] = useState(0)
const [shuffeldarray, setShuffeledArray] = useState(firstSuffeledArray)
const [ClickedTabs, setClickedTabs] = useState([]) ;
const [suggestedEye, setsuggestedEye  ] = useState(false)
const [level , setLevel] = useState(0)
const [eyes, setEyes] = useState(2)
const [Average, setAverage] = useState('good')
const cklickedTwoTabs = (ClickedTabs)=> {
  const check = ()=>{
  if(ClickedTabs[0].name === ClickedTabs[1].name){
    if(ClickedTabs.some(item =>{
 return item.eye === true
}))  {
  setEyes(eyes + 1)
}
firstSuffeledArray.forEach(item =>{
  if(item.id === ClickedTabs[0].id || item.id === ClickedTabs[1].id ){
    item.status = true
  }
  
})
 setShuffeledArray(firstSuffeledArray)
 console.log(firstSuffeledArray)
setLevel(level + 1)
  } } 
  setTimeout(() => {
  setClickedTabs([])
 check() 
 stopEvents = false
  }, 700);
}
    if(ClickedTabs.length === 2){
cklickedTwoTabs(ClickedTabs) ;
stopEvents = true}
const clicked = (clickedObject )=>{
if(stopEvents){return }
    if(ClickedTabs.includes(clickedObject)){
setClickedTabs(  ClickedTabs.filter(item =>{
  return  item.id !==  clickedObject.id
}) )
return 
}
const ClickedObjectSimilar = new Array() ;
firstSuffeledArray.forEach(item=>{
  if (item.name === clickedObject.name){
    ClickedObjectSimilar.push(item)
  } 
})
if(ClickedObjectSimilar.every(item =>{
  return item.eye === false ;
})){
  firstSuffeledArray.forEach(item=>{
    item.eye = false
  })
}
    setClickedTabs([...ClickedTabs , clickedObject])
}
const restart = ()=>{
  // firstSuffeledArray = allTabs.sort((a, b) => 0.5 - Math.random())
   setShuffeledArray(firstSuffeledArray)
   setLevel(0)
   setEyes(2) } 

const showAll = ()=>{
  setClickedTabs(shuffeldarray)
  setTimeout(()=>{
setClickedTabs([])
setEyes(eyes - 1)
  } , 2000)
}
const renderAverage = (value)=>{
  setAverage(value)
}
if(firstSuffeledArray.every(item =>{
  return item.status === true
})){      
  finished = true
 
return<Data.Provider value={{restart , Score , Average , seconds , GameKind}}>
 <Finished/>  </Data.Provider>
}
const addEye = ()=>{
let randomnum = Math.floor(Math.random()*(firstSuffeledArray.length - 1 ))
  firstSuffeledArray[randomnum].eye = true
showEyeLevels.shift()
}
if(showEyeLevels.includes(level) && firstSuffeledArray.every(item =>{
  return item.eye === false
})){
  addEye()
}

return( 
 <div className="mainapp">
 <Data.Provider value={{shuffeldarray , Average ,GameKind ,eyes , showAll , renderAverage , suggestedEye  , Score , level , finished , clicked , ClickedTabs}}> 

  
<Titel/>

  <div className="tabletimer">
<LevelComponent/> <ScoreComponent/>
<TimerSet/>  </div>
 
  {/* <div className="invisible"><TimerSet/></div> */}
<Table/> 
 
<Eyes/> 
</Data.Provider> 
  </div>  ) }


export default MyRout
