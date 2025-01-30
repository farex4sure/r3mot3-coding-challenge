import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import Message from './Message';

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const socket = useSocket();
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', roomId);

      socket.on('message', (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });
    }

    return () => {
      socket?.off('message');
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('sendMessage', { roomId, message, sender: username });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} sender={msg.sender} isCurrentUser={msg.sender === username} />
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
