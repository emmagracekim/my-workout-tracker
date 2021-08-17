import { React, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
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
} from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"
import { AuthUserContext } from "./Firebase/withAuthentication"
import SelectMuscleGroup from "./SelectMuscleGroup"

const CreateWorkout = ({ selectedDate }) => {
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

  return (
    <main className="className">
      <SelectMuscleGroup
        closeCard={closeCard}
        openExerciseModal={openExerciseModal}
        isCardOpen={isCardOpen}
        setMuscleGroup={setMuscleGroup}
      />

      {/* {currentExerciseData.currentExer.length > 0 || isCardOpen ? (
        <div></div>
      ) : (
        <AddExercise openCard={openCard} exerciseStats={exerciseStats} />
      )} */}
    </main>
  )
}

export default CreateWorkout
