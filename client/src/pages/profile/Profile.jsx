import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../config";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  //to select the exact username from the browers address bar,the useEffect axios get wil use
  const username = useParams().username;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/?username=${username}`);
        setUser(res.data);
      } catch (err) {}
    };
    getUser();
  }, [username]);

  return (
    <>
      <Topbar />
      
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : PF + "posts/coverPhoto.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "posts/avatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
