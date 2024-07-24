import Data from "../components/Data.jsx";
import Exercises from "../components/Exercises.jsx";

function Settings ({exercises, setExercises}) {
    return (
        <>
            <div className='mb-3'>
                <span className='text-blue-500'>Exercise</span> List
            </div>
            <div className='border-2 p-3 md:w-6/12 mx-auto mb-6'>
                <Exercises exercises={exercises} setExercises={setExercises} />
            </div>

            <div className='mb-3'>
                <span className='text-green-500'>Import/Export</span> Progress
            </div>
            <div className='border-2 p-3 md:w-6/12 mx-auto'>
                <Data />
            </div>
        </>
    )
}

export default Settings