import { Dialog } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { CheckBox } from "@material-ui/icons"
import Delete from "@material-ui/icons/Delete"
import { flexbox } from "@material-ui/system"
import produce from "immer"

const UpdateCurrentSetsModal = ({
  currentExerciseData,
  setCurrentExerciseData,
  isModalOpen,
  closeModal,
  currSet,
  setCurrSet,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrSet(
      produce(currSet, (draft) => {
        draft[name] = value
      })
    )
  }

  const handleUpdate = () => {
    const index = currentExerciseData.sets.findIndex(
      (el) => el.id === currSet.id
    )

    const updated = produce(currentExerciseData, (draft) => {
      draft.sets[index].weight = currSet.weight
      draft.sets[index].reps = currSet.reps
    })

    setCurrentExerciseData(updated)
    closeModal()
  }

  const handleDelete = () => {
    const newArr = currentExerciseData.sets.filter(
      (set) => set.id !== currSet.id
    )

    setCurrentExerciseData({ ...currentExerciseData, sets: newArr })
    closeModal()
  }

  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <p className="">Edit Set</p>
      <DialogContent>
        <div key={currSet.id}>
          <div className="">
            <div>
              <div className="">
                <label>Weight</label>
              </div>
              <div className="">
                <input
                  className=""
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  required
                  value={currSet.weight}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <div
        className=""
        style={{ display: "flex", justifyItems: "justify-between" }}
      >
        <div onClick={handleDelete} aria-label="delete">
          <Delete aria-label="delete" />
        </div>
        <div onClick={handleUpdate} aria-label="done">
          <CheckBox aria-label="done" color="pink" />
        </div>
      </div>
    </Dialog>
  )
}
export default UpdateCurrentSetsModal
