import { React, useState, useEffect } from "react"
import { Card, CardContent } from "@material-ui/core"
import { useAuth } from "./Data/authProvider"
import { db } from "./Data/firebase"
import {
  ArrowDownward,
  ArrowDownwardRounded,
  ArrowRight,
} from "@material-ui/icons"
import { display } from "@material-ui/system"

const DisplayExercisesAfterSubmit = ({
  selectedDate,
  exerciseStats,
  setExerciseStats,
}) => {
  const { user } = useAuth()

  const [isHidden, setIsHidden] = useState({
    setId: "",
    setBoolean: false,
  })

  const [isEditExerciseModal, setIsEditExerciseModal] = useState(false)
  const [selected, setSelected] = useState(null)

  const deleteExercise = async (id) => {
    await db
      .collection("profiles")
      .doc(user.uid)
      .collection("workouts")
      .doc(id)
      .delete()
    setSelected(null)
    setIsEditExerciseModal(false)
  }

  const isSelected = (id) => {
    exerciseStats.map((exer) => {
      if (exer.id === id) {
        setIsHidden({
          setId: exer.id,
          setBoolean: !isHidden.setBoolean,
        })
      }
    })
  }

  const [isAddMoreSetsOpen, setIsAddMoreSetsOpen] = useState(false)

  function openAddMoreSetsModal() {
    setIsAddMoreSetsOpen(true)
  }

  function openEditExerciseModal(exercise) {
    setSelected(exercise)
    setIsEditExerciseModal(true)
  }

  function closeEditExerciseModal() {
    setSelected(null)
    setIsEditExerciseModal(false)
  }

  const getExerciseStats = async () => {
    if (user) {
      await db
        .collection("profiles")
        .doc(user.uid)
        .collection("workouts")
        .where("date", "==", selectedDate)
        .orderBy("timeStamp", "asc")
        .onSnapshot((querySnapshot) => {
          setExerciseStats(
            querySnapshot.docs.map((doc) => ({
              timeStamp: doc.data().timeStamp,
              exercise: doc.data().exercise,
              sets: doc.data().sets,
              id: doc.id,
              notes: doc.data().notes,
            }))
          )
        })
    }
  }

  useEffect(() => {
    if ((user, selectedDate)) {
      getExerciseStats()
    }
    return () => {
      getExerciseStats()
    }
  }, [user, selectedDate])

  return (
    exerciseStats.length > 0 &&
    exerciseStats.map((e) => (
      <section key={e.id} className="mb-4">
        <Card>
          <CardContent>
            <div className="">
              <div className="" onClick={() => isSelected(e.id)}>
                <p className="">
                  {e.exercise}
                  {isHidden.setBoolean && isHidden.setId === e.id ? (
                    <span>
                      <ArrowDownward />
                    </span>
                  ) : (
                    <span>
                      <ArrowRight />
                    </span>
                  )}

                  <span
                    style={
                      `${isHidden.setBoolean && isHidden.setId === e.id}`
                        ? { display: "block" }
                        : { display: "inline-block" }
                    }
                  >
                    {e.sets.length} sets
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    ))
  )
}

export default DisplayExercisesAfterSubmit
