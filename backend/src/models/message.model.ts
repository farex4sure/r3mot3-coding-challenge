import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.UUID, // Unique identifier for the message
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID if not provided
    primaryKey: true, // This field is the primary key
  },
  content: {
    type: DataTypes.TEXT, // The content of the message
    allowNull: false, // Content cannot be null
  },
  userId: {
    type: DataTypes.UUID, // Identifier for the user who sent the message
    allowNull: false, // User ID cannot be null
  },
  roomId: {
    type: DataTypes.UUID, // Identifier for the room where the message was sent
    allowNull: false, // Room ID cannot be null
  },
}, {
  sequelize,
  modelName: 'message', // Name of the model
  timestamps: false, // Disable automatic timestamps
});

export default Message;
