const Clock = ({ time, text, isRunning }) => {
    return (
        <div className={`p-8 drop-shadow-md ${isRunning ? "" : "animate-bounce-slow"}`}>
            <h4 id="timer-label" className={`text-5xl font-venice mb-2`}>{text}</h4>
            <h5 id="time-left" className={`text-4xl font-senior ${parseInt(time.split(":")[0]) < 1 ? "text-red-600" : ""}`}>{time}</h5>
        </div>
    )
}

export default Clock;