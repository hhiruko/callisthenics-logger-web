function Reps({date, reps, isEditing, callbackEdit, editValue}) {
    return (
        <>
            <div className="">{date}</div>
            <div className="break-words">
                {isEditing ?
                    (
                        <>
                            <input className="w-full" type="text"
                                   value={typeof editValue.reps === 'string' ? editValue.reps :
                                       editValue.map(rep => `${rep.rep}${rep.type}`).join('/')}
                                   onChange={(e) => (callbackEdit({
                                       date: date,
                                       reps: e.target.value,
                                       weight: typeof editValue.weight === 'string' ? editValue.weight :
                                           editValue.map(rep => rep.isBodyweight ? 'BW' : `${rep.weight}${rep.unit}`).join('/')
                                   }))}/>
                            <input className="w-full" type="text"
                                   value={typeof editValue.weight === 'string' ? editValue.weight :
                                       editValue.map(rep => rep.isBodyweight ? 'BW' : `${rep.weight}${rep.unit}`).join('/')}
                                   onChange={(e) => (callbackEdit({
                                       date: date,
                                       weight: e.target.value,
                                       reps: typeof editValue.reps === 'string' ? editValue.reps :
                                           editValue.map(rep => `${rep.rep}${rep.type}`).join('/')
                                   }))}/>
                        </>
                    ) :
                    (
                        <>
                            {reps.map((rep, index) => (
                                <span key={index}>{rep.rep + (rep.type === 'reps' ? '' : rep.type)
                                    + (index === reps.length - 1 ? '' : '/')}</span>
                            ))}
                            <br/>
                            {reps.every(rep => rep.isBodyweight) ? null : (
                                reps.map((rep, index) => (
                                    <span className='text-gray-500' key={index}>
                                        {(rep.isBodyweight ? 'BW' : rep.weight + rep.unit) + (index === reps.length - 1 ? '' : '/')}
                                    </span>
                                ))
                            )}
                        </>
                    )
                }
            </div>
            <div className="">
                {Object.entries(reps.reduce((rep, nextRep) => {
                    let key = nextRep.isBodyweight ? '' : ` w/ ${nextRep.weight}${nextRep.unit}`
                    let typeKey = `${nextRep.type}${key}`

                    if (!rep[typeKey]) {
                        rep[typeKey] = 0
                    }

                    rep[typeKey] += nextRep.rep
                    return rep
                }, {})).map(([typeKey, totalReps]) => (
                    <div key={typeKey}>{totalReps} <span className='text-gray-500'>{typeKey}</span></div>
                ))}
            </div>
        </>
    )
}

export default Reps