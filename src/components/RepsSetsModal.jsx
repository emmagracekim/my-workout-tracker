import { React, useState } from "react"
import { Dialog, DialogTitle, IconButton } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import produce from "immer"
import { nanoid } from "nanoid"
import Delete from "@material-ui/icons/Delete"
import { AssignmentTurnedIn } from "@material-ui/icons"

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
    <div className="">
      <Dialog open={isRepsSetsModalOpen} onClose={closeRepsSetsModal}>
        <DialogTitle style={{ margin: 10 }}>
          {" "}
          {currentExerciseData.currentExer}{" "}
        </DialogTitle>
        <DialogContent style={{ margin: 10 }}>
          <div className="">
            <div>
              <div className="">
                <label>Set</label>
              </div>
              <div className="">
                <input
                  type="number"
                  name="weight"
                  required
                  value={numSets}
                  onChange={(e) => setNumSets(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="">
                <label>Weight</label>
              </div>
              <div className="">
                <input
                  type="number"
                  name="weight"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="">
                <label>Reps</label>
              </div>
              <div className="">
                <input
                  type="number"
                  name="reps"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="">
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
            style={{
              pointerEvents:
                currentSet.reps > 0 || currentSet.weight > 0 ? "auto" : "none",
              position: "absolute",
              right: 5,
              bottom: 5,
              color: "Background",
            }}
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
      </Dialog>
    </div>
  )
}

export default RepsSetsModal
