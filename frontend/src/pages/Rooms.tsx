import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await API.get('/rooms');
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((room: any) => (
          <li key={room.id}>
            <Link to={`/chat/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
