import React from 'react';
import { FriendsListItem } from './FriendsListItem';

const FriendsList = (props) => {
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No Friends Found1</div>
      )}
      {props.friends &&
        props.friendsmap((friend) => (
          <FriendsListItem friend={friend.to_user} key={friend._id} />
        ))}
    </div>
  );
};
export default FriendsList;
