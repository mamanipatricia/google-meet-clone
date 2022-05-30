import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import * as Video from 'twilio-video';
import {decodeId} from 'Utils/hashIds';
// import {hashIdsSalt} from 'Utils/hashIds';

export default function Room() {
  let {roomCode} = useParams();
  const [username, setUsername] = useState('');
  const [isJoinedToMeeting, setIsJoinedToMeeting] = useState(false);

  React.useEffect(() => {
    console.log('Room component mounted - outside', roomCode);
    if (roomCode) {
      console.log('Room component mounted', roomCode);
      const roomCodeDecoded = decodeId(roomCode);
      if (roomCodeDecoded) {
        console.log('roomCodeDecoded>>', roomCodeDecoded);
        // mostrar un previo screen para ingresar el username
      } else {
        alert('invalid room code');
        //redirect to home
      }
    }
  }, [roomCode]);

  // connecting to twilio
  const twilioConnect = (token: string) => {
    console.log('twilioConnect...');
    Video.connect(token, {
      name: roomCode,
      audio: true,
      video: true,
    }).then((room) => {
      console.log('Connected to Room "%s"', room.name);

      room.participants.forEach(participantConnected);
      room.on('participantConnected', participantConnected);

      room.on('participantDisconnected', participantDisconnected);
      room.once('disconnected', (error) =>
        room.participants.forEach(participantDisconnected)
      );
    });
  };

  const participantConnected = (participant: any) => {
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement('div');
    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.on('trackSubscribed', (track: any) =>
      trackSubscribed(div, track)
    );
    participant.on('trackUnsubscribed', trackUnsubscribed);

    participant.tracks.forEach((publication: any) => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });

    document.body.appendChild(div);
  };

  function participantDisconnected(participant: any) {
    console.log('Participant "%s" disconnected', participant.identity);
    document.getElementById(participant.sid)?.remove();
  }

  function trackSubscribed(div: any, track: any) {
    div.appendChild(track.attach());
  }

  function trackUnsubscribed(track: any) {
    track.detach().forEach((element: any) => element.remove());
  }

  const handleJoinMeeting = async (e: any) => {
    e.preventDefault();
    setIsJoinedToMeeting(true);
    // get access token
    const tokenResponse = await fetch(
      `https://google-meet-clone-6520.twil.io/get_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: roomCode,
          username,
        }),
      }
    );
    const token = await tokenResponse.json();
    // connect to twilio
    twilioConnect(token);
  };

  return (
    <div>
      {isJoinedToMeeting ? (
        <div>LIST OF PARTICIPANTS</div>
      ) : (
        <form onSubmit={handleJoinMeeting} className="start-form">
          <label htmlFor="username">
            username
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button type="submit" disabled={!username}>
            Join Meeting
          </button>
        </form>
      )}
    </div>
  );
}
