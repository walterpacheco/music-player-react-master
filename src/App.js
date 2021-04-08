import React, { useState, useRef, useEffect } from "react";
import Listado from "./components/list";
import Player from "./components/player";

function App() {
  const [songs, setSongs] = useState([]);

  let getFetch = () => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setSongs((prevState) => {
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  let pickSong = (index) => {
    songPlayer.current.src = `https://assets.breatheco.de/apis/sound/${songs[index].url}`;
  };
  let playStop = () => {
    songPlayer.current.play();
  };

  let pauseSong = () => {
    songPlayer.current.pause();
  };
  let songPlayer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songOn, setSongOn] = useState(0);

  let volumeUp = () => {
    if (songPlayer.current.volume < 1) {
      songPlayer.current.volume = Math.min(songPlayer.current.volume + 0.1, 1);
    }
  };

  let volumeDown = () => {
    if (songPlayer.current.volume > 0) {
      songPlayer.current.volume = Math.max(songPlayer.current.volume - 0.1, 0);
    }
  };

  return (
    <>
      <div className="cell">
        <div className="inside">
          <Listado
            songs={songs}
            currentSong={songPlayer}
            playStop={playStop}
            pickSong={pickSong}
            pauseSong={pauseSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSongOn={setSongOn}
            songOn={songOn}
            isPlaying={isPlaying}
          />
        </div>
        <div className="bottomfixed">
          <Player
            songs={songs}
            playStop={playStop}
            currentSong={songPlayer}
            pauseSong={pauseSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            pickSong={pickSong}
            setSongOn={setSongOn}
            songOn={songOn}
            volumeDown={volumeDown}
            volumeUp={volumeUp}
          />
        </div>
      </div>

      <audio
        src={
          songs[0] !== null && songs[0] !== undefined
            ? "https://assets.breatheco.de/apis/sound/" + songs[0].url
            : ""
        }
        ref={songPlayer}
      />
    </>
  );
}

export default App;