import { Button } from "@material-ui/core"
import { useStyles } from "./material"
import PropTypes from "prop-types"

function MyButton(props) {
  const { color, ...other } = props
  const classes = useStyles(props)
  return <Button className={classes.root} {...other} />
}

MyButton.propTypes = {
  color: PropTypes.oneOf([
    "blue",
    "red",
    "aquamarine",
    "hotpink",
    "paleturquoise",
    "peachpuff",
    "plum",
    "royalblue",
    "salmon",
    "thistle",
    "white",
    "gainsboro",
    "indigo",
  ]).isRequired,
}

export default MyButton
