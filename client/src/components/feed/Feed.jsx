import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { AuthContext } from '../../context/AuthContext'
import ReactPaginate from 'react-paginate'
import { axiosInstance } from '../../config'

export default function Feed({username}) {
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext) 

  const paginate = posts.slice(0, 50)
  const [pageNumber, setPageNumber] = useState(0)
  const postPerPage = 5
  const pageVisited = pageNumber * postPerPage
  const displayPosts = paginate.slice(pageVisited, pageVisited + postPerPage).map((p)=>(
    <Post key={p._id} post = {p} />))
  
  const pageCount = Math.ceil(paginate.length / postPerPage)

  const changePage = ({selected})=>{
      setPageNumber(selected)
    }

  useEffect(()=>{
    const getTimlinePost = async ()=>{
      try{
        const res = username 
        ? await axiosInstance.get("/posts/profile/" + username)
        : await axiosInstance.get("/posts/timeline/" + user?._id)
        setPosts(res.data.sort((p1, p2 )=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt)
        }))
      }catch(err){}
    }
    getTimlinePost();
  },[username, user?._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {displayPosts}
        <ReactPaginate
          previousLabel= {"Previous"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName ={'previousBttn'}
          nextLinkClassName = {'nextBttn'}
          disabledClassName = {'paginationDisabled'}
          activeClassName = {'paginationActive'}
        />
        {/* {posts.map((p)=>(
            <Post key={p._id} post = {p} />
        ))} */}
       

      </div>
      </div>
  )
}
