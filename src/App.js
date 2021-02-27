import React, { useState, useEffect } from 'react';
import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

// useState = VARIABLE in react
// useEffect = run code on a CONDITION

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    // { username: 'vanessa', message: 'hey guys' },
    // { username: 'toro', message: 'learning react' },
    // { username: 'moi', message: 'love you dudes' },
  ]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // run once when the app component loads
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    //run code here...
    setUsername(prompt('Please enter your name'));
  }, []); // <= condition here. If its blank inside [], this code runs ONCE when the app component loads

  const sendMessage = (e) => {
    // all the logic to send message goes here
    e.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className='App'>
      <img src='https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100' />
      <h1>Molino Private Chat (づ｡◕‿‿◕｡)づ</h1>
      <h2>Welcome {username}!</h2>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input
            className='app__input'
            placeholder='Enter a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className='app__iconButton'
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
