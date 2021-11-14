import React , {useState , useContext } from 'react'
import { Button } from '@material-ui/core'
import { Input } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { motion  , AnimatePresence} from 'framer-motion'
import shortid from 'shortid'
import { db, FirebaseStorage , auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Data } from '../App'
function UploadProfileImg() {
    //hooks
const [Image, setImage] = useState(null)
const [User, setUser] = useState(null)
const [Loading, setLoading] = useState(true)
const [Upload, setUpload] = useState(0)
const history = useHistory()
const data = useContext(Data).user

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
   (url) =>{     db.collection("users").doc(data.uid).update({
    ProfilePic : url   ,
         }).then(()=>{
             setImage(null)  ; setUpload(0) ; 
         })
    } 
     )
       }   )
  
}
// functios excuting

const myVarients = {
    drag: {
y: 0 , 
opacity: 1 , 
scale: 1,
transition: {duration: 1} 
    } , 
    hidden : {
        y : 200 , 
        opacity: 0.5 , 
        scale: 0.5 
    }
}
return(<motion.div variants={myVarients} initial='hidden' animate='drag' className='uploadProfileImageComponent' >
<progress value={Upload} className='profileImageProgress' ></progress>
<div className='uploadbtn' >
<Button onClick={uploadFile} > Upload </Button> </div>
<input type='file' onChange={handleFiles} className='ProfileImageFileInput' ></input>
</motion.div>
)  
}

export default UploadProfileImg
