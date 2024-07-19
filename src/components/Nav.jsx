import {NavLink} from "react-router-dom";

function Nav () {
    return (
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 dark:bg-neutral-900 bg-white p-4 shadow-md">
            <NavLink to='/pull-ups' className={({isActive}) => isActive ? 'text-blue-500' : ''}>Pull-ups</NavLink>
            <NavLink to='/push-ups' className={({isActive}) => isActive ? 'text-blue-500' : ''}>Push-ups</NavLink>
        </nav>
    )
}

export default Nav