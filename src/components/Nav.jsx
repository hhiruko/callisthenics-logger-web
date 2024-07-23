import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Exercises} from "../utility/Exercises.js";
import {MdImportExport} from "react-icons/md";
import {useState} from "react";

function Nav () {
    const navigate = useNavigate()
    const location = useLocation()
    const [isExerciseNavOpen, setIsExerciseNavOpen] = useState(getIsExerciseNavPage())

    function handleNavigate(event) {
        let route = event.target.value
        if (location.pathname !== '/' + route){
            navigate(route)
        }
    }

    function handleNavigateBack(event) {
        if (!isExerciseNavOpen) {
            event.preventDefault()
            let route = event.target.value
            if (!getIsExerciseNavPage()) {
                setIsExerciseNavOpen(true)
                navigate(route)
            }
        }
    }

    function getIsExerciseNavPage() {
        let exercise = Exercises.findIndex(exercise => '/' + exercise.route === location.pathname)
        return exercise !== -1;
    }

    return (
        <nav
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 dark:bg-neutral-900 bg-white p-4 shadow-md">
            <select value={location.pathname.replace('/', '')}
                    onChange={handleNavigate} onMouseDown={handleNavigateBack}>
                {Exercises.map((exercise, key) => (
                    <option key={key} value={exercise.route}>
                        {exercise.label}
                    </option>))}
            </select>
            <NavLink onClick={() => setIsExerciseNavOpen(false)} to='/download' className={({isActive}) => isActive ? 'text-blue-500 my-auto' : 'my-auto'}>
                <MdImportExport/>
            </NavLink>
        </nav>
    )
}

export default Nav