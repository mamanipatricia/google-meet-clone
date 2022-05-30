import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Room from './Pages/Room/Room';

function App() {
  return (
    <div>
      GOOGLE MEET CLONE
      {/*  meet.google.com/id */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
