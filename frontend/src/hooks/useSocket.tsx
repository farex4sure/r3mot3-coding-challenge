// import { useEffect, useRef } from 'react';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';


const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:8080';

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return socket.current;
};
