import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Exercise from "./pages/Exercise.jsx";
import Settings from "./pages/Settings.jsx";
import {useState} from "react";
import {Exercises} from "./utility/Exercises.js";
import {read} from "./utility/Storage.js";

function App() {
    const [exercises, setExercises ] = useState(
        [...Exercises, ...(read('exercises') ?? [])].filter(exercise => !!exercise)
    )

    return (
        <>
            <Nav exercises={exercises} />
            <Routes>
                <Route path='/' element={<Navigate to='/pull-ups'/>}/>
                <Route path='/:exercise' element={<Exercise />} />
                <Route path='/settings' element={<Settings exercises={exercises} setExercises={setExercises} />} />
            </Routes>
        </>
    )
}

export default App
