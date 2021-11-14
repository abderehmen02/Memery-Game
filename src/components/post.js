import React , {useState , useEffect , useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../stylesheets/posts.css'
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { Checkbox , Dialog , Input , Button, Grid } from '@material-ui/core';
import { db } from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as firebase from '@firebase/app';
import shortid from 'shortid';
import { useHistory  , useParams} from 'react-router-dom';
import { Data } from '../App';
const months = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

let newLikes= [] ; 
function post(props) {
   const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [IsLiked, setIsLiked] = useState(false)
  const [CommentModal, setCommentModal] = useState(false)
  const [Likes, setLikes] = useState([])
  const history = useHistory()
  const data = useContext(Data).user
  const userdbdata = useContext(Data).userdbdata 
  const [ProfilePic, setProfilePic] = useState('')
  const params = useParams()
  useEffect(() => {

  if(props.likes.includes(data.uid)){
    setIsLiked(true)
  }
  else { setIsLiked(false) 

  }
setLikes(props.likes) 
db.collection('users').doc(props.userId).onSnapshot(res =>{
  setProfilePic(res.data().ProfilePic)
})
  }, []) 
  const postDeleted = async ()=>{
    if(params.id === data.uid){
  db.collection('users').doc(props.userId).collection('posts').doc(props.postkey).delete() }
  }
  const likedIconChanged = ()=>{
    if(!IsLiked){
    db.collection('users').doc(props.userId).collection('posts').doc(props.postkey).update({
  likes: [...Likes , data.uid]
    }) }
    else{
      newLikes = Likes.filter(item =>{
        return item !== data.uid
      })
    db.collection('users').doc(props.userId).collection('posts').doc(props.postkey).update({
  likes: newLikes
    })}
  }
  const CommentComponent = ()=>{
      const [Comments, setComments] = useState([])
   
    let ProfilePic = ''
    const [comment, setComment] = useState('')
    
    const [LoadingComments, setLoadingComments] = useState(true)
    useEffect( async () => {
await db.collection('users').doc(props.userId).collection('posts').doc(props.postkey).collection('comments').onSnapshot((snapshot =>{
  setComments([])
snapshot.forEach(doc =>{
  db.collection('users').doc(doc.data().userId).get().then((user)=>{
    ProfilePic =  user.data().ProfilePic 
     setComments((prv)=>{return [...prv , { data: doc.data() ,  ProfilePic}]})   
  })
})  
}))
    }, [])

    const addComment = ()=>{
      const id = shortid.generate()
db.collection('users').doc(props.userId).collection('posts').doc(props.postkey).collection('comments').doc(id).set({
//  timestamp : firebase.firestore.FieldValue.serverTimestamp() ,
 comment: comment, 
 userId : data.uid  ,
 userName: userdbdata.userName,                 
}).then(()=>{
  setComment('')
})
    }

    return (
       <motion.div className='CommentsComponent' initial={{scale: 0.2}} animate={{scale: 1 , transition: {duration: 0.5}}} >
       <h2 className='tittle tittleComments' >Comments</h2>
      <h1> {Comments.length} </h1>
      <div className='AllCommnets'>
   <div className='innerComment'>      {Comments.map(item =>{
           return ( 
           <div className='SingleComponent' > <div className='avatar' > <Avatar alt="Remy Sharp" src={item.ProfilePic}  onClick={()=>{history.push(`/acount/${item.data.userId}`)}} /> </div> <div className='userNameAndComment' > <div className='userNameComment' >{item.data.userName}</div>  <div className='textComment' >{ item.data.comment } </div></div> </div>
           )} )}
   </div></div>
   <div className='addComment' >
    <Input value={comment}  color='primary' onChange={(event)=>{setComment(event.target.value)}} placeholder='Write a comment' />
    <Button variant='contained' color='secondary' onClick={addComment} > save </Button>
    </div>
  </motion.div>
    )
  }
;
//     return (
//         <div className="post">
// <DeleteForeverIcon onClick={postDeleted} />;       
// <div className='heather'  onClick={()=>{history.push(`/acount/${props.userId}`)}} >
// {/* profilePic */}
// {/* ProfilePic */}
// <Avatar  src={ProfilePic } />
// <h4>{props.userName}</h4>
// <h4 className="PostUserName"> {props.userName} </h4>
// </div>
// <div className="postImmage">
//   {/* <img src={props.image}  className="img"/> */}
//   <div className='img' style={{ backgroundImage: `url(${props.image})` }}></div>
// </div>
// <div className="caption">{props.caption}
// </div>
// <Checkbox icon={<FavoriteBorderIcon/>} checkedIcon={<FavoriteIcon/>} 
// checked={IsLiked} onChange={likedIconChanged}
// ></Checkbox>{Likes.length}
// <ForumTwoToneIcon onClick={()=>{setCommentModal(true)}} />

// <Dialog open={CommentModal} onClose={()=>{setCommentModal(false)}} >
//   <CommentComponent></CommentComponent>
// </Dialog>
//         </div>
//     )

 return (
        <div className='post' >
             <Card >
      <CardHeader 
      onClick={()=>{history.push(`/acount/${props.userId}`)}}  
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={ProfilePic}>
          </Avatar>
        }
        action={
        params.id === data.uid && <DeleteForeverIcon onClick={postDeleted} />
        }
        title={props.userName}
        subheader={`${props.Timestamp.toDate().getDate()} ${months[props.Timestamp.toDate().getMonth()]}`}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
{props.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton style={{marginRight: 50}} aria-label="add to favorites">
 <Checkbox icon={<FavoriteBorderIcon/>} checkedIcon={<FavoriteIcon/>} 
checked={IsLiked} onChange={likedIconChanged}
></Checkbox>
    <div className='likesLinegth' > {Likes.length} </div> 
        </IconButton>
        <IconButton aria-label="share">
          <ForumTwoToneIcon onClick={()=>{setCommentModal(true)}} />
          
        </IconButton>
      </CardActions>
      </Card>
      <Dialog open={CommentModal} onClose={()=>{setCommentModal(false)}} >
  <CommentComponent></CommentComponent>
</Dialog>
        </div>
    )

}

export default post
