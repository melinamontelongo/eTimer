import { useReducer, useEffect, useState, useRef } from 'react';
import tinycolor from "tinycolor2";
import './App.css';
import Timer from "./components/Timer";
import TimeLength from "./components/TimeLength";
import Controls from "./components/Controls";
import Player from "./components/Player";
import Spinner from "./components/Spinner";

//To set the background image after the fetch
function setBodyStyle(obj) {
  document.body.style.backgroundColor = obj.color
  document.body.style.backgroundImage = `url(${obj.url})`
  document.body.style.backgroundSize = `cover`
  document.body.style.backgroundRepeat = "no-repeat"
}
function getDynamicColor(colorValue) {
  const color = tinycolor(colorValue);
  return color.isDark() ? "#fff" : "#000"
}

//Formats time into mm:ss format
function timeFormatter(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
  return formattedTime;
}

function reducer(state, action) {
  switch (action.type) {
    case "increment_session":
      if (!state.isRunning) {
        if (state.isSession) {
          return { ...state, timeLeft: state.sessionTime + 60, sessionTime: state.sessionTime + 60 }
        } return { ...state, sessionTime: state.sessionTime + 60 }
      } return state;
    case "decrement_session":
      if (!state.isRunning && state.sessionTime - 60 > 1) {
        if (state.isSession) {
          return { ...state, timeLeft: state.sessionTime - 60, sessionTime: state.sessionTime - 60 }
        } return { ...state, sessionTime: state.sessionTime - 60 }
      } return state;
    case "increment_break":
      if (!state.isRunning) {
        if (state.isBreak) {
          return { ...state, timeLeft: state.breakTime + 60, breakTime: state.breakTime + 60 }
        } return { ...state, breakTime: state.breakTime + 60 }
      } return state;
    case "decrement_break":
      if (!state.isRunning && state.breakTime - 60 > 1) {
        if (state.isBreak) {
          return { ...state, timeLeft: state.breakTime - 60, breakTime: state.breakTime - 60 }
        } return { ...state, breakTime: state.breakTime - 60 }
      } return state;
    case "reset":
      return { timeLeft: 25 * 60, breakTime: 5 * 60, sessionTime: 25 * 60, isRunning: false, isSession: true, isBreak: false }
    case "start_stop":
      return { ...state, isRunning: !state.isRunning }
    case "run_timer":
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 }
      } else if (state.timeLeft === 0 && state.isSession) {
        return { ...state, timeLeft: state.breakTime, isSession: false, isBreak: true }
      } else if (state.timeLeft === 0 && state.isBreak) {
        return { ...state, timeLeft: state.sessionTime, isSession: true, isBreak: false }
      } else return state;
    default:
      return state
  }
}
function App() {
  //Timer state
  const [state, dispatch] = useReducer(reducer, {
    timeLeft: 25 * 60, breakTime: 5 * 60, sessionTime: 25 * 60, isRunning: false, isSession: true, isBreak: false
  })
  //Background object
  const [background, setBackground] = useState({});

  const [isReady, setReady] = useState(false);

  //Ref to alarm audio
  const alarm = useRef(null)
  //Gets the background image (from localStorage or fetches it)
  useEffect(() => {
    const CHECK_LOCAL_IMG = localStorage.getItem("bg-img")
    if (!CHECK_LOCAL_IMG) {
      const ACCESS_KEY = import.meta.env.VITE_REACT_APP_ACCESS_KEY
      fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&query=sunset&orientation=landscape&content_filter=high`)
        .then((res) => res.json())
        .then((data) => {
          const BACKGROUND_OBJ = {
            color: data.color,
            accents: getDynamicColor(data.color),
            url: data.urls.full,
            photographer: data.user.username
          }
          localStorage.setItem("bg-img", JSON.stringify(BACKGROUND_OBJ));
          setBackground(BACKGROUND_OBJ);
          setBodyStyle(BACKGROUND_OBJ);
          return
        })
        .then(() => setReady(true))
    } else {
      const LOCAL_IMG_OBJ = JSON.parse(CHECK_LOCAL_IMG)
      setBackground(LOCAL_IMG_OBJ);
      setBodyStyle(LOCAL_IMG_OBJ);
      setReady(true);
    }
  }, [])
  //Runs the timer
  useEffect(() => {
    let interval;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "run_timer" })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [state.isRunning])
  //Plays the alarm
  useEffect(() => {
    if (state.timeLeft === 0) {
      alarm.current.play()
      alarm.currentTime = 0;
    }
  })
  //Click handlers
  const incrementSession = () => {
    dispatch({ type: "increment_session" })
  }
  const decrementSession = () => {
    dispatch({ type: "decrement_session" })
  }
  const incrementBreak = () => {
    dispatch({ type: "increment_break" })
  }
  const decrementBreak = () => {
    dispatch({ type: "decrement_break" })
  }
  const resetTimer = () => {
    dispatch({ type: "reset" })
  }
  const startStop = () => {
    dispatch({ type: "start_stop" })
  }
  const componentStyle = {
    color: background.color,
    textShadow: `-1px -1px 0 ${background.accents}, 
              1px -1px 0 ${background.accents},
              -1px 1px 0 ${background.accents},
              1px 1px 0 ${background.accents}`
  }
  const playerStyle = {
    backgroundColor: background.color,
    color: background.accents,
    border: `solid ${background.accents} 1px`
  }
  return (
    <div className="container mx-auto w-full h-full">
      <Spinner isReady={isReady} />
      <h1 className="text-6xl font-venice" style={componentStyle}>eTimer</h1>
      <div className="flex">
        <div className="w-1/2 m-2 grid place-content-center backdrop-contrast-75 backdrop-blur rounded-md shadow-lg shadow-neutral-900/25" style={componentStyle}>
          <TimeLength iconsColor={background.accents} clickDown={decrementBreak} clickUp={incrementBreak} text="Break" length={timeFormatter(state.breakTime)} />
        </div>
        <div className="w-1/2 m-2 grid place-content-center backdrop-contrast-75 backdrop-blur rounded-md shadow-lg shadow-neutral-900/25" style={componentStyle}>
          <TimeLength iconsColor={background.accents} clickDown={decrementSession} clickUp={incrementSession} text="Session" length={timeFormatter(state.sessionTime)} />
        </div>
      </div>
      <div className="flex">
        <div className="w-full m-2 rounded-md backdrop-contrast-75 backdrop-blur shadow-lg shadow-neutral-900/25" style={componentStyle}>
          <Timer text={state.isSession ? "Session" : "Break"} time={timeFormatter(state.timeLeft)} isRunning={state.isRunning} />
        </div>
        <audio ref={alarm} id="beep" src="./sounds/alarm.mp3"></audio>
      </div>
      <div className="flex">
        <div className="w-full">
          <Controls isRunning={state.isRunning} iconsColor={background.accents} clickStartStop={startStop} clickReset={resetTimer} />
        </div>
      </div>
      <div className="flex">
        <div className="w-full grid place-content-center mt-4">
          <Player btnStyle={playerStyle} />
        </div>
      </div>
      <div className="font-pixel mt-5" style={{ color: background.accents }}>
        <p>Photo by <a className="underline" href={`https://unsplash.com/@${background.photographer}?utm_source=eTimer&utm_medium=referral`}>{background.photographer}</a> on <a className="underline" href="https://unsplash.com/?utm_source=eTimer&utm_medium=referral">Unsplash</a></p>
      </div>
    </div>
  )
}

export default App
