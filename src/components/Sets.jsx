import {useState} from "react";
import {persist, read} from "../utility/Storage.js";
import PullUps from "./PullUps.jsx";
import {getCurrentDate} from "../utility/Date.js";
import {MdAddCircle, MdDelete, MdEdit, MdSave} from "react-icons/md";

function Sets() {
    const [sets, setSets] = useState(readSets)
    const [reps, setReps] = useState(0)
    const [editedSet, setEditedSet] = useState([])

    function readSets() {
        let sets = read('sets') ?? []
        return sortSets(sets)
    }

    function sortSets(sets) {
        if (sets.length > 0) {
            sets.sort((a, b) => b.date.localeCompare(a.date))
        }
        return sets
    }

    function setTempReps(event) {
        setReps(parseInt(event.target.value))
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

            persist('sets', log)
            setSets(log)
        }
    }

    function deleteReps(date) {
        let log = [...sets]
        log = log.filter(set => set.date !== date)
        persist('sets', log)
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
        persist('sets', log)
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
                <input className="rounded" type='number' onChange={setTempReps}/>
                <MdAddCircle className="cursor-pointer" onClick={() => addReps()}/>
            </div>
            {sets.map((set, index) =>
                (
                    <div className="grid grid-cols-4 mb-3" key={index}>
                        <PullUps date={set.date} reps={set.reps} isEditing={set.isEditing ?? false}
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
                            <MdDelete className="cursor-pointer" onClick={() => deleteReps(set.date)} />
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default Sets