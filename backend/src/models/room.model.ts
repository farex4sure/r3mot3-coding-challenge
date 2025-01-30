import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Room extends Model {}

Room.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'room',
  timestamps: false,
});

export default Room;
