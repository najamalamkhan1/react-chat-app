import { auth, provider } from './firebase-config.js';
import { Auth } from './components/Auth';
import { useState, useRef } from 'react';
import Cookies from 'universal-cookie/cjs/Cookies';
import { Chat } from './components/Chat';
import {signOut} from 'firebase/auth';
import { async } from '@firebase/util';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const inputRef = useRef(null)

  const signUserOut =async ()=>{
await signOut(auth)
cookies.remove('auth-token')
setIsAuth(false)
setRoom(null)
  }

  if (!isAuth) {

    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (

    <>
      <div>
        {
          room ? <Chat room={room} /> : (
            <div className='room_div'>
              <label>Enter Room Name:</label>
              <input ref={inputRef} />
              <button onClick={() => { setRoom(inputRef.current.value) }}>Join Room</button>
            </div>
          )
        }
      </div>
      <div className='sign-out'>
        <button onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </>
  )
}
export default App;
