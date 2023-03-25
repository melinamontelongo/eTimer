import { useState, useRef } from "react";
import UnsplashCredit from "./UnsplashCredit";

const ChangeBg = ({ btnStyle, clickHandler, dynamicColor, setBg, setBody, imagesCollection }) => {
    const [savedImage, setSavedImage] = useState(null);

    const bgModal = useRef(null);
    const modalOpen = () => {
        bgModal.current.classList.remove("hidden");
        clickHandler()
    };
    const modalClose = () => {
        bgModal.current.classList.add("hidden");
    }
    const chooseImg = (e) => {
        //Remove style to previous selected image
        if (savedImage !== null) {
            document.getElementById(savedImage.id).classList.remove("contrast-50");
        };
        const chosenImg = e.target;
        //Add style to current selected image
        chosenImg.classList.add("contrast-50")
        //Current selected image information
        const chosenImgInfo = {
            id: chosenImg.id,
            color: chosenImg.dataset.color,
            accents: dynamicColor(chosenImg.dataset.color),
            url: chosenImg.dataset.full,
            photographer: chosenImg.dataset.photographer,
            download_link: chosenImg.dataset.download
        };
        setSavedImage(chosenImgInfo);
    }
    const modalRefresh = () => {
        //Remove current stored collection
        localStorage.removeItem("bg-img-collection");
        setSavedImage(null);
        clickHandler();
    }
    const modalSave = async () => {
        //Save the current selected image and display it
        localStorage.setItem("bg-img", JSON.stringify(savedImage));
        setBg(savedImage);
        setBody(savedImage);
        //Comply with Unsplash guidelines (triggering downloads)
        const triggerDownload = await fetch(savedImage.download_link);
        //Close the modal
        bgModal.current.classList.add("hidden");
    }
    const modalBgStyle = {
        backgroundColor: btnStyle.backgroundColor,
        border: btnStyle.border
    }
    const modalTextStyle = {
        color: btnStyle.color
    }
    return (
        <div className="">
            <button type="button" className="w-full font-pixel p-1 px-2 rounded-lg hover:scale-110 transition-transform duration-500 ease-in-out" style={btnStyle} onClick={modalOpen}>
                Choose another background
            </button>

            <div ref={bgModal} className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm bg-opacity-50 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={modalBgStyle}>
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4" >
                                <div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <h3 className="text-4xl font-venice leading-6" id="modal-title" style={modalTextStyle}>Here are some backgrounds to choose from</h3>
                                        <div className="mt-5 mb-5 grid grid-cols-3 gap-1 place-items-center">
                                            {imagesCollection !== null &&
                                                imagesCollection.map((image) =>
                                                    <img
                                                        key={image.id}
                                                        title={`Photo by ${image.user.username} on Unsplash`}
                                                        alt={`Photo by ${image.user.username} on Unsplash`}
                                                        className="w-full h-full object-cover hover:contrast-50 rounded"
                                                        style={{ border: modalBgStyle.border }}
                                                        id={image.id}
                                                        src={image.urls.thumb}
                                                        data-full={image.urls.full}
                                                        data-color={image.color}
                                                        data-photographer={image.user.username}
                                                        data-download={image.links.download_link}
                                                        onClick={chooseImg}>
                                                    </img>
                                                )
                                            }
                                        </div>
                                        {savedImage ? <UnsplashCredit color={modalTextStyle.color} photographer={savedImage.photographer} /> : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 -mt-4 mb-2 flex justify-center sm:px-6">
                                <button type="button" style={btnStyle} className="hover:scale-110 transition-transform duration-500 ease-in-out inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1 text-base text-white font-pixel shadow-sm sm:ml-3 sm:w-auto sm:text-md" onClick={modalRefresh}>Refresh</button>
                                <button type="button" style={btnStyle} className="hover:scale-110 transition-transform duration-500 ease-in-out inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1 text-base text-white font-pixel shadow-sm sm:ml-3 sm:w-auto sm:text-md" onClick={modalSave}>Save</button>
                                <button type="button" style={btnStyle} className="hover:scale-110 transition-transform duration-500 ease-in-out inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1 text-base text-white font-pixel shadow-sm sm:ml-3 sm:w-auto sm:text-md" onClick={modalClose} >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeBg;