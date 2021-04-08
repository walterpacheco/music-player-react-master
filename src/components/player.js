import React, { useState } from "react";

const Player = (props) => {
    const [looped, setLooped] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    let shufflePlaylist = () => {
        let random = Math.floor(Math.random() * props.songs.length);
        if (random !== props.songOn) {
            props.pickSong(random);
            props.setSongOn(random);
            props.playStop();
            props.setIsPlaying(true);
        } else if (random === props.songOn && random === props.songs.length - 1) {
            props.pickSong(random - 1);
            props.setSongOn(random - 1);
            props.playStop();
            props.setIsPlaying(true);
        } else if (random === props.songOn) {
            props.pickSong(random + 1);
            props.setSongOn(random + 1);
            props.playStop();
            props.setIsPlaying(true);
        }
    };
    return (
        <div className="player">
            <i
                className="fas fa-volume-down extra"
                onClick={() => {
                    props.volumeDown();
                }}
            ></i>
            <i
                className="fas fa-volume-up extra"
                onClick={() => {
                    props.volumeUp();
                }}
            ></i>

            <i
                className="fas fa-caret-square-left"
                onClick={() => {
                    if (shuffle === false) {
                        if (props.songs[props.songOn - 1] !== undefined) {
                            props.pickSong(props.songOn - 1);
                            props.playStop();
                            props.setSongOn(props.songOn - 1);
                            props.setIsPlaying(true);
                        } else if (props.songs[props.songOn - 1] === undefined) {
                            props.pickSong(props.songs.length - 1);
                            props.playStop();
                            props.setSongOn(props.songs.length - 1);
                            props.setIsPlaying(true);
                        }
                    } else {
                        shufflePlaylist();
                    }
                }}
            ></i>
            <span
                onClick={() => {
                    if (props.currentSong.current.paused) {
                        props.playStop();
                        props.setIsPlaying(true);
                    } else {
                        props.pauseSong();
                        props.setIsPlaying(false);
                    }
                }}
            >
                {!props.isPlaying ? (
                    <i className="fas fa-play"></i>
                ) : (
                        <i className="fas fa-stop-circle"></i>
                    )}
            </span>
            <i
                className="fas fa-caret-square-right"
                onClick={() => {
                    if (shuffle === false) {
                        if (props.songs[props.songOn + 1] !== undefined) {
                            props.pickSong(props.songOn + 1);
                            props.playStop();
                            props.setSongOn(props.songOn + 1);
                        } else if (props.songs[props.songOn + 1] === undefined) {
                            props.pickSong(0);
                            props.playStop();
                            props.setSongOn(0);
                        }
                    } else {
                        shufflePlaylist();
                    }
                }}
            >
                {" "}
            </i>
            <i
                className={"fas fa-random extra " + (shuffle ? "activeFeature" : "")}
                onClick={() => {
                    if (shuffle === false) {
                        setShuffle(true);
                    } else {
                        setShuffle(false);
                    }
                }}
            ></i>
            <i
                className={"fas fa-redo extra " + (looped ? "activeFeature" : "")}
                onClick={() => {
                    if (looped === false) {
                        props.currentSong.current.loop = true;
                        setLooped(true);
                        console.log(props.songs);
                    } else {
                        props.currentSong.current.loop = false;
                        setLooped(false);
                    }
                }}
 ></i>
   </div>
 );
};

export default Player;