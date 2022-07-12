import React, { useContext, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications, FormatListBulleted } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Cancel,
  Bookmark,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import Friends from "../../components/friends/Friends";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sidebar, setSidebar] = useState(false);

  const {dispatch} = useContext(AuthContext);

  const handleLogout=()=>{
    dispatch({type: "LOGOUT"})
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      
        <FormatListBulleted className="FormatListBulleted" onClick={() => setSidebar(true)} />
        {sidebar && (
          <div className="sidebarMobile">
            <div className="sidebarWrapper">
              <Cancel
                className="closeSidebar"
                onClick={() => setSidebar(false)}
              />
              <ul className="sidebarList">
                <li className="sidebarListItem">
                  <RssFeed className="sidebarIcon" />
                  <span className="sidebarListItemText">Feed</span>
                </li>

                <li className="sidebarListItem">
                  <Chat className="sidebarIcon" />
                  <span className="sidebarListItemText">Chats</span>
                </li>

                <li className="sidebarListItem">
                  <PlayCircleFilledOutlined className="sidebarIcon" />
                  <span className="sidebarListItemText">Videos</span>
                </li>

                <li className="sidebarListItem">
                  <Group className="sidebarIcon" />
                  <span className="sidebarListItemText">Groups</span>
                </li>

                <li className="sidebarListItem">
                  <Bookmark className="sidebarIcon" />
                  <span className="sidebarListItemText">Bookmarks</span>
                </li>

                <li className="sidebarListItem">
                  <HelpOutline className="sidebarIcon" />
                  <span className="sidebarListItemText">Questions</span>
                </li>

                <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  <span className="sidebarListItemText">Jobs</span>
                </li>

                <li className="sidebarListItem">
                  <Event className="sidebarIcon" />
                  <span className="sidebarListItemText">Events</span>
                </li>

                <li className="sidebarListItem">
                  <School className="sidebarIcon" />
                  <span className="sidebarListItemText">Courses</span>
                </li>
              </ul>

              <button className="sidebarButton" onClick={()=> handleLogout()}>Logout</button>
              <hr className="sidebarHr" />

              <ul className="sidebarFriendList">
                {Users.map((user) => (
                  <Friends key={user.id} user={user} />
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Topbar Component */}

        <Link to="/" className="link">
          <span className="logo">theinsights</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="search for friends, posts, videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Notifications className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "posts/avatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
