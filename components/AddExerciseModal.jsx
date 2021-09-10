import { ListItem, List } from "@material-ui/core"
import { Fragment } from "react"
import produce from "immer"
import MyButton from "../components/MyStyleStuff/MyButton"
import { Modal, ModalBody, ModalHeader } from "@windmill/react-ui"

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
      <Modal isOpen={isExerciseModalOpen} onClose={closeExerciseModal}>
        <ModalHeader>{"Select Exercise"}</ModalHeader>
        <ModalBody>
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
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddExerciseModal
