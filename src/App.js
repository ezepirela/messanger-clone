import React, {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel, IconButton } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './App.css';
import Message from './Components/Message';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState();
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState('');
  const handleValue = event => {
    event.preventDefault();
    setInput(event.target.value); 
  };
  const sendMessage = (event) => {
    event.preventDefault();
    // setMessage([...message, {username: username, message: input}]);
    db.collection('messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  };
  useEffect( () => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => { // every time the DB changes, 
    setMessage(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));//this code will run and all the documents in the collection are save into the snapshot object
    }); 
                                                    
  }, []);
  useEffect(() => {
    setUsername(prompt('Please enter your Username'));
  }, [])
  return (
    <div className='App'>
      <h1>Facebook Messanger Clone</h1>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className='app__input'placeholder='enter a message...'value={input} onChange={handleValue}/>
          <IconButton className='app__iconButton'disabled={!input} variant="contained" color='primary'onClick={sendMessage}type='submit'>
            <SendIcon />
          </IconButton>
        </FormControl>
        </form>
        <FlipMove>
        {message.map(({id, message}) => (
          <Message key={id} username={username} message={message}/>
        ))}
        </FlipMove>
    </div>
  );
}

export default App;
