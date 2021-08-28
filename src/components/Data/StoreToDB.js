import { React, useState } from "react"
import firebase from "firebase"
import { AuthUserContext } from "../Session"
import { db } from "../Firebase_2/emmafirebase"
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

  var exerRef = db.collection("exercises").doc(1)
  exerRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        console.log("No such document exists")
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error)
    })
}

export default DB
