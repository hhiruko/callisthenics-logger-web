import Reps from "./Reps.jsx";

function Exercise({date, reps, isEditing, callbackEdit, editValue}) {
    return (
        <Reps date={date} reps={reps} isEditing={isEditing} callbackEdit={callbackEdit} editValue={editValue} />
    )
}

export default Exercise