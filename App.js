import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3000')
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    // this.socket = io.connect("https://itskills-chat-app.herokuapp.com");
    this.socket = io('https://itskills-chat-app.herokuapp.com', {
      transports: ['websocket']
    })

    this.socket.on("chat message", msg => {
      console.warn(msg[0]);

      this.setState({
        chatMessages: [...this.state.chatMessages, msg[0]]
      });
    });

    this.socket.on("join group", user => {
      console.log("this is the user");
      console.log(user);


    });

    console.log("this is frm io");
    console.log(this.state.chatMessages);

  }

  submitChatMessage() {
    console.log("fro msend mes");

    const sendMessage = {
      content: `${this.state.chatMessage}`,
      targetId: 'adhfbajdvafjvdjhfvhvusdvfv',
      senderInfo: {
        avatar: 'avatar link',
        id: 'your id',
        nickname: 'big head',
        username: 'Remi'
      },

    }
    this.socket.emit('chat message', sendMessage);
    this.setState({ chatMessage: '' });

  }

  joinGroup = () => {
    const userData = {
      name: 'nelson',
      id: 'gdfgaduuibhbsidbfibsui'
    }

    this.socket.emit('join group', userData);
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2, top: 500 }}>
        <Text>{chatMessage.username}</Text>
        {chatMessage.content}
      </Text>
    ));

    return (
      <View style={styles.container}>
        {chatMessages}
        <View>
          <TouchableOpacity onPress={this.joinGroup}>
            <Text>JOIN GROUP</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{ height: 40, borderWidth: 2, top: 600 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});