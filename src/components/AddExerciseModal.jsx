import { Dialog, DialogContent } from "@material-ui/core"
import { DialogTitle, ListItem, List } from "@material-ui/core"
import { Fragment } from "react"
import produce from "immer"
import MyButton from "../styles/MyButton"

const styleObj = {
  fontSize: 16,
  //color: "#03A9F4",
  textAlign: "center",
  paddingTop: "10px",
  fontFamily: "Arial",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
}

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
          {"Select Exercise"}
        </DialogTitle>
        <DialogContent>
          <div className="" style={styleObj}>
            {muscleGroup &&
              muscleGroup.exercises.map((e) => (
                <div key={e.id} onClick={closeExerciseModal}>
                  <MyButton
                    color="red"
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
                  </MyButton>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddExerciseModal
