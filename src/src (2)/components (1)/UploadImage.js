import React , {useState , useContext } from 'react'
import { Button } from '@material-ui/core'
import { Input } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { motion } from 'framer-motion'
import shortid from 'shortid'
import { db, FirebaseStorage , auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import '../stylesheets/posts.css'
import { Data } from '../App'
function UploadImage() {
    //hooks
const [Caption, setCaption] = useState('')
const [Image, setImage] = useState(null)
const [User, setUser] = useState(null)
const [Loading, setLoading] = useState(true)
const [Upload, setUpload] = useState(0)
const history = useHistory()
const data = useContext(Data).user
const userdbdata = useContext(Data).userdbdata 
const userdb = useContext(Data).userdb

 // functions declarations
const handleFiles = (event)=>{
if(event.target.files[0]){
setImage(event.target.files[0])
}
}
const uploadFile = ()=>{
const id = shortid.generate()
    const UploadTask = FirebaseStorage.ref(`/images/${Image.name}`).put(Image)
    UploadTask.on("state_changed" , (snapshot)=>{
        const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        setUpload(progress)
    } , (err) =>{
        console.log(err)
        alert(err.message)
    } ,()=> {
     FirebaseStorage.ref("images").child(Image.name).getDownloadURL().then(
   (url) =>{     db.collection("posts").doc(id).set({
     timestamp : firebase.firestore.FieldValue.serverTimestamp() ,
     caption: Caption , 
    image : url   ,
    key: id, 
likes: [] ,
         }) ;
        setImage(null) ; setCaption('') ; setUpload(0) ;
 db.collection('users')
.doc(data.uid).collection('posts').doc(id).set({
    image: url , caption: Caption , key: id, userId: data.uid ,
    likes: [] ,
  timestamp : firebase.firestore.FieldValue.serverTimestamp() ,
userName: userdbdata.userName , 
profilePic: userdbdata.ProfilePic
})
    } 
     )
       }   )
  
}
// functios excuting


return(<motion.div  className='uploadImageComponent'>
<div className='uploadInfo' >
<progress className='uploadImageProgrss' value={Upload} className='progress' ></progress>
<Button style={{marginTop: 10}} color='secondary' variant='contained'  onClick={uploadFile} > Upload </Button></div>
<div className='postInfo'>
<input className='fileInput' type='file' onChange={handleFiles}></input>
<input className='captionInput' placeholder='enter your caption' value={Caption} onChange={(event)=>{setCaption(event.target.value)}} ></input>
</div>
</motion.div>
)  
}

export default UploadImage
