import React , {useContext , useState} from 'react'
import useTimer from 'easytimer-react-hook';
import {Data} from '../app'
let seconds ; 
let Average = 'excelent'
export default () => {
const mydata  = useContext(Data) ;
const [timer, isTargetAchieved] = useTimer({});
mydata.renderAverage(Average)
timer.start({});
let time = timer.getTimeValues() ;
seconds =  time.seconds + time.minutes * 60 + time.hours * 3600
  if(mydata.GameKind === "easy"){
if(seconds > 15 && seconds <= 25){
Average = 'good'
}
if(seconds > 25 && seconds <= 35){
    Average = 'intermidiate'
}
else if( seconds > 35 && seconds <= 40 ){
    Average = 'Bad'
}
else if(seconds > 40) Average = 'verry_Bad'
    }
    if(mydata.GameKind === "intermediate"){
if(seconds > 32 && seconds <= 45){
Average = 'good'
}
if(seconds > 45 && seconds <= 70){
    Average = 'intermidiate'
}
else if( seconds > 70 && seconds <= 84 ){
    Average = 'Bad'
}
else if(seconds > 85) Average = 'verry_Bad'
    }
    if(mydata.GameKind === "hard"){
if(seconds > 70 && seconds <= 200){
Average = 'good'
}
if(seconds > 200 && seconds <= 350){
    Average = 'intermidiate'
}
else if( seconds > 350 && seconds <= 400 ){
    Average = 'Bad'
}
else if(seconds > 400) Average = 'verry_Bad'
    }
    return <div className="timevalues value">{timer.getTimeValues().toString()}</div>;
};
