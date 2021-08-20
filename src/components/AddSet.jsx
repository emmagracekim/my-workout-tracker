import AddCircle from "@material-ui/icons/AddCircle"

const styleObj = {
  fontSize: 14,
  color: "#03A9F4",
  textAlign: "center",
  paddingTop: "10px",
  fontFamily: "Arial",
  fontWeight: "bold",
}

const AddSet = ({ openRepsSetsModal }) => {
  return (
    <div aria-label="Add Set" onClick={openRepsSetsModal} style={styleObj}>
      <AddCircle aria-label="Add Set" />
      <p>Add Set</p>
    </div>
  )
}

export default AddSet
