import { useState, useRef } from "react";

const Player = ({ btnStyle }) => {
    const ytPlayer = useRef(null);
    const togglePlayer = () => {
        ytPlayer.current.classList.toggle("hidden");
    };
    const modalBgStyle = {
        backgroundColor: btnStyle.backgroundColor,
        border: btnStyle.border
    }
    const modalTextStyle = {
        color: btnStyle.color
    }
    return (
        <div className="">
            <button type="button" className="font-pixel p-1 px-2 rounded-lg hover:scale-110 transition-transform duration-500 ease-in-out" style={btnStyle} onClick={togglePlayer}>
                Want to hear some music?
            </button>

                <div ref={ytPlayer} className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm bg-opacity-50 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={modalBgStyle}>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4" >
                                    <div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                            <h3 className="text-4xl font-venice leading-6" id="modal-title" style={modalTextStyle}>Here's some music to help you complete your tasks</h3>
                                            <div className="mt-5 mb-5 flex justify-center">
                                                <iframe style={{border: modalBgStyle.border}} width="400" height="200" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                            </div>
                                            <p className="text-lg  font-venice" style={modalTextStyle} >Continue working as it plays. Good luck!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 -mt-4 mb-2 flex justify-center sm:px-6">
                                    <button onClick={togglePlayer} style={btnStyle} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1 text-base text-white font-pixel shadow-sm sm:ml-3 sm:w-auto sm:text-md">Let's Go!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Player;