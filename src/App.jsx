import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Exercise from "./pages/Exercise.jsx";
import Data from "./components/Data.jsx";

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Navigate to='/pull-ups'/>}/>
                <Route path='/:exercise' element={<Exercise/>} />
                <Route path='/settings' element={<Data />} />
            </Routes>
        </>
    )
}

export default App
