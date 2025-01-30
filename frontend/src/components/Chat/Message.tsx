import type React from "react"

interface MessageProps {
  message: string
  sender: string
  isCurrentUser: boolean
}

const Message: React.FC<MessageProps> = ({ message, sender, isCurrentUser }) => {
  return (
    <div
      style={{
        textAlign: isCurrentUser ? "right" : "left",
        margin: "5px",
        padding: "8px 12px",
        backgroundColor: isCurrentUser ? "#dcf8c6" : "#ffffff",
        borderRadius: "8px",
        display: "inline-block",
        maxWidth: "70%",
      }}
    >
      <strong>{sender}:</strong> {message}
    </div>
  )
}

export default Message

