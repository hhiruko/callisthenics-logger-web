import {MdClose} from "react-icons/md";

function Dialogue({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="dark:bg-neutral-900 bg-white border-2 rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <MdClose/>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dialogue