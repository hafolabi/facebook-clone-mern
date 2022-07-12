import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { axiosInstance } from "../../config";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.followings.includes(user?._id));

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosInstance.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {}
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if(followed){
        await axiosInstance.put('/users/' + user._id + '/unfollow', {userId: currentUser._id})
        dispatch({type:'UNFOLLOW', payload:user._id})
      }else{
        await axiosInstance.put('/users/' + user._id + '/follow', {userId: currentUser._id})
        dispatch({type:'FOLLOW', payload:user._id})
      }
      
    } catch (err) {}
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Ayo Salami</b> and <b>3 other friends</b> have a birthday today``
          </span>
        </div>

        <img src={PF + "ad.jpg"} alt="" className="rightbarAd" />

        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        {user.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentUser?.followings.filter((item)=>item === user._id)[0]   ? 'Unfollow' : 'Follow'}
            {currentUser?.followings.filter((item)=>item === user._id)[0]   ? <Remove />: <Add /> }
          </button>
        )}
        <h4 className="rightbarTitle">User Infomation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue"> {user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue"> {user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {" "}
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link key={friend._id} to={"/profile/" + friend.username} style={{textDecoration:'none', color:'inherit'}}>
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "posts/avatar.png"
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
