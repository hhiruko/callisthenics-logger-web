import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Exercises} from "../utility/Exercises.js";
import {MdImportExport} from "react-icons/md";

function Nav () {
    const navigate = useNavigate()
    const location = useLocation()

    function handleNavigate(event) {
        let route = event.target.value
        if (location.pathname !== '/' + route){
            navigate(route)
        }
    }

    return (
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 dark:bg-neutral-900 bg-white p-4 shadow-md">
            <select onSelect={handleNavigate}>
                {Exercises.map((exercise, key) => (
                    <option key={key} value={exercise.route} selected={'/' + exercise.route === location.pathname}>
                        {exercise.label}
                    </option>))}
            </select>
            <NavLink to='/download' className={({isActive}) => isActive ? 'text-blue-500 my-auto' : 'my-auto'}>
                <MdImportExport/>
            </NavLink>
        </nav>
    )
}

export default Nav