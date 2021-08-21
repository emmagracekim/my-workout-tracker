import { React, useState } from "react"
import { Card } from "@material-ui/core"
import Edit from "@material-ui/icons/Edit"
import UpdateCurrentSetsModal from "./UpdateCurrentSetModal"

const RepsSetsDisplay = ({ currentExerciseData, setCurrentExerciseData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currSet, setCurrSet] = useState({})

  function closeModal() {
    setIsModalOpen(false)
    setCurrSet({})
  }

  return currentExerciseData.sets.map(
    (s, index) =>
      s && (
        <Card key={s.id}>
          <div>
            <div className="">
              <p>Set {index + 1}</p>
              <div className="">
                <label className="">Weight</label>
                <p className="">{s.weight} lbs</p>
              </div>
              <div className="">
                <label>Reps</label>
                <p className="">{s.reps}</p>
              </div>
              <div
                onClick={() => {
                  setIsModalOpen(true)
                  setCurrSet(s)
                }}
                className=""
                aria-label="edit"
              >
                <Edit aria-label="edit" />
              </div>

              <UpdateCurrentSetsModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                currentExerciseData={currentExerciseData}
                setCurrentExerciseData={setCurrentExerciseData}
                currSet={currSet}
                setCurrSet={setCurrSet}
              />
            </div>
          </div>
        </Card>
      )
  )
}

export default RepsSetsDisplay
