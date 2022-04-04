import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserProfile } from '../actions/profile';
import { addFriend, removeFriend } from '../actions/friends';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      //dispatch an action
      this.props.dispatch(fetchUserProfile(userId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfully!'
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const {match} = this.props;
    const url = APIUrls.removeFriend(match.params.userId);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed Friend Successfully!'
      });

      this.props.dispatch(removeFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading...</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error, successMessage } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="btn save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="btn save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              remove Friend
            </button>
          )}

          {success && (
            <div className="alert success-dailog">
             {successMessage}
            </div>
          )}

          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapPropsToState({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapPropsToState)(UserProfile);
