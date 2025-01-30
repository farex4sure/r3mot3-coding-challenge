import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import "./Rooms.css"

interface Room {
  id: string
  name: string
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await API.get("/rooms")
        setRooms(response.data)
      } catch (error) {
        console.error("Failed to fetch rooms:", error)
      }
    }
    fetchRooms()
  }, [])

  return (
    <div className="rooms-page">
      <header>
        <h1 style={{ color: "white" }}>Available Rooms</h1>
      </header>
      <div className="room-main">
        {rooms.length === 0 ? (
          <p className="no-rooms">No rooms available. Create a new one!</p>
        ) : (
          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.id} className="room-item">
                <Link to={`/chat/${room.id}`} className="room-link">
                  <div className="room-avatar">{room.name.charAt(0)}</div>
                  <div className="room-name">{room.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Rooms

