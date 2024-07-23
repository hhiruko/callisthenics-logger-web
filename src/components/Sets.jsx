import {useState} from "react";
import {persist, read} from "../utility/Storage.js";
import {getCurrentDate, parseDate} from "../utility/Date.js";
import {MdAddCircle, MdDelete, MdEdit, MdSave} from "react-icons/md";
import Dialogue from "./Dialogue.jsx";
import Reps from "./Reps.jsx";

function Sets({exercise}) {
    const setName = 'sets-' + exercise

    const [sets, setSets] = useState(readSets)
    const [reps, setReps] = useState(0)
    const [editedSet, setEditedSet] = useState([])
    const [deleteSet, setDeleteSet] = useState([])
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

    function setTempReps(event) {
        setReps(parseFloat(event.target.value))
    }

    function addReps(){
        if (reps > 0) {
            let log = [...sets]
            let date = getCurrentDate()
            let set = log.findIndex(set => set.date === date)
            if (set !== -1) {
                log[set].reps.push(reps)
            } else {
                log.push({date: date, reps: [reps]})
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
            log[set].reps = editedSet[tempSet].reps
        }
        persist(setName, log)
        setSets(log)
    }

    function setTempSet(tempSet) {
        let log = [...editedSet]
        let set = log.findIndex(set => set.date === tempSet.date)
        if (set !== -1) {
            log[set].reps = tempSet.reps
        } else {
            log.push(tempSet)
        }
        setEditedSet(log)
    }

    return (
        <>
            <div className="flex items-center gap-3 justify-center mb-6">
                <input className="rounded border-2" type='number' step='any' onChange={setTempReps}/>
                <MdAddCircle className="cursor-pointer" onClick={() => addReps()}/>
            </div>
            {sets.map((set, index) =>
                (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 border-2 p-3" key={index}>
                        <Reps date={set.date} reps={set.reps} isEditing={set.isEditing ?? false}
                                 callbackEdit={setTempSet}
                                 editValue={
                                     editedSet.length > 0 && editedSet.findIndex(e => e.date === set.date) !== -1
                                        ? (editedSet[editedSet.findIndex(e => e.date === set.date)]?.reps?.join('/'))
                                        : set.reps.join('/')
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

export default Sets