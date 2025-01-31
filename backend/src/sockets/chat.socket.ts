import { Server, Socket } from 'socket.io';

// Define the structure of the message data
interface MessageData {
  roomId: string; // The ID of the room where the message is sent
  message: string; // The content of the message
  sender: string;  // The sender of the message
}

// Handle chat socket events
export const handleChatSocket = (socket: Socket, io: Server) => {
  // console.log(`✅ Socket connected: ${socket.id}`);

  // Join a Room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId); // Add the socket to the specified room
    // console.log(`👥 User joined room: ${roomId}`);
  });

  // Send a Message
  socket.on('sendMessage', ({ roomId, message, sender }: MessageData) => {
    // console.log(`📩 Message from ${sender}: ${message} in room ${roomId}`);
    io.to(roomId).emit('message', { sender, message }); // Emit the message to the room
  });

  // Disconnect Event
  socket.on('disconnect', () => {
    // console.log(`❌ Socket disconnected: ${socket.id}`); // Log when the socket disconnects
  });
};
