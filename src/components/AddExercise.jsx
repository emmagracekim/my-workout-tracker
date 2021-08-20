import AddCircle from "@material-ui/icons/AddCircle"

const styleObj = {
  fontSize: 16,
  color: "#03A9F4",
  textAlign: "center",
  paddingTop: "10px",
  fontFamily: "Arial",
  fontWeight: "bold",
}

const AddExercise = ({ openCard, exerciseStats }) => {
  return (
    <div>
      <div className="" style={styleObj}>
        <div aria-label="Add Exercise" onClick={openCard} className="">
          <AddCircle aria-label="Add Exercise" fontSize="large" />
          <p>Add Exercise</p>
        </div>
      </div>
      {exerciseStats.length === 0 ? (
        <div className="">
          <p style={{ fontFamily: "sans-serif", textAlign: "center" }}>
            No exercises recorded. <br className="block md:hidden" /> Add an
            exercise to get started.{" "}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default AddExercise
