import React ,{useEffect , useContext , useState} from 'react'
import '../stylesheets/posts.css'
import * as firebase from 'firebase/app'
import { Data } from '../App'
import Post from './post'
import { db, FirebaseStorage , auth } from '../firebase'
let today = new Date();
let yesterday = new Date();
yesterday.setDate(today.getDate() - 1)
function posts() {
    const data = useContext(Data).user
    const userdbdata = useContext(Data).userdbdata
    const [Posts, setPosts] = useState([])
    const [Followings, setFollowings] = useState([])
    const [LoadingFollowing, setLoadingFollowing] = useState(true)
    const [Loading, setLoading] = useState(true)
    const [FollowingsData, setFollowingsData] = useState(null)
useEffect(() => {
  
    
//     userdbdata.followings.forEach(item => {
// db.collection('users').doc(item).onSnapshot(snapShot =>{
//  const userPosts = snapShot.data().posts

//  setPosts([...Posts , userPosts ])
// })        
//     }); 
//     db.collection('posts').onSnapshot(snapshot =>{
// setPosts( snapshot.docs.map(doc =>{ return  {post: doc.data() , id: doc.id  } })  )
//     })
}, [])

useEffect(() => {
    if(userdbdata){
       
    userdbdata.followings.forEach(item => {
    
db.collection('users').doc(item).collection('posts').where('timestamp' , '>' , firebase.firestore.Timestamp.fromDate(yesterday) ).onSnapshot(snapShot =>{
    setPosts([])
 snapShot.forEach(doc => { 
    setPosts((prv)=>{return [...prv , doc.data()]})})
})        
    }); 
    }
}, [userdbdata])

    return (

        <div className='postsComponent'>
        <h2 className='tittlePosts' > Recent Posts </h2>
    {Posts.map(item =>{
        return <div className='SinglePostDiv' > <Post likes={item.likes} postkey={item.key} userName={item.UserName} image={item.image} userId={item.userId} caption={item.descreption}
ProfilePic={item.profilePic} userName={item.userName} 
Timestamp={item.timestamp}
/> </div>
    } )}      
        </div>
    )
}

export default posts
