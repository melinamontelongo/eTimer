import { TiMediaPlay, TiMediaPause, TiRefresh } from "react-icons/ti";

const Controls = ({ isRunning, clickStartStop, clickReset, iconsColor }) => {
    return (
        <div className="text-4xl flex justify-center" style={{color: iconsColor}}>
            <button onClick={clickStartStop} className="flex drop-shadow-lg hover:scale-150 transition-transform duration-500 ease-in-out" id="start_stop">
                {isRunning ? <TiMediaPause /> : <TiMediaPlay />}
            </button>
            <button onClick={clickReset} className="drop-shadow-lg hover:scale-150 transition-transform duration-500 ease-in-out" id="reset">
                <TiRefresh />
            </button>

        </div>
    )
}

export default Controls;