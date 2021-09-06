import React from "react"

import PropTypes from "prop-types"
import { Add } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"
import { exerciseList } from "./Data/exerciseList"
import { Close } from "@material-ui/icons"
import MyButton from "../styles/MyButton"
import { Card, CardBody } from "@windmill/react-ui"

// const styleObj = {
//   fontSize: 16,
//   //color: "#03A9F4",
//   textAlign: "center",
//   paddingTop: "10px",
//   fontFamily: "Arial",
//   fontWeight: "bold",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   flexWrap: "wrap",
// }

const SelectMuscleGroup = ({
  closeCard,
  openExerciseModal,
  isCardOpen,
  setMuscleGroup,
}) => {
  return (
    <div style={{ display: isCardOpen ? "block" : "none" }}>
      <Card>
        <CardBody>
          <div className="mb-4 font-bold text-pink">
            Select Muscle Group
            <div onClick={closeCard} aria-label="Close">
              <Close aria-label="Close" />
            </div>
          </div>

          <div className="">
            {exerciseList.map((e) => (
              <div key={e.id} onClick={openExerciseModal}>
                <MyButton
                  color="red"
                  aria-label="Muscle Select"
                  onClick={() => setMuscleGroup(e)}
                >
                  {e.muscle}
                </MyButton>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SelectMuscleGroup
