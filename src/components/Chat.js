import React, { Component } from 'react';
//import io from 'socket.io-client';
import { connect } from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typedMessage: '',
    };

    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('Connection Established');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('new user joined', data);
      });
    });

    socketConnection.on('receive_message', function (data) {
      //add message to state
      const { messages } = self.state;
      const messageObject = {};

      messageObject.content = data.message;

      if (data.userEmail === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const {typedMessage} = this.state;

    if(typedMessage && userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      })
    }
  };

  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png"
            height="17"
            alt=""
          />
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

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
