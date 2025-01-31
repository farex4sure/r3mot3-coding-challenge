import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRooms, createRoom } from "../services/roomService" // Import API functions
import "./Rooms.css"

interface Room {
  id: string
  name: string
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [showModal, setShowModal] = useState(false)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms()
        setRooms(data)
      } catch (error) {
        alert("Error fetching rooms")
      }
    }
    fetchRooms()
  }, [])

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return alert("Room name cannot be empty!")
  
    try {
      const newRoom = await createRoom(roomName)
      console.log("Room created successfully:", newRoom) // Log response for debugging
  
      // Check response structure
      if (!newRoom || !newRoom.room.id || !newRoom.room.name) {
        console.error("Invalid room data:", newRoom)
        alert("Room created, but response was invalid.")
      } else {
        setRooms([...rooms, { id: newRoom.room.id, name: newRoom.room.name }]) // Fix: Ensure correct structure
      }
  
      setShowModal(false) // Close modal
      setRoomName("") // Reset input
    } catch (error) {
      console.error("Error creating room:", error) // Log actual error
      alert("Failed to create room. Try again!")
    }
  }
  
  
  

  return (
    <div className="rooms-page">
      <header>
        <h1>Available Rooms</h1>
        <button className="plus-button" onClick={() => setShowModal(true)}>+</button>
      </header>

      <div className="room-main">
        {rooms.length === 0 ? (
          <p className="no-rooms">No rooms available. Create a new one!</p>
        ) : (
          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.id} className="room-item">
                <Link to={`/chat/${room.id}`} className="room-link">
                  <div className="room-avatar">
                    {room.name ? room.name.charAt(0).toUpperCase() : "?"} {/* Fix: Check if room.name exists */}
                  </div>
                  <div className="room-name">{room.name || "Unnamed Room"}</div> {/* Fix: Provide fallback */}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for creating a room */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Room</h2>
            <input
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div>
              <button onClick={handleCreateRoom}>Create</button>
              <button className="close-button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rooms
