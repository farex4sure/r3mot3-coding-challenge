import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchMessages = async (roomId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chats/messages/${roomId}`);
    // const token = localStorage.getItem('token');
    return response.data; // Assuming API returns an array of messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const sendMessageToApi = async (roomId: string, content: string) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE_URL}/api/chats/send-messages/${roomId}`, 
      { roomId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error saving message:', error);
  }
};
