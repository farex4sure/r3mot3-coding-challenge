import React from 'react';

interface MessageProps {
  message: string;
  sender: string;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sender, isCurrentUser }) => {
  return (
    <div style={{ textAlign: isCurrentUser ? 'right' : 'left', margin: '5px' }}>
      <strong>{sender}:</strong> {message}
    </div>
  );
};

export default Message;
