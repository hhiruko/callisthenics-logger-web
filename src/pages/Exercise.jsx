import {useParams} from "react-router-dom";
import Sets from "../components/Sets.jsx";

function Exercise({exercises}) {
    const {exercise} = useParams()

    return (
        exercises.findIndex(row => row.route === exercise) !== -1 ?
            (<Sets key={exercise} exercise={exercise} />) : ''
    )
}

export default Exercise