import { React, useState, useEffect } from "react"
import { useAuth } from "./Data/authProvider"
import { db } from "./Data/firebase"
import {
  ArrowDownward,
  ArrowDownwardRounded,
  ArrowRight,
} from "@material-ui/icons"
import { Card, CardBody } from "@windmill/react-ui"
import { AddSubmittedSet } from "./AddSet"
import AddMoreSetsModal from "./AddMoreSetsModal"

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
          <CardBody>
            <div className="flex justify-between">
              <div
                className="flex items-center cursor-pointer flex-grow"
                onClick={() => isSelected(e.id)}
              >
                <p className="font-semibold text-gray-600 md:text-xl">
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
                    className={`${
                      isHidden.setBoolean && isHidden.setId === e.id
                        ? "hidden"
                        : "inline-block"
                    }`}
                  >
                    {e.sets.length} sets
                  </span>
                </p>
              </div>
              <div className="flex">
                <div
                  aria-label="Add More Sets Button"
                  className={`${
                    isHidden.setBoolean && isHidden.setId === e.id
                      ? "block"
                      : "hidden"
                  } md:mr-1 z-20`}
                >
                  <AddSubmittedSet
                    aria-label="Add More Sets Button"
                    openAddMoreSetsModal={openAddMoreSetsModal}
                  />
                </div>
                <div aria-label="Delete" onClick={() => deleteExercise(e.id)}>
                  <Delete aria-label="Delete" />
                </div>
              </div>
              <AddMoreSetsModal
                isAddMoreSetsOpen={isAddMoreSetsOpen}
                setIsAddMoreSetsOpen={setIsAddMoreSetsOpen}
                exerciseStats={exerciseStats}
                isHidden={isHidden}
              />
              {/*<DeleteExerciseModal
                id={e?.id}
                deleteExercise={deleteExercise}
                setIsHidden={setIsHidden}
                isDeleteExerciseModalOpen={isDeleteExerciseModalOpen}
                closeDeleteExerciseModal={closeDeleteExerciseModal}
              />*/}
            </div>
            {e.sets.length === 0 ? (
              <div
                className={`${
                  isHidden.setBoolean && isHidden.setId === e.id
                    ? "inline-block"
                    : "hidden"
                } flex md:flex-row justify-around mt-2 py-2 sm:mx-4 transition bg-gray-50 rounded text-gray-800 `}
              >
                <p className=" text-gray-800 text-center m-2 ">
                  No sets to display
                </p>
              </div>
            ) : (
              e.sets.map(
                (s, index) =>
                  s && (
                    <div
                      key={index}
                      className={`${
                        isHidden.setBoolean && isHidden.setId === e.id
                          ? "block"
                          : "hidden"
                      } md:mt-4`}
                    >
                      <div className="md:mx-4">
                        <div className=" flex flex-col md:flex-row md:bg-gray-50 transition rounded md:mt-3">
                          <p className="self-center text-gray-800 dark:text-gray-300 text-center m-2 md:ml-4">
                            Set {index + 1}
                          </p>
                          <div className="flex flex-grow md:flex-row justify-around py-2 sm:mx-4 bg-gray-50 transition rounded text-gray-800">
                            <div className="flex flex-col  py-2 ml-2">
                              <label className="self-center">Weight</label>
                              <p className="font-semibold">{s.weight} lbs</p>
                            </div>
                            <div className="flex flex-col p-2 ml-2">
                              <label>Reps</label>
                              <p className=" text-center  font-semibold  ">
                                {s.reps}
                              </p>
                            </div>
                            <div
                              aria-label="Edit Exercise Modal"
                              className="self-center md:hidden "
                              onClick={() => {
                                openEditExerciseModal(s)
                              }}
                            >
                              <Edit aria-label="Edit Exercise Modal" />
                            </div>
                          </div>

                          <div
                            aria-label="Edit Exercise Modal"
                            className="self-center hidden md:block md:mr-3"
                            onClick={() => {
                              openEditExerciseModal(s)
                            }}
                          >
                            <Edit aria-label="Edit Exercise Modal" />
                          </div>
                        </div>
                      </div>

                      {e && (
                        <EditExerciseModal
                          isEditExerciseModal={isEditExerciseModal}
                          closeEditExerciseModal={closeEditExerciseModal}
                          selected={selected}
                          setSelected={setSelected}
                          exerciseStats={exerciseStats}
                          isHidden={isHidden}
                        />
                      )}
                    </div>
                  )
              )
            )}
            <div
              className={`${
                isHidden.setBoolean && isHidden.setId === e.id
                  ? "block"
                  : "hidden"
              } mb-3`}
            >
              <EditExerciseNotes value={e.notes} id={e.id} />
            </div>
          </CardBody>
        </Card>
      </section>
    ))
  )
}

export default DisplayExercisesAfterSubmit
