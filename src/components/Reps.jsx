function Reps({date, reps, isEditing, callbackEdit, editValue}) {
    return (
        <>
            <div className="">{date}</div>
            <div className="break-words">
                {isEditing ?
                    (
                        <input className="w-full" type="text" value={editValue} onChange={(e) =>
                            (callbackEdit({
                                date: date, reps: e.target.value.split('/')
                                    .map(rep => parseInt(rep) || 0)
                            }))}/>
                    ) :
                    (
                        reps.map((rep, index) => (
                            <span key={index}>{index === reps.length - 1 ? rep : rep + '/'}</span>))
                    )
                }
            </div>
            <div className="">{reps.reduce((rep, nextRep) => rep + nextRep)}</div>
        </>
    )
}

export default Reps