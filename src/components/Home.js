import React from 'react';
import { PostLists, FriendsList } from './';

class Home extends React.Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostLists posts={posts} />
        {isLoggedin && <FriendsList friends="friends" />}
      </div>
    );
  }
}
export default Home;
