import {useParams} from "react-router-dom";
import Logs from "../components/Logs.jsx";

function Exercise({exercises}) {
    const {exercise} = useParams()

    return (
        exercises.findIndex(row => row.route === exercise) !== -1 ?
            (<Logs key={exercise} exercise={exercise} />) : ''
    )
}

export default Exercise