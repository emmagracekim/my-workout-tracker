import { Dialog } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { CheckBox } from "@material-ui/icons"
import Delete from "@material-ui/icons/Delete"
import { Modal, ModalBody } from "@windmill/react-ui"
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
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <p className="my-2 font-semibold text-blue-300 md:text-xl">Edit Set</p>
      <ModalBody>
        <div key={currSet.id}>
          <div className="flex bg-gray-50 p-2 rounded-lg sm:flex-row justify-around text-gray-600">
            <div>
              <div className="text-center pb-2 text-base font-semibold">
                <label>Weight</label>
              </div>
              <div className="flex justify-center pb-2">
                <input
                  className="py-2 rounded w-1/2 border text-black text-center"
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  required
                  value={currSet.weight}
                />
              </div>
            </div>
            <div>
              <div className="text-center pb-2 text-base font-semibold">
                <label>Reps</label>
              </div>
              <div className="flex justify-center">
                <input
                  className="py-2 rounded w-1/2 border text-black text-center"
                  type="number"
                  name="reps"
                  onChange={handleChange}
                  required
                  value={currSet.reps}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>

      <div className="flex justify-between">
        <div onClick={handleDelete} aria-label="delete">
          <Delete aria-label="delete" />
        </div>
        <div onClick={handleUpdate} aria-label="done">
          <CheckBox aria-label="done" color="pink" />
        </div>
      </div>
    </Modal>
  )
}
export default UpdateCurrentSetsModal
