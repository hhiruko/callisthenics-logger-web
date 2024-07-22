import {useParams} from "react-router-dom";
import Sets from "../components/Sets.jsx";
import {convertToCamelCase, Exercises} from "../utility/Exercises.js";

function Exercise() {
    const {exercise} = useParams()

    return (
        Exercises.findIndex(row => row.route === exercise) !== -1 ?
            (<Sets key={exercise} exercise={convertToCamelCase(exercise)} />) : ''
    )
}

export default Exercise