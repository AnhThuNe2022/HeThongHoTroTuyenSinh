import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";
const ChatRoom = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize Firebase app  
    firebase.initializeApp({
        apiKey: "AIzaSyAU4Gs2L7kbp95I15GGAzQ-ZaeT9dVZADM",
        authDomain: "chat-95b11.firebaseapp.com",
        databaseURL: "https://chat-95b11-default-rtdb.firebaseio.com",
        projectId: "chat-95b11",
        storageBucket: "chat-95b11.appspot.com",
        messagingSenderId: "994115884805",
        appId: "1:994115884805:web:fd860cfd0ddc6ced67896c",
        measurementId: "G-GREZRK4RYG"
    });

    // Authenticate user
    firebase.auth().signInAnonymously()
      .then(user => {
        setUser(user);
      })
      .catch(error => {
        console.log(error);
      });

    // Set up Firebase Realtime Database listener
    const db = getDatabase();
    const messagesRef = db.ref('messages');
    messagesRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        setMessages(messages);
      }
    });

    // Clean up listener when component unmounts
    return () => {
      messagesRef.off();
    };
  }, []);

  const handleSendMessage = event => {
    event.preventDefault();
    const messageInput = event.target.elements.messageInput;
    if (messageInput.value.trim()) {
      const db = firebase.database();
      const messagesRef = db.ref('messages');
      messagesRef.push({
        user: user.uid,
        text: messageInput.value.trim(),
        timestamp: Date.now()
      });
      messageInput.value = '';
    }
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message.user}: </span>
          <span>{message.text}</span>
        </div>
      ))}
      <form onSubmit={handleSendMessage}>
        <input type="text" name="messageInput" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;