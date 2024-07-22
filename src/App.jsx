import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Exercise from "./pages/Exercise.jsx";

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Navigate to='/pull-ups'/>}/>
                <Route path='/:exercise' element={<Exercise/>} />
            </Routes>
        </>
    )
}

export default App
