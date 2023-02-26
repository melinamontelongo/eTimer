import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

const TimeLength = ({ text, length, clickUp, clickDown, iconsColor }) => {
    const idText = text.toLowerCase()
    const displayLength = parseInt(length.split(":")[0])
    return (
        <div className="p-8 drop-shadow-md">
            <h4 id={`${idText}-label`} className="text-4xl font-venice mb-2">{text} Length</h4>
            <div className="flex justify-center text-4xl">
            <TiArrowDownThick className="drop-shadow-lg cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out" id={`${idText}-decrement`} onClick={clickDown} style={{color: iconsColor}} />
            <h5 id={`${idText}-length`} className="text-2xl font-senior">{displayLength}</h5>
            <TiArrowUpThick className="drop-shadow-lg cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out" id={`${idText}-increment`} onClick={clickUp} style={{color: iconsColor}}/>
            </div>
        </div>
    )
}

export default TimeLength;