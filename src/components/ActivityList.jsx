import React from "react"
import { withFirebase } from "./Firebase/firebaseContext"
import loader from "../Utilities/loader.gif"

import { spacing } from "@material-ui/system"
import { Button } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { Typography } from "@material-ui/core"
import MyButton from "../Styling/MyButton"

import SelectMuscleGroup from "./SelectMuscleGroup"
import { Link, withRouter } from "react-router-dom"

function ActivityList(props) {
  const {
    loading,
    activities,
    editActivity,
    setOpenSnackbar,
    setSnackbarMsg,
    setEditing,
  } = props

  const theme = {
    spacing: [3, 5, 8],
  }

  const deleteActivity = (i) => {
    // Get key of activity in firebase
    const activityKey = Object.keys(activities)[i]
    // Connect to our firebase API
    const emptyActivity = {
      date: null,
      duration: null,
      type: null,
      name: null,
    }

    props.firebase.updateActivity(
      props.authUser.uid,
      emptyActivity,
      activityKey
    )

    // Show notification
    setOpenSnackbar(true)
    setSnackbarMsg("Deleted activity")
    setTimeout(() => {
      setOpenSnackbar(false)
    }, 3000)

    // stop editing
    setEditing(false)
  }

  //dialog
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(
    "Nothing selected yet"
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {activities === "not set" || activities === null ? (
        <div>
          <p>No activities added yet</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(activities).map((activity, i) => {
                let { name, type, duration } = activity
                switch (activity.type) {
                  case 1:
                    type = "Lifting Weights"
                    break
                  case 2:
                    type = "Running"
                    break
                  case 3:
                    type = "Cycling"
                    break
                  default:
                    type = "Not set"
                }
                return (
                  <TableRow key={i}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={(e) => deleteActivity(i)} />
                      <EditIcon
                        onClick={(e) => editActivity(activity, i)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div></div>
      <Typography align="center">
        <AddCircleIcon mt={8} fontSize="large" />
        <div></div>
        <MyButton color="blue" onClick={handleClickOpen}>
          <Link to="/create-workout">Add new exercise</Link>
        </MyButton>
      </Typography>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography> */}
      {/* <SelectMuscleGroup
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      /> */}
    </>
  )
}

export default withFirebase(ActivityList)
