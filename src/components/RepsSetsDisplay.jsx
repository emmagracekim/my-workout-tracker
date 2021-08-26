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
        <Card key={s.id} className="d-md:mt-4 md:mx-4">
          <div>
            <div className="d-flex flex-col md:flex-row md:bg-gray-50 transition md:dark:bg-black rounded">
              <p className="d-self-center text-gray-800 dark:text-gray-300 text-center m-2 md:ml-4">
                Set {index + 1}
              </p>
              <div className="d-flex flex-grow md:flex-row justify-content-around py-2 sm:mx-4 bg-gray-50 transition dark:bg-black rounded text-gray-800 dark:text-gray-100">
                <div className="d-flex flex-col  py-2 ml-2">
                  <label className="d-align-self-center">Weight</label>
                  <p className="">{s.weight} lbs</p>
                </div>
                <div className="d-flex flex-col p-2 ml-2">
                  <label>Reps</label>
                  <p className="d-text-center">{s.reps}</p>
                </div>
                <div
                  onClick={() => {
                    setIsModalOpen(true)
                    setCurrSet(s)
                  }}
                  className="d-self-center hidden md:block md:mr-3"
                  aria-label="edit"
                >
                  <Edit aria-label="edit" />
                </div>
              </div>

              <div
                onClick={() => {
                  setIsModalOpen(true)
                  setCurrSet(s)
                }}
                className="self-center hidden md:block md:mr-3"
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
