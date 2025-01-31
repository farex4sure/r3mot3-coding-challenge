import API from "./api"

const API_BASE_URL = 'http://localhost:8080';

export const getRooms = async () => {
  try {
    const response = await API.get(`${API_BASE_URL}/api/rooms`);
    return response.data
  } catch (error) {
    console.error("Failed to fetch rooms:", error)
    throw error
  }
}

// export const createRoom = async (data: { name: string; }) => {
//     const response = await API.post('/rooms/create-room', data);
//     return response.data.data;
// };

export const createRoom = async (name: string) => {
  try {
    const response = await API.post(`${API_BASE_URL}/api/rooms/create-room`, { name });
    return response.data
  } catch (error) {
    console.error("Failed to create room:", error)
    throw error
  }
}
