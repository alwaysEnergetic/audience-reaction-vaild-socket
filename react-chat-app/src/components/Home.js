import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <div className="wrap-one">
            <div className="firstBox">
              <span>Input Name</span>
              <input
                className="text"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <span>Input Room</span>
              <input
                className="text"
                type="text"
                onChange={(event) => setRoom(event.target.value)}
                required
              />
            </div>
          </div>
          <br />
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
            className="btn"
          >
            <button className="join-button" type="submit">
              Join
            </button>
          </Link>
        </header>
      </div>
    </div>
  );
};

export default Home;
