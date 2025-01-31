// import axios from 'axios';
import API from './api';

// const API_BASE_URL = process.env.REACT_APP_API_URL

export const fetchMessages = async (roomId: string) => {
  try {
    const response = await API.get(`/chats/messages/${roomId}`);
    // const token = localStorage.getItem('token');
    return response.data.data; // Assuming API returns an array of messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const sendMessageToApi = async (roomId: string, content: string) => {
  try {
    const token = localStorage.getItem('token');
    await API.post(`/chats/send-messages/${roomId}`, 
      { roomId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error saving message:', error);
  }
};
