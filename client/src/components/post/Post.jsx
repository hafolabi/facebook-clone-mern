import { MoreVert } from '@material-ui/icons'
import './post.css'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../config';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)
    // const PP = Users.filter((u) => u.id === post.userId)[0].profilePicture

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser?._id))
    }, [currentUser?._id, post.likes])
    
    const likeHandler = ()=>{
        try{
            axiosInstance.put("/posts/" + post._id + "/like", {userId:currentUser?._id})
        }catch(err){}

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }

    useEffect(()=>{
    const getUser = async ()=>{
      try{
        const res = await axiosInstance.get("/users?userId=" + post.userId,)
        setUser(res.data)
      }catch(err){}
    }
    getUser();
  },[post.userId])

  return (
    <div className='post'>
       <div className="postWrapper">

           <div className="postTop">
               <div className="postTopLeft">
                    <Link to ={'profile/'+ user.username}>
                   <img src={user.profilePicture ? PF + user.profilePicture : PF + 'posts/avatar.png'} alt="" className="postProfileImg" />
                   </Link>
                   <span className="postUsername">{user.username}</span>
                   <span className="postDate"> {moment(post.createdAt).fromNow()}</span>
               </div>
               <div className="postTopRight">
                   <MoreVert />
               </div>
           </div>

           <div className="postCenter">
               <span className="postText">{post.desc}</span>
               <img src={post.img} alt="" className="postImg" />
           </div>
           
           <div className="postBottom">
               <div className="postBottomLeft">
                   <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                   <img className="likeIcon" src={`${PF}heart.png`}onClick={likeHandler} alt="" />
                   <span className="postLikeCounter">{like} people like it</span>
               </div>
               <div className="postBottomRight">
                   <span className="postCommentText">{post.comment} comments</span>
               </div>
           </div>
       </div>
    </div>
  )
}
