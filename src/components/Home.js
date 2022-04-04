import React from 'react';
import { PostLists, FriendsList, Chat } from './';

class Home extends React.Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostLists posts={posts} />
        {isLoggedin && <FriendsList friends="friends" />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}
export default Home;
