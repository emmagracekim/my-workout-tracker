import { React, useState } from "react"
import firebase from "firebase"
import { AuthUserContext } from "../Session"
import { db } from "../Firebase/emmafirebase"
import { exerciseList } from "./exerciseList"

const DB = () => {
  //selected exercise to be added to fb
  const [currentExerciseData, setCurrentExerciseData] = useState({
    currentExer: "",
    notes: "",
    sets: [],
  })

  // list of all submitted exercises on selected day
  const [exerciseStats, setExerciseStats] = useState([])

  db.push(exerciseList)
}

export default DB
