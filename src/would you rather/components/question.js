import React , {useCallback, useState , useEffect , useRef } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { db } from '../firebase';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import { motion , useAnimation , animate } from 'framer-motion' ;
function question({props}) {
const drag = useAnimation()
const racioOne  = useRef(null)
const setScore = props.setScore
const Score = props.Score
const [questionDone, setQuestionDone] = useState(false)
const [questionCheised, setQuestionCheised] = useState('')
const ScoreColore = props.ScoreColor
const setScoreColor = props.setScoreColor
const [OneBackgroundColor, setOneBackgroundColor] = useState('linear-gradient(0deg, #1f1b1b 40%, #000000 100%)')
const [TwoBackgroundColor, setTwoBackgroundColor] = useState('linear-gradient(0deg, #1f1b1b 40%, #000000 100%)')
const {one , oneRacio , two , twoRacio , oneClicks , twoClicks } = props.question ;
const [OneClicksQuestion, setOneClicksQuestion] = useState(oneClicks)
const [TwoClicksQuestion, setTwoClicksQuestion] = useState(twoClicks)


function Counter({ from, to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = `${Math.round(value)}%`;
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}



const next = ()=>{
props.changeQuestion() ;
setQuestionCheised('') ;
setScoreColor('white')
setOneBackgroundColor('linear-gradient(0deg, #1f1b1b 40%, #000000 100%)')
setTwoBackgroundColor('linear-gradient(0deg, #1f1b1b 40%, #000000 100%)')
const FirebaseId = props.question.firebaseId
db.collection('questions').doc(FirebaseId).update({              
   oneClicks : OneClicksQuestion ,
   twoClicks: TwoClicksQuestion ,
})
setQuestionDone(false)
}

const answerClicked  =  (answerNum)=>{
if(!questionDone){
switch (answerNum) {
    case 'one': { setOneClicksQuestion(oneClicks + 1) ; setTwoClicksQuestion(twoClicks) ; setQuestionCheised(one)
if(oneRacio < twoRacio) { setScore(Score - 1) ; setScoreColor('orange')} else if(oneRacio > twoRacio){ setScore(Score + 3) ;  setScoreColor('rgb(47, 255, 116)')} else if (oneRacio === twoRacio){ setScore(Score  + 1) ; setScoreColor('#0cf2e3') }
    }       
        break;
    case 'two' : {  setQuestionCheised(two) ; setTwoClicksQuestion(twoClicks + 1) ; setOneClicksQuestion(oneClicks)  
if(oneRacio > twoRacio) { setScore( Score - 1 ) ; setScoreColor('orange')} else if(oneRacio < twoRacio){ setScore( Score + 3 ) ;  setScoreColor('rgb(47, 255, 116)')} else if (oneRacio === twoRacio){ setScore( Score + 1 ) ;  setScoreColor('#0cf2e3') }    
    }    
} 
if(oneRacio < 50  ){
    setOneBackgroundColor('linear-gradient(0deg, #f30909 40%, #ff4b04 100%)') ; setTwoBackgroundColor('linear-gradient(0deg, #09fada 40%, #32da1c 100%)')
} 
else if (twoRacio < 50 ){
    setTwoBackgroundColor('linear-gradient(0deg, #f30909 40%, #ff4b04 100%)') ; setOneBackgroundColor('linear-gradient(0deg, #09fada 40%, #32da1c 100%)')
}
else if (twoRacio === oneRacio ){
setOneBackgroundColor('linear-gradient(0deg, #bbe20b 40%, #ecf00c 100%)')
setTwoBackgroundColor('linear-gradient(0deg, #bbe20b 40%, #ecf00c 100%)')
}
setQuestionDone(true)
 }
} 
    return (
<div >
        <motion.div animate={drag}  className='questions' >   
<motion.div className='TextQuestions'>
<div className='question'   onClick={()=>{ answerClicked('one') } }   style={{ background : OneBackgroundColor }} >
<h2  > {one}  {questionCheised === one && <div className='done' ><DoneOutlineIcon color='primary' /></div>}</h2> 
<h3 className='Note' > { questionCheised === one && `${oneClicks} agree` } {questionCheised === two  && `${oneClicks} Disagree` } </h3>
{ questionCheised && <div className='oneRacio racio' > <Counter from={0} to={oneRacio} /> </div> }
</div> <span className='or' > Or </span> 
<div onClick={()=>{answerClicked('two')}} className='question' style={{background: TwoBackgroundColor , color: 'white'}} ><h2 > {two}  {questionCheised === two && <div className='done' ><DoneOutlineIcon color='secondry' /></div>} </h2>
<h3 className='Note' > { questionCheised === two && `${twoClicks} agree` } {questionCheised === one && `${twoClicks} Disagree` } </h3>
{ questionCheised && <div className='twoRacio racio ' > <Counter from={0} to={twoRacio} /> </div> }
</div>
</motion.div>
    </motion.div>
    <h2 className='next' onClick={()=>{   drag.start( {
x: [0  , 1000 , -1000 ,0] ,
transition: {
    times : [0 , 0.5 , 0.4 , 1]
}
}) ; next()  }}  style={{visibility: questionCheised ? 'visible' : 'hidden'}} > 
   <span> Next </span>   
 <ArrowForwardIosIcon fontSize='large' color='secondary'/></h2>

    </div>
) 
}
export default question ;