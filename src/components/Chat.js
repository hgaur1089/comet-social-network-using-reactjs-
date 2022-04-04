import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typedMessage: '',
    };

    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = null;
    console.log('Props chat ', props);
  }

  // handleSubmit = () => {
    
  // };

  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png" height="17" alt="" />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.seState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }){
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps)(Chat);
