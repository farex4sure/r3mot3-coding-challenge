import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useSocket } from "../../hooks/useSocket"
import Message from "./Message"
import "./ChatRoom.css"

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const socket = useSocket()
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([])
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState(localStorage.getItem("username") || "User")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", roomId)

      socket.on("message", (newMessage) => {
        setMessages((prev) => [...prev, newMessage])
      })
    }

    return () => {
      socket?.off("message")
    }
  }, [socket, roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef]) //Corrected dependency

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (socket && message.trim()) {
      socket.emit("sendMessage", { roomId, message, sender: username })
      setMessage("")
    }
  }

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Chat Room: {roomId}</h2>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} sender={msg.sender} isCurrentUser={msg.sender === username} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input" onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatRoom

