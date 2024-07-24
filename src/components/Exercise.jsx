function Exercise({route, label, isEditing, callbackEdit, editValue}) {

    return (
        <>
            {isEditing ?
                (
                    <input className="w-full" type="text" value={editValue} onChange={(e) =>
                        (callbackEdit({
                            route: route, label: e.target.value
                        }))}/>
                ) :
                (
                    <span className='text-left'>{label}</span>
                )
            }
        </>
    )
}

export default Exercise