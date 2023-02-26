import { ImSpinner8 } from "react-icons/im";

const Spinner = ({ isReady }) => {
    return (
        <div className={`relative z-10 ${isReady ? "hidden" : ""}`}>
            <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                    <ImSpinner8 className="text-white initanimate-spin text-5xl" />
                </div>
            </div>
        </div>
    );
};

export default Spinner;