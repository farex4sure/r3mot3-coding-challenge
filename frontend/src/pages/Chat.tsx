import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { fetchMessages, sendMessageToApi } from '../services/chatService';
import './Chat.css';

const Chat: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const socket = useSocket();
  const [messages, setMessages] = useState<{ username: string; content: string }[]>([]);
  const [message, setMessage] = useState('');
  const sender = localStorage.getItem('username') || 'User';

  // Fetch previous messages from API
  useEffect(() => {
    const getMessages = async () => {
      if (!roomId) return; // Ensure roomId exists
      const data = await fetchMessages(roomId);
      setMessages(data);
    };
  
    getMessages();
  }, [roomId]);

  // WebSocket listener for new messages
  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', roomId);

      socket.on('message', async (newMessage) => {
        // Fetch messages again after receiving a new message
        if (roomId) {
          const data = await fetchMessages(roomId);
          setMessages(data);
        }
      });
    }

    return () => {
      socket?.off('message');
    };
  }, [socket, roomId]);

  const sendMessage = async () => {
    if (!roomId || !message.trim()) return; // Ensure roomId exists
    const newMessage = { roomId, message };
  
    socket?.emit('sendMessage', newMessage);
    await sendMessageToApi(roomId, message);
    
    // Fetch messages again after sending
    const data = await fetchMessages(roomId);
    setMessages(data);
    
    setMessage('');
  };

  return (
    <div>
      <header className="chat-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 style={{ color: "white", textAlign: "center" }}>Chat Room</h1>
      </header>
      <div className="chat-container">
        {/* Left Side - Input Section */}
        <div className="chat-left">
          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* Right Side - Messages Section */}
        <div className="chat-right">
          <div className="messages">
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.username === sender ? 'sent' : 'received'}`}>
                  <span className="sender">{msg.username}</span>
                  <p>{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Chat;
