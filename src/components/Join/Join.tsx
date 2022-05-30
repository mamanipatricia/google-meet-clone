import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {encodeId, decodeId} from 'Utils/hashIds';

export default function Join() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const handleNewMeeting = (e: any) => {
    const roomCode = encodeId(+new Date());
    navigate(`/room/${roomCode}`);
  };

  const handleJoinMeeting = (e: any) => {
    e.preventDefault();
    if (!roomName) {
      alert('Please enter a room name');
      return;
    }

    const roomCodeDecoded = decodeId(roomName);
    if (roomCodeDecoded) {
      navigate(`/room/${roomName}`);
    } else {
      alert('Invalid room code');
    }
  };

  return (
    <div>
      <button onClick={handleNewMeeting} type="submit">
        New Meeting
      </button>
      <form onSubmit={handleJoinMeeting} className="start-form">
        <input
          type="text"
          id="username"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
}
