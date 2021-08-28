import { React, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import theme from "../config/theme.config"
import {
  Button,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Typography,
  IconButton,
} from "@material-ui/core"
import { Add, AssignmentTurnedIn } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"
import { AuthUserContext } from "./Firebase_2/withAuthentication"
import firebase from "firebase/app"
import { withFirebase } from "./Firebase_2/firebaseContext"
import SelectMuscleGroup from "./SelectMuscleGroup"
import AddExercise from "./AddExercise"
import AddExerciseModal from "./AddExerciseModal"
import Delete from "@material-ui/icons/Delete"
import AddSet from "./AddSet"
import RepsSetsDisplay from "./RepsSetsDisplay"
import produce, { current } from "immer"
import RepsSetsModal from "./RepsSetsModal"

const CreateWorkout = (props) => {
  const { firebase, authUser, selectedDate } = props
  const { user } = authUser
  const db = firebase.firestore()
  //   const { user } = AuthUserContext

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
      //  await
      //    .doc(user.uid)
      //    .collection("workouts")
      //    .add({
      //      exercise: currentExerciseData.currentExer,
      //      sets: currentExerciseData.sets,
      //      profileId: user.uid,
      //      date: selectedDate,
      //      notes: currentExerciseData.notes,
      //    })
      //    .then(() => {
      //      console.log("Document successfully written")
      //    })
      //    .catch((error) => {
      //      console.log("Error writing document: ", error)
      //    })

      .setCurrentExerciseData({
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
    <main className="className">
      <ThemeProvider theme={theme}>
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
          <div style={{ display: isExerciseOpen ? "block" : "none" }}>
            <Card>
              <CardContent>
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{ fontFamily: "sans-serif", fontWeight: "bolder" }}
                  >
                    {currentExerciseData.currentExer}
                  </div>
                  <div
                    onClick={handleDeleteCurrentExercise}
                    aria-label="delete"
                  >
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
                  {currentExerciseData.sets.length > 0 && (
                    <AssignmentTurnedIn />
                  )}
                </IconButton>
              </CardContent>
            </Card>
          </div>
        )}
      </ThemeProvider>
    </main>
  )
}

export default CreateWorkout
