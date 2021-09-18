import { IconButton } from "@material-ui/core"
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
    <IconButton
      aria-label="Add Set"
      onClick={openRepsSetsModal}
      style={styleObj}
    >
      <AddCircle aria-label="Add Set" fontSize="large" />
      <p>Add Set</p>
    </IconButton>
  )
}

const AddSubmittedSet = ({ openAddMoreSetsModal }) => {
  return (
    <div
      aria-label="Add More Sets"
      onClick={openAddMoreSetsModal}
      className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition-colors rounded-lg focus:shadow-outline hover:bg-indigo-900  hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export { AddSubmittedSet }
export default AddSet
