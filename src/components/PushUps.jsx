import Reps from "./Reps.jsx";

function PushUps({date, reps, isEditing, callbackEdit, editValue}) {
    return (
        <Reps date={date} reps={reps} isEditing={isEditing} callbackEdit={callbackEdit} editValue={editValue} />
    )
}

export default PushUps