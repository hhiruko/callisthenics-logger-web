import {useState} from "react";
import {get, set} from "../utility/Storage.js";
import {MdDownload, MdUploadFile} from "react-icons/md";
import Dialogue from "./Dialogue.jsx";

function Data() {
    const [storage] = useState(get)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    function upload(event) {
        const fileReader = new FileReader()
        fileReader.readAsText(event.target.form.children[0].files[0], "UTF-8")
        fileReader.onload = e => {
            set(JSON.parse(e.target.result))
            setIsSuccessOpen(true)
        };
    }

    return (
        <>
            <div className='grid items-center justify-center'>
                <a className='flex gap-3 mb-6'
                   href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(storage))}`}
                   download='callisthenics-progress.json'>
                    <MdDownload className='my-auto'/> Download progress
                </a>
                <form>
                    <input type='file' className='mb-6'/>
                    <button className='flex gap-3' type='button' onClick={upload}>
                        <MdUploadFile className='my-auto'/>Upload progress
                    </button>
                </form>
            </div>
            <Dialogue isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)}>
                <h2 className="text-xl font-semibold">Success!</h2>
                <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => {setIsSuccessOpen(false)}}>
                    Close
                </button>
            </Dialogue>
        </>
    )
}

export default Data