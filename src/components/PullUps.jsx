import Reps from "./Reps.jsx";

function PullUps({date, reps, isEditing, callbackEdit, editValue}) {
    return (
        <Reps date={date} reps={reps} isEditing={isEditing} callbackEdit={callbackEdit} editValue={editValue} />
    )
}

export default PullUps