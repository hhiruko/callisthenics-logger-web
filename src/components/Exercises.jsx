import {useState} from "react";
import {Exercises as ExercisesList} from "../utility/Exercises.js";
import {MdAddCircle, MdDelete, MdEdit, MdSave} from "react-icons/md";
import {persist} from "../utility/Storage.js";
import Dialogue from "./Dialogue.jsx";
import Exercise from "./Exercise.jsx";

function Exercises ({exercises, setExercises}) {
    const name = 'exercises'
    const [exercise, setExercise] = useState('')
    const [editedExercises, setEditedExercises] = useState([])
    const [deleteExercises, setDeleteExercises] = useState([])
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const standardRoutes = new Set(ExercisesList.map(exercise => exercise.route))

    function setTempExercise(event) {
        setExercise(event.target.value)
    }

    function clearExercises(exercises) {
        if (exercises.length > 0){
            exercises = exercises.filter(exercise => !standardRoutes.has(exercise.route));
        }
        return exercises
    }

    function addExercise(){
        if (exercise) {
            let log = [...exercises]
            let route = exercise.toLowerCase().replace(/ /g, '-')
            if (!standardRoutes.has(route)){
                log.push({route: route, label: exercise})
                persist(name, clearExercises(log))
                setExercises(log)
            }
        }
    }

    function deleteExercise(route) {
        let log = [...exercises]
        log = log.filter(exercise => exercise.route !== route)
        persist(name, clearExercises(log))
        setExercises(log)
    }

    function editExercise(route) {
        let log = [...exercises]
        let exercise = log.findIndex(exercise => exercise.route === route)
        log[exercise].isEditing = true
        setExercises(log)
    }

    function saveExercise(route) {
        let log = [...exercises]
        let exercise = log.findIndex(exercise => exercise.route === route)
        log[exercise].isEditing = false
        let tempExercise = editedExercises.findIndex(exercise => exercise.route === route)
        if (tempExercise !== -1) {
            log[exercise].label = editedExercises[tempExercise].label
        }
        persist(name, clearExercises(log))
        setExercises(log)
    }

    function setTempExercises(tempExercise) {
        let log = [...editedExercises]
        let exercises = log.findIndex(exercises => exercises.route === tempExercise.route)
        if (exercises !== -1) {
            log[exercises].label = tempExercise.label
        } else {
            log.push(tempExercise)
        }
        setEditedExercises(log)
    }

    return (
        <>
            <div className="flex items-center gap-3 justify-center mb-6">
                <input className="rounded border-2" type='string' onChange={setTempExercise}/>
                <MdAddCircle className="cursor-pointer" onClick={() => addExercise()}/>
            </div>
            {exercises.map((exercise, key) => (
                <div key={key} className='grid grid-cols-2'>
                    <Exercise route={exercise.route} label={exercise.label} isEditing={exercise.isEditing ?? false}
                          callbackEdit={setTempExercises}
                          editValue={
                              (editedExercises.length > 0 &&
                              editedExercises.findIndex(e => e.route === exercise.route) !== -1) ?
                              editedExercises[editedExercises.findIndex(e => e.route === exercise.route)].label : exercise.label
                          }
                    />
                    <div className="flex justify-end">
                        {
                            !standardRoutes.has(exercise.route) ? (
                                <div className='flex gap-3 pt-1.5'>
                                    {
                                        (exercise.isEditing ?? false) ?
                                            (
                                                <MdSave className="cursor-pointer" onClick={() => saveExercise(exercise.route)}/>
                                            ) :
                                            (
                                                <MdEdit className="cursor-pointer" onClick={() => editExercise(exercise.route)}/>
                                            )
                                    }
                                    <MdDelete className="cursor-pointer" onClick={() => {
                                        setDeleteExercises(exercise)
                                        setIsDeleteOpen(true)
                                    }}/>
                                </div>
                            ) : (<span className='italic'>Standard exercise</span>)
                        }
                    </div>
                </div>
            ))}
            <Dialogue isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <h2 className="text-xl font-semibold">Do you want to delete this exercise?</h2>
                <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            deleteExercise(deleteExercises.route)
                            setIsDeleteOpen(false)
                        }}>
                    Delete
                </button>
            </Dialogue>
        </>
    )
}

export default Exercises