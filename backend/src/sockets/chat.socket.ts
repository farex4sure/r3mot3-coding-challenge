import { Server, Socket } from 'socket.io';

interface MessageData {
  roomId: string;
  message: string;
  sender: string;
}

// Handle chat socket events
export const handleChatSocket = (socket: Socket, io: Server) => {
  // console.log(`✅ Socket connected: ${socket.id}`);

  // Join a Room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    // console.log(`👥 User joined room: ${roomId}`);
  });

  // Send a Message
  socket.on('sendMessage', ({ roomId, message, sender }: MessageData) => {
    // console.log(`📩 Message from ${sender}: ${message} in room ${roomId}`);
    io.to(roomId).emit('message', { sender, message });
  });

  // Disconnect Event
  socket.on('disconnect', () => {
    // console.log(`❌ Socket disconnected: ${socket.id}`);
  });
};
