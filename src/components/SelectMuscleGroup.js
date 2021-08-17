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

const SelectMuscleGroup = ({
  closeCard,
  openExerciseModal,
  isCardOpen,
  setMuscleGroup,
}) => {
  return (
    <div className={`${isCardOpen ? "block" : "hidden"}`}>
      <Card>
        <CardContent>
          <div className="">
            <p>Select muscle group</p>
            <div onClick={closeCard} aria-label="Close">
              <Close aria-label="Close" />
            </div>
          </div>

          <div className="flex justify-center flex-wrap ">
            {exerciseList.map((e) => (
              <div key={e.id} onClick={openExerciseModal}>
                <button
                  aria-label="Muscle Select"
                  onClick={() => setMuscleGroup(e)}
                  className="text-sm md:text-base shadow-lg m-1.5 h-10 px-5 sm:m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
                >
                  {e.muscle}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelectMuscleGroup
