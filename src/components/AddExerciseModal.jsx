import { Dialog, DialogContent } from "@material-ui/core"
import { DialogTitle, ListItem, List } from "@material-ui/core"
import { Fragment } from "react"
import produce from "immer"

const AddExerciseModal = ({
  isExerciseModalOpen,
  closeExerciseModal,
  muscleGroup,
  setCurrentExerciseData,
  currentExerciseData,
}) => {
  return (
    <Fragment>
      <Dialog open={isExerciseModalOpen} onClose={closeExerciseModal}>
        <DialogTitle id="select-exercise-title">
          {"Select exercise"}
        </DialogTitle>
        <DialogContent>
          <div className="">
            {muscleGroup &&
              muscleGroup.exercises.map((e) => (
                <div key={e.id} onClick={closeExerciseModal}>
                  <button
                    aria-label="Exercise options"
                    onClick={() =>
                      setCurrentExerciseData(
                        produce(currentExerciseData, (draft) => {
                          draft.currentExer = e.exercise
                        })
                      )
                    }
                  >
                    {e.exercise}
                  </button>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddExerciseModal
