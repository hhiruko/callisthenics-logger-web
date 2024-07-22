import {NavLink} from "react-router-dom";
import {Exercises} from "../utility/Exercises.js";

function Nav () {
    return (
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 dark:bg-neutral-900 bg-white p-4 shadow-md">
            {Exercises.map((exercise, key) => (
                <NavLink key={key} to={exercise.route} className={({isActive}) => isActive ? 'text-blue-500' : ''}>
                    {exercise.label}
                </NavLink>))}
        </nav>
    )
}

export default Nav