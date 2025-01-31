import API from "./api"

export const getRooms = async () => {
  try {
    const response = await API.get(`/rooms`);
    return response.data.data
  } catch (error) {
    console.error("Failed to fetch rooms:", error)
    throw error
  }
}


export const createRoom = async (name: string) => {
  try {
    const response = await API.post(`/rooms/create-room`, { name });
    return response.data.data
  } catch (error) {
    console.error("Failed to create room:", error)
    throw error
  }
}
