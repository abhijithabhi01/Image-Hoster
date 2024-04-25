import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './style2.css'
import HomeNavbar from './HomeNavbar';
import { dislikepostAPI, getallpostsAPI, getallusersAPI, likepostAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseurl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function UserHome() {
  const [open, setOpen] = useState(false);
  const[alluserposts,setalluserposts] = useState([])
  const[allusers,setallusers] = useState([])

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const cardStyle = {
    backgroundColor: showComments ? 'black' : 'white',
    
  };
const pdivstyle = {
  opacity : showComments ? '0' : '1',
}
  const getallposts = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await getallpostsAPI(reqHeader)
      if(result.status===200){
        //console.log(result.data);
        setalluserposts(result.data)
        
      }
    }
  }
console.log(alluserposts);

  const getallusers = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await getallusersAPI(reqHeader)
    if(result.status===200){
      setallusers(result.data)
      //console.log(result.data);
    }
    }
  }


  //Dont remove this
const userpostresult =[];

alluserposts.forEach(obj1 => {
  const usergotmatch = allusers.find(obj2 => obj1.userId === obj2._id)

   if(usergotmatch){
    userpostresult.push({
      userId:usergotmatch._id,
      username:usergotmatch.username,
      postimage:obj1.postimage,
      caption:obj1.caption
    })
   }
})

//console.log(userpostresult);

useEffect(()=>{
  getallposts()
  getallusers()
},[])



// LIKE


const [likeStatus, setLikeStatus] = useState(null); 

const handleLikeDislike = async () => {
  try {
    if (likeStatus === null) {
      const response = await likepostAPI
      setLikeStatus(true);
    } else if (likeStatus === true) {
      const response = await dislikepostAPI
      setLikeStatus(false);
    } else {
      // Handle case where post was disliked, and user wants to undo dislike
      // You can implement a separate API endpoint for undoing dislikes if needed
      // For simplicity, this example does nothing in the else case.
    }
  } catch (error) {
    console.error(error);
  }}

  return (
    <>
    <HomeNavbar/>
    
<div className='div-userhome'>
    

    {userpostresult?.length>0? userpostresult.map((item)=>(

<Card className='div-userpost ' style={cardStyle}>
<div className={`pdivfirst-content p-2 ${showComments ? 'hidden' : ''}`}style={pdivstyle}>
  <h2 className=''>{item.username}</h2>
  <hr style={{ border: '1.5px solid black', width: '100%' }} />
  <div className='userpostimg11'>
    <div className='userpostimg mx-auto border border-primary rounded '>
      <img src={userpostresult ? `${BASE_URL}/UserPosts/${item.postimage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1ank-wR_C1doFKGVu5XKmO5bg6RTaVub5A&usqp=CA"} alt='ERROR404' />
    </div>
  </div>
  <hr style={{ border: '1.5px solid black', width: '100%' }} />
  <div className="d-flex justify-content-start flex-start">
  <button onClick={handleLikeDislike} className='ms-2 fs-2' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon className='mt-2' icon={faHeart} color={likeStatus === true ? 'red' : 'black'}  />
      </button>
    <button className='btn comment-btn' onClick={toggleComments}><i className="fa-regular fa-comment fa-2xl text-primary"></i></button>
  </div>
  <h3 className='ms-4' style={{ overflow: 'hidden' }}>{item.caption}</h3>
</div>
{showComments && (
 <div className='comment-box'>
 <div className='d-flex justify-content-between m-3'>  
   <h1 className='text-light'>Comments</h1>
   <button onClick={toggleComments} className="btn fs-2 btn-white me-5">
     <i className="fa-solid fa-x"></i>
   </button>
 </div>
 <div className='comment-content ms-2'>
   <div>
     <p className='comment-paragraph'>delectus dolorem similique sed iure eos ea illo, officia id.</p>
     <p className='comment-paragraph'>delectus dolorem similique sed iure eos ea illo, officia id.</p>
     <p className='comment-paragraph'>delectus dolorem similique sed iure eos ea illo, officia id.</p>
   </div>
   <div className='comment-input'>
     <input type="text" placeholder='reply here' className='reply-input-box text-center text-light '/>
   </div>
 </div>
</div>

)}
</Card>

    ))
    :
    <h1 className='d-flex flex-column text-center text-light' style={{fontSize:'40px'}}>Something went wrong <span>Try again later</span></h1>
    }

    
</div>
    </>
  )
}

export default UserHome