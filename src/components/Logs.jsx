import {useState} from "react";
import {persist, read} from "../utility/Storage.js";
import {getCurrentDate, parseDate} from "../utility/Date.js";
import {
    MdAddCircle,
    MdArrowDropDown,
    MdArrowDropUp,
    MdDelete,
    MdEdit,
    MdSave
} from "react-icons/md";
import Dialogue from "./Dialogue.jsx";
import Sets from "./Sets.jsx";

function Logs({exercise}) {
    const setName = 'sets-' + exercise

    const [sets, setSets] = useState(readSets)
    const [reps, setReps] = useState(0)
    const [editedSet, setEditedSet] = useState([])
    const [deleteSet, setDeleteSet] = useState([])
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const Types = ['reps', 'min', 's']
    const Units = ['kg', 'lbs']
    const [type, setType] = useState(Types[0])
    const [unit, setUnit] = useState(Units[0])
    const [weight, setWeight] = useState(0)
    const [isBodyweight, setIsBodyweight] = useState(true)

    function readSets() {
        let sets = read(setName) ?? []
        return sortSets(sets)
    }

    function sortSets(sets) {
        if (sets.length > 0) {
            sets.sort((a, b) => {
                let dateA = parseDate(a.date)
                let dateB = parseDate(b.date)
                return dateB - dateA
            })
        }
        return sets
    }

    function addReps(){
        if (reps > 0) {
            let log = [...sets]
            let date = getCurrentDate()
            let set = log.findIndex(set => set.date === date)
            if (set !== -1) {
                log[set].reps.push({rep: reps, type: type, isBodyweight: isBodyweight, weight: weight, unit: unit})
            } else {
                log.push({date: date, reps: [{rep: reps, type: type, isBodyweight: isBodyweight, weight: weight, unit: unit}]})
            }
            log = sortSets(log)

            persist(setName, log)
            setSets(log)
        }
    }

    function deleteReps(date) {
        let log = [...sets]
        log = log.filter(set => set.date !== date)
        persist(setName, log)
        setSets(log)
    }

    function editReps(date) {
        let log = [...sets]
        let set = log.findIndex(set => set.date === date)
        log[set].isEditing = true
        setSets(log)
    }

    function saveReps(date) {
        let log = [...sets]
        let set = log.findIndex(set => set.date === date)
        log[set].isEditing = false
        let tempSet = editedSet.findIndex(set => set.date === date)
        if (tempSet !== -1) {
            log[set].reps = parseEditedSet(editedSet[tempSet])
            let updatedSet = [...editedSet]
            updatedSet.splice(tempSet, 1)
            setEditedSet(updatedSet)
        }
        persist(setName, log)
        setSets(log)
    }

    function setTempSet(tempSet) {
        let log = [...editedSet]
        let set = log.findIndex(set => set.date === tempSet.date)
        if (set !== -1) {
            log[set].reps = tempSet.reps ?? ''
            log[set].weight = tempSet.weight ?? ''
        } else {
            log.push(tempSet)
        }
        setEditedSet(log)
    }

    // TODO update/rewrite method because a ton of errors with undefined/NaN
    function parseEditedSet(set) {
        function parseExerciseString(str) {
            // Replace backward slashes with forward slashes
            str = str.replace(/\\/g, '/');

            // Split the string by '/'
            const parts = str.split('/');

            return parts.map(part => {
                let rep, type, isBodyweight, weight, unit;

                // Handle bodyweight case
                if (part === 'BW') {
                    rep = 0; // Default rep for bodyweight exercises
                    type = Types[0]; // Default type
                    isBodyweight = true;
                    weight = 0;
                    unit = '';
                } else {
                    // Replace commas with periods for floating-point numbers
                    part = part.replace(',', '.');

                    // Extract numeric value and unit from the part
                    const match = part.match(/^(\d+(\.\d*)?)([a-zA-Z]*)$/);

                    if (match) {
                        rep = parseFloat(match[1]);
                        type = match[3] && Types.includes(match[3]) ? match[3] : Types[0]; // Fallback to the first type if not valid

                        // Determine unit: if none of the allowed units match, default to 'kg'
                        unit = Units.find(u => part.includes(u)) || Units[0];

                        // Ensure weight is set correctly
                        weight = unit === '' ? 0 : rep;
                    } else {
                        // Default values if the part does not match the expected pattern
                        rep = 0;
                        type = Types[0];
                        isBodyweight = true;
                        weight = 0;
                        unit = Units[0]; // Default to the first unit
                    }
                }

                return {
                    rep,
                    type,
                    isBodyweight,
                    weight,
                    unit
                };
            });
        }

        const parts1 = parseExerciseString(set.reps);
        const parts2 = parseExerciseString(set.weight);

        // Combine the two arrays element-wise
        return parts1.map((part1, index) => {
            const part2 = parts2[index] || {};
            return {
                rep: part1.rep,
                type: part1.type,
                isBodyweight: part2.isBodyweight,
                weight: part2.weight,
                unit: part2.unit
            };
        });
    }

    return (
        <>
            <div className='mb-6'>
                <div className="flex items-center gap-3 justify-center">
                    {!isOptionsOpen ?
                        (
                            <MdArrowDropDown onClick={() => {setIsOptionsOpen(true)}}/>
                        ) : (
                            <MdArrowDropUp onClick={() => {setIsOptionsOpen(false)}}/>
                        )}
                    <input className="rounded border-2" type='number' step='any' onChange={
                        (e) => setReps(parseFloat(e.target.value))
                    }/>
                    <MdAddCircle className="cursor-pointer" onClick={() => addReps()}/>
                </div>
                <div className={(!isOptionsOpen ? 'hidden' : 'grid gap-3 mt-3') + ' ' +
                    (isBodyweight ? 'grid-rows-1' : 'grid-rows-2')}>
                    <div className='flex gap-3 justify-center'>
                        <span>Type: </span>
                        <select onChange={(e) => setType(e.target.value)}>
                            {Types.map((unit, key) => (
                                <option key={key} value={unit}>
                                    {unit}
                                </option>))}
                        </select>
                        <span>Bodyweight: </span>
                        <input type='checkbox' checked={isBodyweight} onChange={() => {
                            setIsBodyweight(!isBodyweight)
                        }}/>
                    </div>
                    {!isBodyweight ?
                        (
                            <div className='flex gap-3 justify-center'>
                                <span>Weight: </span>
                                <input className='w-12' type='number' step='two' onChange={
                                    (e) => setWeight(parseFloat(e.target.value))
                                }/>
                                <span>Unit: </span>
                                <select onChange={(e) => setUnit(e.target.value)}>
                                    {Units.map((unit, key) => (
                                        <option key={key} value={unit}>
                                            {unit}
                                        </option>))}
                                </select>
                            </div>
                        ) :
                        (
                            ''
                        )}
                </div>
            </div>
            {sets.map((set, index) =>
                (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 border-2 p-3" key={index}>
                        <Sets date={set.date} reps={set.reps} isEditing={set.isEditing ?? false}
                              callbackEdit={setTempSet}
                              editValue={
                                  editedSet.length > 0 && editedSet.findIndex(e => e.date === set.date) !== -1
                                        ? (editedSet[editedSet.findIndex(e => e.date === set.date)])
                                        : set.reps
                                 }
                        />
                        <div className="flex gap-3 justify-center pt-1.5">
                            {
                                (set.isEditing ?? false) ?
                                    (
                                        <MdSave className="cursor-pointer" onClick={() => saveReps(set.date)}/>
                                    ) :
                                    (
                                        <MdEdit className="cursor-pointer" onClick={() => editReps(set.date)}/>
                                    )
                            }
                            <MdDelete className="cursor-pointer" onClick={() => {
                                setDeleteSet(set)
                                setIsDeleteOpen(true)
                            }} />
                        </div>
                    </div>
                )
            )}
            <Dialogue isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <h2 className="text-xl font-semibold">Do you want to delete this log?</h2>
                <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            deleteReps(deleteSet.date)
                            setIsDeleteOpen(false)
                        }}>
                    Delete
                </button>
            </Dialogue>
        </>
    )
}

export default Logs