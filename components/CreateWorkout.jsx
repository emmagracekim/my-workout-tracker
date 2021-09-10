import { React, useState, useEffect } from "react"
import theme from "../config/theme"
import { Button, IconButton } from "@material-ui/core"
import { Card, CardBody } from "@windmill/react-ui"
import { Add, AssignmentTurnedIn } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"
import firebase from "firebase/app"
import SelectMuscleGroup from "./SelectMuscleGroup"
import AddExercise from "./AddExercise"
import AddExerciseModal from "./AddExerciseModal"
import Delete from "@material-ui/icons/Delete"
import AddSet from "./AddSet"
import RepsSetsDisplay from "./RepsSetsDisplay"
import produce, { current } from "immer"
import RepsSetsModal from "./RepsSetsModal"
import { useAuth } from "./Data/authProvider"
import { db } from "./Data/firebase"
import DisplayExercisesAfterSubmit from "./DisplayExercisesAfterSubmit"

const CreateWorkout = ({ selectedDate }) => {
  //   const { user } = AuthUserContext
  const { user } = useAuth()

  //muscle group card component
  const [isCardOpen, setIsCardOpen] = useState(false)
  const openCard = () => setIsCardOpen(true)
  const closeCard = () => setIsCardOpen(false)

  //Selected muscle group
  const [muscleGroup, setMuscleGroup] = useState()

  //Exercise Modal Component
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)

  //Selected Exercise card component
  const [isExerciseOpen, setIsExerciseOpen] = useState(false)

  const openExerciseModal = () => setIsExerciseModalOpen(true)
  const closeExerciseModal = () => {
    setIsExerciseModalOpen(false)
    setIsCardOpen(false)
    setIsExerciseOpen(true)
  }

  //Set and reps modal component
  const [isRepsSetsModalOpen, setIsRepsSetsModalOpen] = useState(false)

  function openRepsSetsModal() {
    setIsRepsSetsModalOpen(true)
  }

  //selected exercise to be added to Firestore
  const [currentExerciseData, setCurrentExerciseData] = useState({
    currentExer: "",
    notes: "",
    sets: [],
  })

  //array list of all submitted exercises on that day
  const [exerciseStats, setExerciseStats] = useState([])

  const submitExerciseData = async () => {
    await db
      .collection("profiles")
      .doc(user.uid)
      .collection("workouts")
      .add({
        exercise: currentExerciseData.currentExer,
        sets: currentExerciseData.sets,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        profileId: user.uid,
        date: selectedDate,
        notes: currentExerciseData.notes,
      })
      .then(() => {
        console.log("Document successfully written")
      })
      .catch((error) => {
        console.error("Error writing document: ", error)
      })

    setCurrentExerciseData({
      currentExer: "",
      notes: "",
      sets: [],
    })
  }

  const handleDeleteCurrentExercise = () => {
    setCurrentExerciseData({
      currentExer: "",
      notes: "",
      sets: [],
    })
    setIsExerciseOpen(false)
  }

  return (
    <main className="pb-20 transition flex items-center flex-col bg-gray-50 w-screen">
      <SelectMuscleGroup
        closeCard={closeCard}
        openExerciseModal={openExerciseModal}
        isCardOpen={isCardOpen}
        setMuscleGroup={setMuscleGroup}
      />

      {currentExerciseData.currentExer.length > 0 || isCardOpen ? (
        <div></div>
      ) : (
        <AddExercise openCard={openCard} exerciseStats={exerciseStats} />
      )}

      <AddExerciseModal
        isExerciseModalOpen={isExerciseModalOpen}
        closeExerciseModal={closeExerciseModal}
        muscleGroup={muscleGroup}
        setCurrentExerciseData={setCurrentExerciseData}
        currentExerciseData={currentExerciseData}
      />

      {currentExerciseData.currentExer.length > 0 && (
        <div
          className={`${
            isExerciseOpen ? "block" : "hidden"
          } mt-6 w-11/12 sm:w-2/3  lg:max-w-xl`}
        >
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="self-center font-semibold text-gray-600 md:text-xl">
                  {currentExerciseData.currentExer}
                </p>
                <div onClick={handleDeleteCurrentExercise} aria-label="delete">
                  <Delete aria-label="delete" fontSize="medium" />
                </div>
              </div>

              <AddSet openRepsSetsModal={openRepsSetsModal} />

              {currentExerciseData.sets.length > 0 && (
                <RepsSetsDisplay
                  currentExerciseData={currentExerciseData}
                  setCurrentExerciseData={setCurrentExerciseData}
                  setIsRepsSetsModalOpen={setIsRepsSetsModalOpen}
                />
              )}
              {currentExerciseData.sets.length > 0 && (
                <div>
                  <p className="">Notes</p>
                  <div className="">
                    <textarea
                      aria-label="notes"
                      onChange={(e) =>
                        setCurrentExerciseData(
                          produce(currentExerciseData, (draft) => {
                            draft.notes = e.target.value
                          })
                        )
                      }
                      className=""
                    ></textarea>
                  </div>
                </div>
              )}
              <RepsSetsModal
                isRepsSetsModalOpen={isRepsSetsModalOpen}
                setCurrentExerciseData={setCurrentExerciseData}
                currentExerciseData={currentExerciseData}
                setIsRepsSetsModalOpen={setIsRepsSetsModalOpen}
              />
              <IconButton onClick={submitExerciseData} className="">
                {currentExerciseData.sets.length > 0 && <AssignmentTurnedIn />}
              </IconButton>
            </CardBody>
          </Card>
        </div>
      )}

      <div className="">
        <DisplayExercisesAfterSubmit
          selectedDate={selectedDate}
          exerciseStats={exerciseStats}
          setExerciseStats={setExerciseStats}
        />
      </div>
    </main>
  )
}

export default CreateWorkout
