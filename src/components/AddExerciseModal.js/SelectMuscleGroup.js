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
} from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { blue } from "@material-ui/core/colors"

const muscles = [
  "Abs",
  "Biceps",
  "Back",
  "Chest",
  "Glutes",
  "Hamstrings",
  "Quads",
  "Shoulders",
  "Triceps",
]
// const useStyles = makeStyles({
//    avatar: {
//      backgroundColor: blue[100],
//      color: blue[600],
//    },
//  });

function SelectMuscleGroup(props) {
  //const classes = useStyles();
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="select-muscle-group-dialog"
      open={open}
    >
      <DialogTitle id="select-muscle-group-dialog">
        Select Muscle Group
      </DialogTitle>
      <List>
        {muscles.map((muscle) => (
          <ListItem
            button
            onClick={() => handleListItemClick(muscle)}
            key={muscle}
          >
            <ListItemText primary={muscle} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addDiffMuscle")}
        >
          <ListItemText primary="Add a different muscle group" />
        </ListItem>
      </List>
    </Dialog>
  )
}

SelectMuscleGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
}

export default SelectMuscleGroup
