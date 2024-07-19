import './App.css'
import {Route, Routes} from "react-router-dom";
import PullUps from "./pages/PullUps.jsx";
import PushUps from "./pages/PushUps.jsx";
import Nav from "./components/Nav.jsx";

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<PullUps/>}/>
                <Route path="/pull-ups" element={<PullUps/>}/>
                <Route path="/push-ups" element={<PushUps/>}/>
            </Routes>
        </>
    )
}

export default App
