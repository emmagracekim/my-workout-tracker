import React from "react"

import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"
import { exerciseList } from "./Data/exerciseList"
import { Close } from "@material-ui/icons"
import MyButton from "../Styling/MyButton"
import "../Styling/select-muscle-group.css"

const styleObj = {
  fontSize: 16,
  //color: "#03A9F4",
  textAlign: "center",
  paddingTop: "10px",
  fontFamily: "Arial",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
}

const SelectMuscleGroup = ({
  closeCard,
  openExerciseModal,
  isCardOpen,
  setMuscleGroup,
}) => {
  return (
    <div style={{ display: isCardOpen ? "block" : "none" }}>
      <Card>
        <CardContent>
          <div className="" style={styleObj}>
            <DialogTitle>Select Muscle Group</DialogTitle>
            <div onClick={closeCard} aria-label="Close">
              <Close aria-label="Close" />
            </div>
          </div>

          <div className="" style={styleObj}>
            {exerciseList.map((e) => (
              <div key={e.id} onClick={openExerciseModal}>
                <MyButton
                  color="red"
                  aria-label="Muscle Select"
                  onClick={() => setMuscleGroup(e)}
                  // style={{
                  //   fontFamily: "sans-serif",
                  //   fontWeight: "bold",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                  //   flexWrap: "wrap",
                  // }}
                >
                  {e.muscle}
                </MyButton>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelectMuscleGroup
