import { React, useState } from "react"
import { IconButton } from "@material-ui/core"
import produce from "immer"
import { nanoid } from "nanoid"
import Delete from "@material-ui/icons/Delete"
import { AssignmentTurnedIn } from "@material-ui/icons"
import { Modal, ModalBody, ModalHeader } from "@windmill/react-ui"

const RepsSetsModal = ({
  isRepsSetsModalOpen,
  setCurrentExerciseData,
  currentExerciseData,
  setIsRepsSetsModalOpen,
}) => {
  const [currentSet, setCurrentSet] = useState({ reps: 0, weight: 0, id: "" })

  const [numSets, setNumSets] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    const setObj = produce(currentSet, (draft) => {
      draft[name] = value
    })

    setCurrentSet(setObj)
  }

  const closeRepsSetsModal = () => {
    setNumSets(1)
    setIsRepsSetsModalOpen(false)
  }

  const handleSubmit = () => {
    let setArray = Array.from({ length: numSets }, () => ({
      reps: currentSet.reps,
      weight: currentSet.weight,
      id: nanoid(),
    }))

    if (currentSet.reps > 0 || currentSet.weight > 0)
      setCurrentExerciseData(
        produce(currentExerciseData, (draft) => {
          draft.sets.push(...setArray)
        })
      )

    setCurrentSet({ reps: 0, weight: 0 })
    closeRepsSetsModal()
  }

  return (
    <div className="text-gray-600 flex justify-center">
      <Modal isOpen={isRepsSetsModalOpen} onClose={closeRepsSetsModal}>
        <ModalHeader className="mb-4 font-semibold text-gray-600 md:text-xl">
          {" "}
          {currentExerciseData.currentExer}{" "}
        </ModalHeader>
        <ModalBody>
          <div className="flex bg-gray-50 p-2 rounded-lg sm:flex-row justify-around text-gray-600">
            <div>
              <div className="text-center pb-2 text-base font-semibold">
                <label>Set</label>
              </div>
              <div className="flex justify-center pb-2">
                <input
                  className="py-2 rounded w-10/12 sm:w-7/12 border text-black text-center"
                  type="number"
                  name="weight"
                  required
                  value={numSets}
                  onChange={(e) => setNumSets(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="text-center pb-2 text-base font-semibold">
                <label>Weight</label>
              </div>
              <div className="flex justify-center pb-2">
                <input
                  className="py-2 rounded w-10/12 sm:w-7/12 border text-black text-center"
                  type="number"
                  name="weight"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="text-center pb-2 text-base font-semibold">
                <label>Reps</label>
              </div>
              <div className="flex justify-center">
                <input
                  className="py-2 rounded w-10/12 sm:w-7/12 border text-black text-center"
                  type="number"
                  name="reps"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="flex justify-between">
          <IconButton
            onClick={closeRepsSetsModal}
            aria-label="delete"
            style={{
              color: "Background",
            }}
          >
            <Delete aria-label="delete" fontSize="medium" />
          </IconButton>
          <IconButton
            onClick={handleSubmit}
            aria-label="done"
            className={`${
              currentSet.reps > 0 || currentSet.weight > 0
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
            // style={{
            //   pointerEvents:
            //     currentSet.reps > 0 || currentSet.weight > 0 ? "auto" : "none",
            //   position: "absolute",
            //   right: 5,
            //   bottom: 5,
            //   color: "Background",
            // }}
          >
            <AssignmentTurnedIn
              aria-label="done"
              fontSize="large"
              style={{
                position: "absolute",
                right: 5,
                bottom: 5,
              }}
            />
          </IconButton>
        </div>
      </Modal>
    </div>
  )
}

export default RepsSetsModal
