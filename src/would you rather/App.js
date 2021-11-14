import React , { useEffect , useState , useCallback }from 'react';
import 'firebase/auth';
import './app.css' ;
import Finished from './components/finished';
import { db } from './firebase';
import logo from './logo.png' ; 
import { motion , useAnimation , useCycle } from 'framer-motion' ;
import QuestionComponent from './components/question';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
let  appquestions = [];
let shuffeledArray = new Array() ;
let lastShuffeledQuestion ;
let  total ;
let oneRacio ;
let twoRacio; 
let QuestionGeted = false
function App() {
const [Loading, setLoading] = useState(true)
const [GameFinishedCount, setGameFinishedCount] = useState(0)
const [ScoreColor, setScoreColor] = useState('White')
const [Score, setScore] = useState(0) 
const [question, setQuestion] = useState({})
//  const questions  = [{ one: 'team up with Wonder Woman' , two: 'team up with Captain Marvel'} , {one: ' be forced to sing along' , two: 'be force to dance to every single song you hear'} , {one: ' find true love today' , two: ' win the lottery next year'} , {one: ' be in jail for five years' , two: 'be in a coma for a decade'} , {one: 'have another 10 years with your partner ' , two: 'have a one-night stand with your celebrity crush'} , {one: 'be chronically under-dressed' , two: 'be chronically overdressed'} , {one: 'have everyone you know be able to read your thoughts' , two: ' for everyone you know to have access to your Internet history'} , {one: 'lose your sight' , two: ' lose your memories'} , {one: 'have universal respect' , two: 'have unlimited power'} , {one:  '  buy 10 things you don’t need every time you go shopping   ', two: '  always forget the one thing that you need when you go to the store  '} ,  {one:  '  never be able to go out during the day   ', two: ' never be able to go out at night  '} , {one:  '   have a personal maid  ', two: '  have a personal chef '} , {one:  '  be 11 feet tall   ', two: ' be  nine inches tall '} , {one:  ' be an extra in an Oscar-winning movie    ', two: '   be he lead in a box office bomb'} , {one:  '  vomit on your hero   ', two: ' have your hero vomit on you   '} , {one:  '  communicate only in emoji   ', two: ' never be able to text at all ever again  '} , {one:  '   wear the same socks for a month   ', two: '    wear the same socks for a month '} , {one:  '    work an overtime shift with your annoying boss  ', two: ' spend full day with your mother-in-law  '} , {one:  '    cuddle a koala  ', two: ' pal around with a panda  '} , {one:  '     always be 10 minutes late ', two: ' always be 20 minutes early  '} , {one:  '    spend a week in the forest  ', two: ' spend a night in a real haunted house '} , {one:  '  find a rat in your kitchen   ', two: ' find a roach in your bed  '} , {one:  '   always have a full phone battery  ', two: 'always have a full  gas tank '} , {one:  'lose all your teeth', two: 'lose a day of your life every time you kissed someone'} , {one:  'never eat watermelon ever again', two: 'be forced to eat watermelon with every meal'} , {one:  'get a paper cut every time you turn a page', two: 'bite your tongue every time you eat '} , {one:  ' oversleep every day for a week   ', two: ' not get any sleep at all for four days  '} , {one:  '  die in 20 years with no regrets    ', two: '  live to 100 with a lot of regrets '} , {one:  ' spend a year at war    ', two: ' spend  a year in prison  '} , {one:  '  die before  your partner   ', two: ' die after your partner'} , {one:  '   have a child every year for 20 years   ', two: ' never have any children at all  '} , {one:  '   take amazing selfies but look terrible in all other photos   ', two: ' be photogenic everywhere but in your selfies  '} , {one:  '  hunt and butcher your own meat', two: '  never eat meat again '} , {one:  '  lose all of your friends but keep your BFF    ', two: ' lose your BFF but keep the rest of your buds  '}  ]

// const editquestions = useCallback( () => {
// questions.forEach(question =>{
//     db.collection('questions').add({
// one: question.one ,
// oneClicks : 10 ,
// two: question.two ,
// twoClicks : 10 , 
//     }).then(()=>{console.log('added')}).catch(err =>{console.log(err)})
// })   } , [questions] )

const changeQuestion = ()=>{
// editquestions()
 lastShuffeledQuestion = shuffeledArray[shuffeledArray.length - 1]
 total = lastShuffeledQuestion.data.oneClicks + lastShuffeledQuestion.data.twoClicks
 oneRacio = Math.round(  Number(lastShuffeledQuestion.data.oneClicks * 100  / total) ) 
 twoRacio = Math.round( Number(lastShuffeledQuestion.data.twoClicks * 100 / total ) ) 
 setQuestion({one : lastShuffeledQuestion.data.one , oneRacio : lastShuffeledQuestion.data.two , oneRacio , two : lastShuffeledQuestion.data.two ,  twoRacio , oneClicks : lastShuffeledQuestion.data.oneClicks , twoClicks: lastShuffeledQuestion.data.twoClicks , firebaseId: lastShuffeledQuestion.id })
 shuffeledArray.pop()

    // setQuestion({one : lastShuffeledQuestion.one , oneRacio :  })
}
useEffect(  () => {
// editquestions()
  db.collection('questions').get().then(snapshot =>{
snapshot.forEach(doc =>{
console.log('doc');
    appquestions.push({ data:  doc.data() , id:   doc.id })
})
shuffeledArray = appquestions.sort((a, b) => 0.5 - Math.random())
console.log('shuffeledarraychanged');
if(appquestions.length === 34 ){setLoading(false) ;  }
changeQuestion()
})
return ()=>{
    appquestions = [] ;
    shuffeledArray = [] ;
    setScore(0)
} 
}
, [GameFinishedCount] )
if(Loading ){
    return( <div className='loading' >
     <h1>Loading...</h1> </div>)
}
if(shuffeledArray.length === 0 ){
    return ( <Finished setGameFinishedCount={setGameFinishedCount} score={Score} /> )
}

    return (
<motion.div className='app' initial={{x: '100vw'}} animate={{x: 0}} transition={{duration: 0.5 }} >      
<header className='appHeader' >
<motion.div     animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }} transition={{delay: 0.5}}
 className='logo' style={{backgroundImage: `url(${logo})`}} ></motion.div>
<div className='AppTittle' > Would You Rather </div>
</header>
<h2   className='score' style={{color : ScoreColor}} > Your Score : {Score}  </h2>
<motion.div initial={{y: 500 }} animate={{y: 0}} transition={{duration: 0.5  , delay: 0.3}} >
<QuestionComponent props={{question: question , id: question.id , changeQuestion , setScore , Score , ScoreColor  , setScoreColor}}   />
</motion.div>
</motion.div>)
}

export default App
